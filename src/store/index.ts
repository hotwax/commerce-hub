import { createStore, useStore as useVuexStore } from "vuex"
import mutations  from './mutations'
import getters  from './getters'
import actions from './actions'
import RootState from './RootState'
import createPersistedState from "vuex-persistedstate";
import userModule from './modules/user';
import productModule from "./modules/product"
import orderModule from "./modules/order"
import stockModule from "./modules/stock"
import utilModule from "./modules/util"
import jobModule from "./modules/job"


// TODO check how to register it from the components only
// Handle same module registering multiple time on page refresh
//store.registerModule('user', userModule);


const state: any = {

}

const persistState = createPersistedState({
    paths: ['user', 'util', 'order.validStatusChange', 'job'],
    fetchBeforeUse: true
})

// Added modules here so that hydration takes place before routing
const store = createStore<RootState>({
    state,
    actions,
    mutations,
    getters,
    plugins: [ persistState ],
    modules: { 
        'user': userModule,
        'order': orderModule,
        'product': productModule,
        'stock': stockModule,
        'util': utilModule,
        'job': jobModule
    },
})

export default store
export function useStore(): typeof store {
    return useVuexStore()
}