import { MutationTree } from 'vuex'
import OrderState from './OrderState'
import * as types from './mutation-types'

const mutations: MutationTree <OrderState> = {
    [types.ORDER_LIST_UPDATED] (state, payload) {
        state.list.items = payload.items
    },
    [types.ORDER_DETAILS_UPDATED] (state, payload) {
        state.order = payload.orderDetails
    }
}
export default mutations;