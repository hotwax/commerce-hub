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

  // Get shopify enumeration description
  async getShopifyEnumerations({ state, commit }, payload) {
    const enumIds = payload.map((enumeration: any) => enumeration.productIdentifierEnumId)
    const currentEnums = JSON.parse(JSON.stringify(state.enumerations));
    const currentEnumIds = Object.keys(state.enumerations);

    const enumIdFilter = enumIds.reduce((enums: any, enumId: any) => {
      if(!currentEnumIds.includes(enumId)) {
        enums.push(enumId);
      }
      return enums;
    }, []);

    if(!enumIdFilter.length) return currentEnums;

    const params = {
      "inputFields": {
        "enumId": enumIds,
        "enumId_op": 'in'
      },
      "fieldList": ['enumId', 'description'],
      "entityName": "Enumeration",
      "noConditionFind": "Y",
      "distinct": "Y"
    }
    const resp = await UtilService.getShopifyEnumeration(params);
    if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
      const shopifyEnumeration = resp.data.docs;
      if(resp.data) {
        shopifyEnumeration.map((enumeration: any) => {
          currentEnums[enumeration.enumId] = enumeration
        });
      }
      commit(types.UTIL_ENUMERATIONS_UPDATED, currentEnums);
    }

    return currentEnums;
  },

  // Get shopify configs
  // async getShopifyConfigIds({ state, commit }, payload) {
    // const productStoreIds = payload.map((prdtStore: any) => prdtStore.productStoreId)
    // const currentEnums = JSON.parse(JSON.stringify(state.enumerations));
    // const currentEnumIds = Object.keys(state.enumerations);

    // const enumIdFilter = enumIds.reduce((enums: any, enumId: any) => {
    //   if(!currentEnumIds.includes(enumId)) {
    //     enums.push(enumId);
    //   }
    //   return enums;
    // }, []);

    // if(!enumIdFilter.length) return currentEnums;

    // const params = {
    //   "inputFields": {
    //     "enumId": enumIds,
    //     "enumId_op": 'in'
    //   },
    //   "fieldList": ['enumId', 'description'],
    //   "entityName": "Enumeration",
    //   "noConditionFind": "Y",
    //   "distinct": "Y"
    // }
    // const resp = await UtilService.getShopifyEnumeration(params);
    // if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
    //   const shopifyEnumeration = resp.data.docs;
    //   if(resp.data) {
    //     shopifyEnumeration.map((enumeration: any) => {
    //       currentEnumIds[enumeration.enumId] = enumeration
    //     });
    //   }
    //   commit(types.UTIL_ENUMERATIONS_UPDATED, currentEnumIds);
    //   return currentEnumIds;
    // }
    // return resp
  // }
}

export default actions;