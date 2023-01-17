import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import StockState from './StockState'
import * as types from './mutation-types'
import { fetchProductsStockAtFacility, Response, Stock } from '@/adapter'

const actions: ActionTree<StockState, RootState> = {
  async addProducts({ commit }, { productIds }) {
    try {
      const resp = await fetchProductsStockAtFacility(productIds) as Array<Stock> | Response

      commit(types.STOCK_ADD_PRODUCTS, resp)
    } catch (err: Response) {
      console.error(err.message)
    }
  },

  async fetchProductStockForFacility({ state, commit }, items) {
    const cachedProductAtp = JSON.parse(JSON.stringify(state.productsByFacility));
    const products = items.map((item: any) => {
      if(!cachedProductAtp[item.facilityId] || !cachedProductAtp[item.facilityId][item.productId]) {
        return item
      }
    }).filter((item: any) => item)

    try {
      // TODO: add support for using oms-api package specific method for fetching multiple products on multiple facilities
      const resp = await Promise.allSettled(products.map((product: any) => fetchProductsStockAtFacility([product.productId], product.facilityId)))

      resp.map((response: any) => {
        const responseStatus = response.status
        if (responseStatus === 'fulfilled') {
          const res = response.value[0] // using 0th index as the resolved promise value is containing an array of stock response having a single value
          if (!cachedProductAtp[res.facilityId]) {
            cachedProductAtp[res.facilityId] = {}
          }
          cachedProductAtp[res.facilityId][res.productId] = res.availableToPromiseTotal
          commit(types.STOCK_ADD_PRODUCT_FACILITY_ATP, cachedProductAtp)
        }
      })
    } catch (err) {
      console.error('Something went wrong while fetching stock for products')
    }
  }
}
export default actions;