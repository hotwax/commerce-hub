import { MutationTree } from 'vuex'
import OrderState from './OrderState'
import * as types from './mutation-types'

const mutations: MutationTree <OrderState> = {
  [types.ORDER_LIST_UPDATED] (state, payload) {
    state.list.orders = payload.orders
    state.list.orderCount = payload.orderCount,
    state.list.itemCount = payload.itemCount
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
  [types.ORDER_STUCK_UPDATED] (state, payload) {
    state.stuck.orders = payload.orders
    state.stuck.total = payload.total
  },
  [types.ORDER_OLD_EXPEDITED_UPDATED] (state, payload) {
    state.oldExpedited.orders = payload.orders
    state.oldExpedited.total = payload.total
  },
  [types.ORDER_FACILITY_CHANGE_UPDATED] (state, payload) {
    state.orderFacilityChange = {...payload, ...state.orderFacilityChange}
  }
}
export default mutations;