import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import JobState from './JobState'

const mutations: MutationTree <JobState> = {
    [types.JOB_CACHED_UPDATED](state, payload) {
        state.cached = payload
    }
}
export default mutations;