import { MutationTree } from 'vuex'
import StockState from './StockState'
import * as types from './mutation-types'
import { Stock } from '@hotwax/oms-api'

const mutations: MutationTree <StockState> = {
  [types.STOCK_ADD_PRODUCT] (state, payload) {
    state.products[payload.productId] = payload.availableToPromiseTotal
  },
  [types.STOCK_PRODUCTS_UPDATED] (state, payload) {
    state.products = { ...state.products, ...payload}
  },
  [types.STOCK_ADD_PRODUCTS] (state, payload) {
    payload.forEach((productStock: Stock) => {
      state.products[productStock.productId] = productStock.availableToPromiseTotal
    });
  },
  [types.STOCK_ADD_PRODUCT_FACILITY_ATP] (state, payload) {
    state.productsByFacility = payload
  }
}
export default mutations;