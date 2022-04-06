import { MutationTree } from 'vuex'
import OrderState from './OrderState'
import * as types from './mutation-types'

const mutations: MutationTree <OrderState> = {
  [types.ORDER_LIST_UPDATED] (state, payload) {
    state.list.orders = payload.orders
    state.list.total = payload.total
  },
  [types.ORDER_CURRENT_UPDATED] (state, payload) {
    state.current = payload.order
  },
  [types.ORDER_STUCK_UPDATED] (state, payload) {
    state.stuck.orders = payload.orders
    state.stuck.orderFacilityChangeInformation = payload.orderFacilityChangeInformation
    state.stuck.total = payload.total
  },
  [types.ORDER_OLD_EXPEDITED_UPDATED] (state, payload) {
    state.oldExpedited.orders = payload.orders
    state.oldExpedited.orderFacilityChangeInformation = payload.orderFacilityChangeInformation
    state.oldExpedited.total = payload.total
  }
}
export default mutations;