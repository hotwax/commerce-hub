import { StockService } from '@/services/StockService'
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import StockState from './StockState'
import * as types from './mutation-types'
import { hasError } from '@/utils'

const actions: ActionTree<StockState, RootState> = {

  /**
   * Add stocks of specific product
   */
  async addProduct  ( { commit }, { productId }) {
    const resp: any = await StockService.checkInventory({ productId });
    if (resp.status === 200) {
      commit(types.STOCK_ADD_PRODUCT, { productId, stock: resp.data.docs })
    }
  },
  async addProducts({ commit }, { productIds }) {
    const products: any = {};
    try {
      const resp = await Promise.all(productIds.map((productId: any) => {
        return StockService.checkInventory({
          "filters": {
            "productId": productId
          },
          "fieldsToSelect": ["productId", "atp"],
          "viewSize": 1
        })
      }))

      resp.map((response: any) => {
        if (response.status == 200 && !hasError(response) && response.data.count > 0) {
          const data = response.data.docs[0];
          products[data.productId] = data.atp
        }
      })
      commit(types.STOCK_PRODUCTS_UPDATED, products)
    } catch (err) {
      console.error('Something went wrong while fetching stock for products')
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
      const resp = await Promise.all(products.map((product: any) => {
        return StockService.checkInventory({
          "filters": {
            "productId": product.productId,
            "facilityId": product.facilityId
          },
          "fieldsToSelect": ["productId", "atp", "facilityId"],
          "viewSize": 100
        })
      }))

      resp.map((response: any) => {
        if (response.status == 200 && !hasError(response) && response.data.count > 0) {
          const data = response.data.docs[0];
          if (!cachedProductAtp[data.facilityId]) {
            cachedProductAtp[data.facilityId] = {}
          }
          cachedProductAtp[data.facilityId][data.productId] = data.atp
          commit(types.STOCK_ADD_PRODUCT_FACILITY_ATP, cachedProductAtp)
        }
      })
    } catch (err) {
      console.error('Something went wrong while fetching stock for products')
    }
  }
}
export default actions;