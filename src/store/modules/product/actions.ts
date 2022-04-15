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

  /**
  * Get Product Inventory
  */
  async getProducts({ commit, state }, payload) {
    let resp;

    try {
      resp = await ProductService.getProducts(payload);

      if (resp.status === 200 && resp.data.grouped.groupId?.ngroups > 0 && !hasError(resp)) {
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
      }
    } catch (error) {
      console.error(error);
      showToast(translate("Something went wrong"));
    }
    return resp;
  },

  /**
  * Get Product-inventory details
  */
  async getProductDetail({ dispatch, state }, { productId }) {
    const current = state.current as any
    
    if(current && current.productId === productId) { return current }

    let resp;
    try {
      const payload = {
        "json": {
          "params": {
            "group": true,
            "group.field": "groupId",
            "group.limit": 10000,
            "group.ngroups": true,
          } as any,
          "query": "*:*",
          "filter": `docType: PRODUCT AND productId: ${productId}`
        }
      }
      resp = await ProductService.getProductDetail(payload);

      if(resp.status === 200 && resp.data.grouped.groupId?.groups.length > 0 && !hasError(resp)) {
        let product = resp.data.grouped.groupId?.groups[0].doclist.docs[0]

        product = {
          productId: product.productId,
          productName: product.productName,
          brand: product.brandName,
          externalId: product.internalName,
          mainImage: product.mainImageUrl,
          features: product.productFeatures,
          variants: product.variantProductIds
        }

        dispatch('updateCurrent', product);
      } else {
        showToast(translate("Product not found"));
      }
    } catch(err) {
      console.error(err);
      showToast(translate("Something went wrong"));
    }
    return resp;
  },
  updateCurrent({ commit }, payload) {
    commit(types.PRODUCT_CURRENT_UPDATED, payload)
  },
}

export default actions;