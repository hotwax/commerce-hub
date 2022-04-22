import { MutationTree } from 'vuex'
import ProductState from './ProductState'
import * as types from './mutation-types'

const mutations: MutationTree <ProductState> = {
  [types.PRODUCT_LIST_UPDATED] (state, payload) {
    state.products.list = payload.products;
    state.products.total = payload.totalProductsCount;
  },
  [types.PRODUCT_ADD_TO_CACHED_MULTIPLE](state, payload) {
    if (payload.products) {
      payload.products.forEach((product: any) => {
        state.cached[product.productId] = product
      });
    }
  },
  [types.PRODUCT_CACHED_UPDATED](state, payload) {
    state.cached = payload.cached
  },
  [types.PRODUCT_CURRENT_UPDATED](state, payload) {
    state.current = payload
  }
}
export default mutations;