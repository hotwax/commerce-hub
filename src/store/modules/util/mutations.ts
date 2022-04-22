import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import UtilState from './UtilState'

const mutations: MutationTree <UtilState> = {
    [types.UTIL_SHIPMENT_METHODS_UPDATED](state, payload) {
        state.shipmentMethod = payload
    },
    [types.UTIL_STATUS_UPDATED](state, payload) {
        state.status = payload
    },
    [types.UTIL_ENUMERATIONS_UPDATED](state, payload) {
        state.enumerations = payload
    },
    [types.UTIL_SHOPIFY_CONFIGS_UPDATED](state, payload) {
        state.shopifyConfigs = payload
    }
}
export default mutations;