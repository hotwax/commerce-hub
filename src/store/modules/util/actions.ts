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
  async fetchGeoName({ commit, state}, geoIds){
    try {
     const resp = UtilService.getGeoName({
       "inputFields": {
         "geoId": geoIds
       },
       "entityName": "Geo",
       "fieldList": ["geoName", "geoId"],
       "noConditionFind": "Y"
     });
    } catch (err) {
      console.error(err);
    }
  },
  async findGeoName({state, commit}, geoIds){
    const cachedGeoNames = JSON.parse(JSON.stringify(state.cached));
    const geoIdFilter = geoIds.reduce((filter: Array<string>, geoId: any) => {
      if (!cachedGeoNames[geoId]) {
        filter.push(geoId)
      } 
      return filter;
    }, []);
    if (geoIdFilter.length <= 0) return cachedGeoNames;

    const resp = await UtilService.getGeoName({
      "inputFields": {
        "geoId": geoIdFilter
      },
      "entityName": "Geo",
      "fieldList": ["geoName", "geoId"],
      "noConditionFind": "Y"
    });
    if (resp.status == 200 && !hasError(resp) && resp.data.count) {
      const geos = resp.data.docs;
      geos.map((geo:any) => {
        cachedGeoNames[geo.geoId] = geo.geoName
      })
      commit(types.UTIL_GEO_CACHED_UPDATED, cachedGeoNames);
      return cachedGeoNames;
    }
  }
}

export default actions;