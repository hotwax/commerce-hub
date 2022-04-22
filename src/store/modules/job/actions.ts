import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import * as types from './mutation-types'
import { hasError } from '@/utils'
import "moment-timezone";
import JobState from './JobState'
import { JobService } from '@/services/JobService'

const actions: ActionTree<JobState, RootState> = {
  async fetchJobInformation({ state, commit }, payload) {
    const cachedJob = JSON.parse(JSON.stringify(state.cached));

    if(cachedJob[payload]) {
      JobService.runServiceNow(cachedJob[payload]);
      return ;
    }

    try {
      const resp = await JobService.fetchJobInformation({
        'inputFields': {
          'statusId': 'SERVICE_DRAFT',
          'systemJobEnumId': payload
        },
        "noConditionFind": "Y",
        "viewSize": 1
      })
      if (resp.status === 200 && !hasError(resp) && resp.data.docs) {
        const job = resp.data.docs[0];
        cachedJob[payload] = job;
        JobService.runServiceNow(cachedJob[payload]);
        commit(types.JOB_CACHED_UPDATED, cachedJob);
      } else {
        console.error('No record found for job enum')
      }
    } catch (err) {
      console.error(err)
    }
  },
}

export default actions;