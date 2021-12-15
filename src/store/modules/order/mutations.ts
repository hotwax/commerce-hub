import { MutationTree } from 'vuex'
import OrderState from './OrderState'
import * as types from './mutation-types'

const mutations: MutationTree <OrderState> = {
    [types.ORDER_LIST_UPDATED] (state, payload) {
        console.log(payload)
        state.list.items = payload.items
    }
}
export default mutations;