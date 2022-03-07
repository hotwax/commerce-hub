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
        commit(types.PRODUCT_SEARCH_UPDATED, { products: products, totalProductsCount: totalProductsCount })
      } else {
        //showing error whenever getting no products in the response or having any other error
        showToast(translate("Product not found"));
      }
      // Remove added loader only when new query and not the infinite scroll
      if (payload.viewIndex === 0) emitter.emit("dismissLoader");
    } catch(error){
      console.log(error)
      showToast(translate("Something went wrong"));
    }
    // TODO Handle specific error
    return resp;
  },
  // Will fetch product information
  async fetchProducts({ commit, state }, { productIds }) {
    const cachedProductIds = Object.keys(state.cached);
    const productIdFilter = productIds.reduce((filter: string, productId: any) => {
      if (cachedProductIds.includes(productId)) {
        return filter;
      } else {
        if (filter !== '') filter += ' OR '
        return filter += productId;
      }
    }, '');

    if (productIdFilter === '') return;
    const resp = await ProductService.fetchProducts({
      "filters": ['productId: (' + productIdFilter + ')'],
      "viewSize": productIds.length
    })
    if (resp.status === 200 && !hasError(resp)) {
      const products = resp.data.response.docs;
      if (resp.data) commit(types.PRODUCT_ADD_TO_CACHED_MULTIPLE, { products });
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
   * Get Product-inventory details
   */
  async getProductDetail({ commit, state }, { productId }) {
    const current = state.current as any
    const products = state.products.list as any

    if(current && current.productId === productId) { return current }

    if(products.length > 0) {
      return products.some((product: any) => {
        if(product.productId === productId) {
          commit(types.PRODUCT_CURRENT_UPDATED, { product });
          return current;
        }
      })
    }

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
          "filter": `docType: PRODUCT AND productId: ${10128}`
        }
      }
      resp = await ProductService.getProductDetail(payload);

      if(resp.status === 200 && resp.data.grouped.groupId?.groups.length > 0 && !hasError(resp)) {
        let product = resp.data.grouped.groupId?.groups[0].doclist.docs[0]

        product = {
          productId: product.productId,
          productName: product.productName,
          brand: product.brandName,
          mainImage: product.mainImageUrl,
          externalId: product.internalName,
          variants: product.variantProductIds
        }

        let variantProductIds: any = new Set();
        product.variants.forEach((variant: any) => {
          variantProductIds.add(variant);
        })
        variantProductIds = [...variantProductIds]

        commit(types.PRODUCT_CURRENT_UPDATED, { product });
      } else {
        showToast(translate("Product not found"));
      }
    } catch(err) {
      console.error(err);
      showToast(translate("Something went wrong"));
    }
    return resp;
  }
}

export default actions;