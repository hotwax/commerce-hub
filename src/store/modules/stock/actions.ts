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

  /**
   * Add stocks of list of products
   */
  async addProducts({ commit }, { productIds }) {
    // There is a limitation at API level to handle only 100 records
    // but as we will always fetch data for the fetched records which will be as per the viewSize
    // assuming that the value will never be 100 to show
    const resp: any = await StockService.checkInventory({
      "filters": {
        "productId": productIds,
        "productId_op": "in",
        "facilityId": this.state.user.currentFacility.facilityId
      },
      "fieldsToSelect": ["productId", "atp"],
      "viewSize": productIds.length
    });
    if (resp.status === 200 && !hasError(resp)) {
      // Handled empty response in case of failed query
      if (resp.data) commit(types.STOCK_ADD_PRODUCTS, { products: resp.data.docs })
    }
    
   /**
    * Commenting this code because we will be releasing this feature in next release.
    */
   
    // Implemented this loop to check productInventory and find product ATP
    // because we were only getting maximum 100 records at a time.

    // const count = variantIds.length / 100;

    // for(let i = 0; i < count; i++) {
    //   const resp: any = await StockService.checkInventory({
    //     "filters": {
    //       "productId": variantIds.splice(0, 100),
    //       "productId_op": "in",
    //       "facilityId": this.state.user.currentFacility.facilityId
    //     },
    //     "fieldsToSelect": ["productId", "atp"],
    //     "viewSize": 100
    //   });
    //   if (resp.status === 200 && !hasError(resp)) {

    //     // Handled empty response in case of failed query
    //     if (resp.data) commit(types.STOCK_ADD_PRODUCTS, { products: resp.data.docs })
    //   }
    // }
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