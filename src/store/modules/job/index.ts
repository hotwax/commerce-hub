import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import RootState from '@/store/RootState'
import JobState from './JobState'

const jobModule: Module<JobState, RootState> = {
    namespaced: true,
    state: {
      cached: {}
    },
    getters,
    actions,
    mutations,
}

export default jobModule;