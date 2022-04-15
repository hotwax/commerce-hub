import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import * as types from './mutation-types'
import { hasError } from '@/utils'
import "moment-timezone";
import UtilState from './UtilState'
import { UtilService } from '@/services/UtilService'

const actions: ActionTree<UtilState, RootState> = {

  async fetchShipmentMethods ({ state, commit }) {
    try {
      if (Object.keys(state.shipmentMethod).length == 0) {
        const resp = await UtilService.getShipmentMethods({
          "entityName": "ShipmentMethodType",
          "noConditionFind": "Y",
          "fieldList": ["shipmentMethodTypeId", "description"],
          "viewSize": 100
        });
        if (resp.status === 200 && resp.data.docs.length > 0 && !hasError(resp)) {
          commit(types.UTIL_SHIPMENT_METHODS_UPDATED, resp.data.docs)
        } else {
          console.error("error", resp.data._ERROR_MESSAGE_)
        }
      }
    } catch (err) {
      console.error("error", err);
    }
  },

  async fetchEcomStores({ commit }) {
    const payload = {
      "viewSize": 100,
      "fieldList": ["productStoreId", "storeName"],
      "entityName": "ProductStore",
      "distinct": "Y",
      "noConditionFind": "Y"
    }
    try {
      const resp = await UtilService.fetchEcomStores(payload);
      if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
        commit(types.UTIL_PRODUCT_STORE_UPDATED, resp.data.docs)
      } else {
        console.error("error", resp.data._ERROR_MESSAGE_)
      }
    } catch (err) {
      console.error("error", err);
    }
  }
}

export default actions;