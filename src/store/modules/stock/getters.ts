import { GetterTree } from 'vuex'
import StockState from './StockState'
import RootState from '../../RootState'

const getters: GetterTree <StockState, RootState> = {
  getProductStock: (state) => (productId: string) => {
    return state.products[productId] ? state.products[productId] : 0
  },
  getProductStockForFacility: (state) => (productId: string, facilityId: string) => {
    return state.productsByFacility[facilityId] ? state.productsByFacility[facilityId][productId] ? state.productsByFacility[facilityId][productId] : 0 : 0
  }
}
export default getters;