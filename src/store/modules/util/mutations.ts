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
    [types.UTIL_FACILITY_LIST_UPDATED](state, payload) {
        state.facilities = payload
    },
    [types.UTIL_ECOM_STORE_UPDATED](state, payload) {
        state.productStore = payload
    },
    [types.UTIL_SHOPIFY_CONFIG_UPDATED](state, payload) {
        payload.map((store: any) => {
            state.shopifyConfig[store.productStoreId] = store.shopifyConfigId
        })
    }
}
export default mutations;