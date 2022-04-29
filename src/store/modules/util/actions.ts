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

  async fetchFacility({ commit }) {
    let resp;
    try {
      resp = await UtilService.fetchFacility({
        "entityName": "ProductStoreAndFacility",
        "distinct": "Y",
        "noConditionFind": "Y",
        "fieldList": ["facilityId", "facilityName"],
        "viewSize": 50
      })
      if (resp.status == 200 && resp.data.count && !hasError(resp)) {
        const facilities = resp.data.docs
        facilities.push({'facilityId': '', 'facilityName': 'any'})
        commit(types.UTIL_FACILITY_UPDATED, facilities)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export default actions;