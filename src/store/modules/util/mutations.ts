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
    [types.UTIL_ECOM_STORE_UPDATED](state, payload) {
        if(payload) {
            payload.map((store: any) => {
                state.productStore[store.productStoreId] = store.storeName
            })
        }
    }
}
export default mutations;