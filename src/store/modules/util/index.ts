import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import RootState from '@/store/RootState'
import UtilState from './UtilState'

const utilModule: Module<UtilState, RootState> = {
    namespaced: true,
    state: {
      shipmentMethod: {},
      facilityLocations: {
        list: [],
        total: 0
      },
      currentLocationFilterSelected: {
        productStoreId: 'All',
        facilityTypeId: 'All'
      }
    },
    getters,
    actions,
    mutations,
}

export default utilModule;