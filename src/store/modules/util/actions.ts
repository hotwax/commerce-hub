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
      const filters = state.currentLocationFilterSelected;
      if (filters.productStoreId !== 'All') payload.inputFields.productStoreId = filters.productStoreId;
      if (filters.facilityTypeId !== 'All') payload.inputFields.facilityTypeId = filters.facilityTypeId;

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
        "viewSize": 2 * payload.length,
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
        "viewSize": payload.length,
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
  },
  async updateLocationFilters({ commit }, payload) {
    commit(types.UTIL_LOCATION_FILTERS_UPDATED, payload)
    return payload;
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
    } catch (err) {
      console.error('Something went wrong while fetching status for items and orders')
    }
    return cachedStatus;
  }
}

export default actions;