import { MutationTree } from 'vuex'
import StockState from './StockState'
import * as types from './mutation-types'

const mutations: MutationTree <StockState> = {
  [types.STOCK_ADD_PRODUCT] (state, payload) {
    state.products[payload.productId] = payload.stock
  },
  [types.STOCK_PRODUCTS_UPDATED] (state, payload) {
    state.products = { ...state.products, ...payload}
  },
  [types.STOCK_ADD_PRODUCTS] (state, payload) {
    payload.products.forEach((product: any) => {
      state.products[product.productId] = product.atp
    });
  },
  [types.STOCK_ADD_PRODUCT_FACILITY_ATP] (state, payload) {
    state.productsByFacility = payload
  }
}
export default mutations;