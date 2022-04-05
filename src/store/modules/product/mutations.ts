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
  [types.PRODUCT_CATEGORIES_UPDATED](state, payload) {
    state.filters.list.categories = state.filters.list.categories.concat(payload);
  }
}
export default mutations;