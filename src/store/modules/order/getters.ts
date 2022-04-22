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
  getOrderQuery: (state) => {
    return state.query
  },
  getCurrentOrder(state) {
    return state.current
  },
  getOrderValidStatusChange: (state) => (statusId: string) => {
    return state.validStatusChange[statusId]
  },
  getStuckOrders(state) {
    return state.stuck.orders;
  },
  getOrderChangeFacility: (state) => (orderId: any) => {
    return state.orderFacilityChange[orderId];
  },
  getOldExpeditedOrders(state) {
    return state.oldExpedited.orders;
  }
}
export default getters;