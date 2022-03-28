import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import UtilState from './UtilState'

const mutations: MutationTree <UtilState> = {
    [types.UTIL_SHIPMENT_METHODS_UPDATED](state, payload) {
        state.shipmentMethod = payload
    },
    [types.UTIL_FACILITY_LOCATIONS_UPDATED](state, payload) {
        state.facilityLocations.list = payload.facilities;
        state.facilityLocations.total = payload.total;
    }
}
export default mutations;