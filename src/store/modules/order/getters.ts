import { GetterTree } from 'vuex'
import OrderState from './OrderState'
import RootState from '../../RootState'

const getters: GetterTree <OrderState, RootState> = {
  getList (state) {
    return state.list.items
  }
}
export default getters;