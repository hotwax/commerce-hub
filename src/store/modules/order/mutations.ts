import { MutationTree } from 'vuex'
import OrderState from './OrderState'
import * as types from './mutation-types'

const mutations: MutationTree <OrderState> = {
  [types.ORDER_LIST_UPDATED] (state, payload) {
    state.list.orders = payload.orders
    state.list.total = payload.total
  },
  [types.ORDER_FILTERS_UPDATED] (state, payload) {
    state.query[payload.filterName] = payload.value
  },
  [types.ORDER_CURRENT_UPDATED] (state, payload) {
    state.current = payload.order
  },
  [types.ORDER_SORT_UPDATED] (state, payload) {
    state.query['sort'] = payload
  },
  [types.ORDER_PO_ID_UPDATED] (state, payload) {
    state.poIds = payload
  },
  [types.ORDER_VALID_STATUS_CHANGE_UPDATED] (state, payload) {
    state.validStatusChange = payload
  },
  [types.ORDER_PO_LIST_UPDATED] (state, payload) {
    state.poList.orders = payload.orders
    state.poList.total = payload.total
  },
}
export default mutations;