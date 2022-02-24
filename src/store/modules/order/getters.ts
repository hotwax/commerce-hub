import { GetterTree } from 'vuex'
import OrderState from './OrderState'
import RootState from '../../RootState'

const getters: GetterTree <OrderState, RootState> = {
  getList (state) {
    return state.list.orders
  },
  getOrderDetails (state) {
    return state.order
  },
  isScrollable: (state) => {
    return state.list.orders.length > 0 && state.list.orders.length < state.list.total
  },
}
export default getters;