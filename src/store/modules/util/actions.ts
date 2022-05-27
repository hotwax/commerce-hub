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

  async fetchStatus({ state, commit }, statusIds) {
    let resp;

    const cachedStatus = JSON.parse(JSON.stringify(state.status));
    const statusIdFilter = statusIds.reduce((filter: Array<string>, statusId: any) => {
      if (!cachedStatus[statusId]) {
        filter.push(statusId)
      }
      return filter;
    }, []);

    if (statusIdFilter.length <= 0) return cachedStatus;

    try {
      resp = await UtilService.fetchStatus({
        "entityName": "StatusItem",
        "noConditionFind": "Y",
        "distinct": "Y",
        "viewSize": 100,
        "inputFields": {
          "statusId": statusIdFilter,
          "statusId_op": "in"
        },
        "fieldList": ["statusId", "description"],
      })

      if (resp.status == 200 && !hasError(resp) && resp.data.count) {
        const statuses = resp.data.docs;
        statuses.map((status: any) => {
          cachedStatus[status.statusId] = status.description
        })
        commit(types.UTIL_STATUS_UPDATED, cachedStatus)
      }
    } catch(err) {
      console.error('Something went wrong while fetching status for items and orders')
    }
    return cachedStatus;
  },  
  async fetchFacilities({ state, commit }) {
    if (Object.keys(state.facilities).length === 0) {
      return state.facilities;
    }
    try {
      const resp = await UtilService.getFacilities({
        "entityName": "Facility",
        "noConditionFind": "Y",
        "viewSize": 50,
        "fieldList": ["facilityId", "facilityName"],
      });
      if(resp.status === 200 && !hasError(resp)){
        const facilities = resp.data.docs.reduce((facilities: any, facility: any) => {
          facilities[facility.facilityId] = facility;
          return facilities;
        }, {})
        commit(types.UTIL_FACILITY_LIST_UPDATED, facilities);
        return facilities;
      }
    } catch (err) {
      console.error("error", err);
    }
    return {};
  },

  async getEComStores({ state, commit }) {
    let resp;

    if(state.productStore.length > 0) {
      return;
    }

    const payload = {
      "inputFields": {
        "storeName_op": "not-empty"
      },
      "fieldList": ["productStoreId", "storeName"],
      "entityName": "ProductStore",
      "distinct": "Y",
      "noConditionFind": "Y"
    }

    try{
      resp = await UtilService.getEComStores(payload);
      if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
        const stores = resp.data.docs
        stores.push({'productStoreId': '', 'storeName': 'any'})
        commit(types.UTIL_ECOM_STORE_UPDATED, stores)
      }
    } catch(err) {
      console.error(err)
    }
  },

  async getShopifyConfig({ commit }, payload) {
    const resp = await UtilService.getShopifyConfig({
      "inputFields": {
        "productStoreId": payload
      },
      "entityName": "ShopifyConfig",
      "noConditionFind": "Y",
      "fieldList": ["productStoreId", "shopifyConfigId"],
    })

    if (resp.status === 200 && !hasError(resp)) {
      commit(types.UTIL_SHOPIFY_CONFIG_UPDATED, resp.data.docs);
      return resp.data.docs[0];
    }
  },
}

export default actions;