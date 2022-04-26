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

  // Get enumeration descriptions
  async getEnumerations({ state, commit }, payload) {
    const currentEnums = JSON.parse(JSON.stringify(state.enumerations));
    const enumIdFilter = payload.reduce((enums: any, enumId: any) => {
      if(!currentEnums[enumId]) {
        enums.push(enumId);
      }
      return enums;
    }, []);

    if(!enumIdFilter.length) return currentEnums;

    const params = {
      "inputFields": {
        "enumId": enumIdFilter,
        "enumId_op": 'in'
      },
      "fieldList": ['enumId', 'description'],
      "entityName": "Enumeration",
      "noConditionFind": "Y",
      "distinct": "Y"
    }
    const resp = await UtilService.getEnumerations(params);
    if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
      const enumerations = resp.data.docs;
      if(resp.data) {
        enumerations.map((enumeration: any) => {
          currentEnums[enumeration.enumId] = enumeration
        });
      }
      commit(types.UTIL_ENUMERATIONS_UPDATED, currentEnums);
    }

    return currentEnums;
  },

  // Get shopify configIds
  async getShopifyConfigIds({ state, commit }, payload) {
    const currentConfigs = JSON.parse(JSON.stringify(state.shopifyConfigs));

    const prdtStoreFilter = payload.reduce((stores: any, storeId: any) => {
      if(!currentConfigs[storeId]) {
        stores.push(storeId);
      }
      return stores;
    }, []);

    if(!prdtStoreFilter.length) return currentConfigs;

    const params = {
      "inputFields": {
        "productStoreId": prdtStoreFilter,
        "productStoreId_op": 'in'
      },
      "fieldList": ['shopifyConfigId', 'productStoreId'],
      "entityName": "ShopifyConfig",
      "noConditionFind": "Y",
      "distinct": "Y"
    }
    
    const resp = await UtilService.getShopifyConfigIds(params);
    if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
      const shopifyConfigIds = resp.data.docs
      if(resp.data) {
        shopifyConfigIds.map((config: any) => {
          currentConfigs[config.productStoreId] = config
        });
      }
                  
      commit(types.UTIL_SHOPIFY_CONFIGS_UPDATED, currentConfigs);
    }

    return currentConfigs
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
  }
}

export default actions;