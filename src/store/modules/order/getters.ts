import { GetterTree } from 'vuex'
import OrderState from './OrderState'
import RootState from '../../RootState'

const getters: GetterTree <OrderState, RootState> = {
  getOrders (state) {
    return state.list.orders
  },
  isScrollable: (state) => {
    return state.list.orders.length > 0 && state.list.orders.length < state.list.total
  },
  getCurrentOrder(state) {
    return state.current
  },
  getStuckOrders(state) {
    return state.stuck.orders;
  },
  getStuckOrderChangeFacilityInformation: (state) => (orderId: any) => {
    return state.stuck.orderFacilityChangeInformation[orderId];
  },
  getOldExpeditedOrders(state) {
    return state.oldExpedited.orders;
  },
  getOldExpeditedOrderChangeFacilityInformation: (state) => (orderId: any) => {
    return state.oldExpedited.orderFacilityChangeInformation[orderId];
  },
}
export default getters;