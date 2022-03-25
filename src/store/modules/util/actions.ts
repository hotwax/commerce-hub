import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import * as types from './mutation-types'
import { hasError, showToast } from '@/utils'
import "moment-timezone";
import UtilState from './UtilState'
import { UtilService } from '@/services/UtilService'
import { translate } from '@/i18n'

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
  async getFacilityLocations({ dispatch }, payload) {
    let resp;

    try{
      resp = await UtilService.getFacilityLocations(payload);

      if(resp.status === 200 && resp.data.docs?.length && resp.data.docs?.length > 0 && !hasError(resp)) {
        let facilityLocations: any = new Set();

        resp.data.docs.forEach((facilityLocation: any) => {
          if(facilityLocation.facilityId) facilityLocations.add(facilityLocation.facilityId);
        });
        facilityLocations = [...facilityLocations]
      
        const param = {
          "inputFields": {
            "facilityId": facilityLocations,
            "facilityId_op": "in"
          },
          "fieldList": [],
          "viewSize": facilityLocations.length,
          "entityName": "Facility",
          "distinct": "Y",
          "noConditionFind": "Y"
        }
        dispatch('getfacilitiesInfo', param);
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch(error) {
      showToast(translate("Something went wrong"));
      console.error(error);
    }
  },

  async getfacilitiesInfo({ commit }, payload) {
    let resp;

    try{
      resp = await UtilService.getFacilityLocations(payload);

      if(resp.status === 200 && resp.data.docs?.length && resp.data.docs?.length > 0 && !hasError(resp)) {
        commit(types.UTIL_FACILITY_LOCATIONS_UPDATED, resp.data.docs);
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch(error) {
      showToast(translate("Something went wrong"));
      console.error(error);
    }
  }
}

export default actions;