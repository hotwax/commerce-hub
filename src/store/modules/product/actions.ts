import { ProductService } from "@/services/ProductService";
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import ProductState from './ProductState'
import * as types from './mutation-types'
import { hasError, showToast } from '@/utils'
import { translate } from '@/i18n'
import emitter from '@/event-bus'


const actions: ActionTree<ProductState, RootState> = {

  // Find Product
  async findProduct ({ commit, state }, payload) {

    // Show loader only when new query and not the infinite scroll
    if (payload.viewIndex === 0) emitter.emit("presentLoader");

    let resp;

    try {
      resp = await ProductService.fetchProducts({
        // used sku as we are currently only using sku to search for the product
        "filters": ['sku: ' + payload.queryString],
        "viewSize": payload.viewSize,
        "viewIndex": payload.viewIndex
      })

      // resp.data.response.numFound tells the number of items in the response
      if (resp.status === 200 && resp.data.response.numFound > 0 && !hasError(resp)) {
        let products = resp.data.response.docs;
        const totalProductsCount = resp.data.response.numFound;

        if (payload.viewIndex && payload.viewIndex > 0) products = state.products.list.concat(products)
        commit(types.PRODUCT_LIST_UPDATED, { products: products, totalProductsCount: totalProductsCount })
      } else {
        //showing error whenever getting no products in the response or having any other error
        showToast(translate("Product not found"));
      }
      // Remove added loader only when new query and not the infinite scroll
      if (payload.viewIndex === 0) emitter.emit("dismissLoader");
    } catch(error){
      console.error(error)
      showToast(translate("Something went wrong"));
    }
    // TODO Handle specific error
    return resp;
  },
  // Will fetch product information
  async fetchProducts({ commit, state }, { productIds }) {
    const cachedProducts = JSON.parse(JSON.stringify(state.cached));
    const cachedProductIds = Object.keys(state.cached);
    const productIdFilter = productIds.reduce((filter: string, productId: any) => {
      if (cachedProductIds.includes(productId)) {
        return filter;
      } else {
        if (filter !== '') filter += ' OR '
        return filter += productId;
      }
    }, '');

    if (productIdFilter === '') return cachedProducts;

    const resp = await ProductService.fetchProducts({
      "filters": ['productId: (' + productIdFilter + ')'],
      "viewSize": productIds.length
    })
    if (resp.status === 200 && !hasError(resp)) {
      const products = resp.data.response.docs;
      if (resp.data) {
        products.forEach((product: any) => {
          cachedProducts[product.productId] = product
        });
      }
      commit(types.PRODUCT_CACHED_UPDATED, { cached: cachedProducts });
      return cachedProducts;
    }
    return resp;
  },

  // Get product related information
  async getProductInformation(context, { orders }) {
    let productIds: any = new Set();
    orders.forEach((order: any) => {
      order.doclist.docs.forEach((item: any) => {
        if (item.productId) productIds.add(item.productId);
      })
    })
    productIds = [...productIds]
    if (productIds.length) {
      this.dispatch('product/fetchProducts', { productIds })
      this.dispatch('stock/addProducts', { productIds })
    }
  },

  // Update QueryString
  async updateQueryString({ commit }, queryString) {
    commit(types.PRODUCT_FILTERS_CURRENT_UPDATED, { 'filterName': 'queryString', 'value': queryString })
  },

  // update sorting order
  async updateSortOption({ commit }, payload) {
    commit(types.PRODUCT_SORT_UPDATED, payload)
  },

  // Update Query
  async updateQuery({ state, dispatch }, params) {
    await dispatch('updateQueryString', params.queryString)
    const typeFilterSelected = [] as any;

    const payload = {
      "json": {
        "params": {
          "sort": `parentProductName ${state.currentProductFilterSelected.sort}`,
          "rows": params.viewSize,
          "start": params.viewIndex * params.viewSize,
          "group": true,
          "group.field": "groupId",
          "group.limit": 10000,
          "group.ngroups": true,
        } as any,
        "query": "*:*",
        "filter": "docType: PRODUCT AND groupId: *"
      }
    }

    if (params.queryString) {
      payload.json.params.defType = 'edismax'
      payload.json.params.qf = 'productId productName sku internalName brandName groupId'
      payload.json.params['q.op'] = 'AND'
      payload.json.query = `*${params.queryString}*`
    }
    
    // updating the filters value in json object as per the filters selected
    if(state.currentProductFilterSelected.category !== 'All') {
      payload.json.filter = payload.json.filter.concat(` AND productCategories: ${state.currentProductFilterSelected.category}`)
    }

    if(state.currentProductFilterSelected.color !== 'All') {
      payload.json.filter = payload.json.filter.concat(` AND productFeatureIds: ${state.currentProductFilterSelected.color}`)
    }

    if(state.currentProductFilterSelected.size !== 'All') {
      payload.json.filter = payload.json.filter.concat(` AND productFeatureIds: ${state.currentProductFilterSelected.size}`)
    }

    if(state.currentProductFilterSelected.tags.length > 0) {
      const tagFilters = state.currentProductFilterSelected.tags.reduce((filter: string, tag: any) => {
        if (filter !== '') filter += ' OR '
        return filter += tag;
      }, '');

      payload.json.filter = payload.json.filter.concat(' AND tags: (' + tagFilters + ')')
    }

    if(state.currentProductFilterSelected.preOrder) {
      typeFilterSelected.push('PRE-ORDER')
    }

    if(state.currentProductFilterSelected.backOrder) {
      typeFilterSelected.push('BACKORDER')
    }

    if(state.currentProductFilterSelected.productStore !== 'any') {
      payload.json.filter = payload.json.filter.concat(` AND productStoreIds: ${state.currentProductFilterSelected.productStore}`)
    }

    const typeFilterValues = typeFilterSelected.toString().replaceAll(',', ' OR ')

    if(typeFilterValues) {
      payload.json.filter = payload.json.filter.concat(` AND keywordSearchText: (${typeFilterValues ? typeFilterValues : '*'})`)
    }

    const resp = dispatch("getProducts", payload);

    return resp;
  },

    /**
   * Get Product Inventory
   */
  async getProducts({ commit, state }, payload) {
    let resp;
    
    try{
      resp = await ProductService.getProducts(payload);
      if(resp.status === 200 && resp.data.grouped.groupId?.ngroups > 0 && !hasError(resp)) {
        let products = resp.data.grouped.groupId?.groups;
        const totalProductsCount = resp.data.grouped.groupId.ngroups;
        
        products = products.map((product: any) => {
          return {
            productId: product.groupValue,
            productName: product.doclist.docs[0]?.parentProductName,
            variants: product.doclist.docs
          }
        })

        let productIds: any = new Set();
        products.forEach((product: any) => {
          if(product.productId) productIds.add(product.productId);
        })
        productIds = [...productIds]
        const productInformation = await this.dispatch("product/fetchProducts", { productIds });

        products = products.map((product: any) => {
          const virtual = productInformation[product.productId]

          return {
            ...product,
            brandName: virtual?.brandName,
            productName: virtual?.productName,
            internalName: virtual?.internalName,
            mainImageUrl: virtual?.mainImageUrl,
            featureHierarchy: virtual?.featureHierarchy
          }
        })

        // We are commenting this code because we will be releasing this feature in next release.

        // const variantIds = products.reduce((acc: any, product: any) => {
        //   return acc.concat(product.variants.map((variant: any) => variant.productId ))
        // }, [])
        // this.dispatch("stock/addProducts", { variantIds });
        
        if(payload.json.params.start && payload.json.params.start > 0) products = state.products.list.concat(products);
        commit(types.PRODUCT_LIST_UPDATED, { products, totalProductsCount });
      } else {
        showToast(translate("Products not found"));
        commit(types.PRODUCT_LIST_UPDATED, { products: [], totalProductsCount: 0 });
      }
    } catch(error) {
      console.error(error);
      commit(types.PRODUCT_LIST_UPDATED, { products: [], totalProductsCount: 0 });
      showToast(translate("Something went wrong"));
    }
    return resp;
  },
  
  async updateProductFilters({ commit, dispatch, state }, payload) {
    if (payload.filterName === 'tags') {
      const tags = state.currentProductFilterSelected.tags;
      !tags.includes(payload.value) ? tags.push(payload.value) : tags.splice(tags.indexOf(payload.value), 1)
      payload.value = tags
    }
    commit(types.PRODUCT_FILTERS_CURRENT_UPDATED, payload);
    await dispatch('updateQuery', { viewSize: process.env.VUE_APP_VIEW_SIZE, viewIndex: 0 });
  }
}

export default actions;