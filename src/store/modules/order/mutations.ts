import { MutationTree } from 'vuex'
import OrderState from './OrderState'
import * as types from './mutation-types'

const mutations: MutationTree <OrderState> = {
  [types.ORDER_LIST_UPDATED] (state, payload) {
    state.list.orders = payload.orders
    state.list.total = payload.total
  },
  [types.ORDER_FILTERS_UPDATED] (state, payload) {
    state.currentOrderFiltersSelected[payload.filterName] = payload.value
  },
  [types.ORDER_CURRENT_UPDATED] (state, payload) {
    state.current = payload.order
  }
}
export default mutations;