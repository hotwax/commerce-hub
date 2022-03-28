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
  async getFacilities({ commit, state, dispatch }, payload) {
    let resp;

    try{
      resp = await UtilService.getFacilities(payload);

      if(resp.status === 200 && resp.data.docs?.length && resp.data.docs?.length > 0 && !hasError(resp)) {
        let facilities = resp.data.docs;
        const total = resp.data.count;

        let facilityIds: any = new Set();
        facilities.forEach((facility: any) => {
          if (facility.facilityId) facilityIds.add(facility.facilityId);
        });
        facilityIds = [...facilityIds]

        await dispatch('getFacilityIdentifications', facilityIds).then((res) => {
          facilities.map((facility: any) => {
            const facIdent = res.find((fac: any) => fac.facilityId === facility.facilityId);

            if(facIdent?.facilityIdenTypeId === "SHOPIFY_FAC_ID") {
              facility.shopifyId = facIdent?.idValue;
            } else if(facIdent?.facilityIdenTypeId === "NETSUITE_FAC_ID") {
              facility.netsuiteId = facIdent?.idValue;
            }
          })
        });
        await dispatch('getFacilityAddress', facilityIds).then((res) => {
          facilities.map((facility: any) => {
            const facAddress = res.find((fac: any) => fac.facilityId === facility.facilityId);

            facility.address1 = facAddress?.address1;
            facility.address2 = facAddress?.address2;
            facility.city = facAddress?.city;
            facility.postalCode = facAddress?.postalCode;
            facility.stateGeoCode = facAddress?.stateGeoCode;
          })
        });
        if (payload.viewIndex && payload.viewIndex > 0) facilities = state.facilityLocations.list.concat(facilities);
        commit(types.UTIL_FACILITY_LOCATIONS_UPDATED, { facilities, total });
      } else {
        showToast(translate("Something went wrong"));
        commit(types.UTIL_FACILITY_LOCATIONS_UPDATED, { facilities: [], total: 0});
      }
    } catch(error) {
      showToast(translate("Something went wrong"));
      console.error(error);
    }
    return resp;
  },
  async getFacilityIdentifications({ commit }, payload) {
    let resp;

    try{
      const params = {
        "inputFields": {
          "facilityId": payload,
          "facilityId_op": "in",
          "facilityIdenTypeId": ["SHOPIFY_FAC_ID", "NETSUITE_FAC_ID"],
          "facilityIdenTypeId_op": "in"
        },
        "fieldList": ["facilityId", "facilityIdenTypeId", "idValue"],
        "entityName": "FacilityIdentification",
        "noConditionFind": "Y",
        "distinct": "Y"
      }
      
      resp = await UtilService.getFacilityIdentifications(params);
      if (resp.status === 200 && resp.data.docs?.length && resp.data.docs?.length > 0 && !hasError(resp)) {
        return resp.data.docs;
      }
    } catch(error) {
      showToast(translate("Something went wrong"));
      console.error(error);
    }
    return [];
  },
  async getFacilityAddress({ commit }, payload) {
    let resp;

    try{
      const params = {
        "inputFields": {
          "facilityId": payload,
          "facilityId_op": "in"
        },
        "fieldList": ["address1", "address2", "city", "postalCode", "stateGeoCode", "facilityId"],
        "entityName": "FacilityContactDetailByPurpose",
        "noConditionFind": "Y",
        "distinct": "Y"
      }

      resp = await UtilService.getFacilityIdentifications(params);
      if (resp.status === 200 && resp.data.docs?.length && resp.data.docs?.length > 0 && !hasError(resp)) {
        return resp.data.docs;
      }
    } catch(error) {
      showToast(translate("Something went wrong"));
      console.error(error);
    }
    return [];
  }
}

export default actions;