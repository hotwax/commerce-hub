import { hasError } from "@/utils";
import moment from "moment";
import api from "@/api"
import store from "@/store";

const runServiceNow = async (job: any): Promise<any> => {
  let resp;

  let shopifyConfigId = store.state.util.shopifyConfig[job.productStoreId]

  if (!shopifyConfigId) {
    shopifyConfigId = await store.dispatch('util/getShopifyConfig', job.productStoreId).then((res) => res?.shopifyConfigId ? res?.shopifyConfigId : '')
  }

  const payload = {
    'JOB_NAME': job.jobName,
    'SERVICE_NAME': job.serviceName,
    'SERVICE_COUNT': '0',
    'jobFields': {
      'productStoreId': job.productStoreId,
      'systemJobEnumId': job.systemJobEnumId,
      'tempExprId': job.tempExprId,
      'parentJobId': job.parentJobId,
      'recurrenceTimeZone': moment.tz.guess()
    },
    'shopifyConfigId': shopifyConfigId,
    'statusId': "SERVICE_PENDING",
    'systemJobEnumId': job.systemJobEnumId
  } as any

  // checking if the runtimeData has productStoreId, and if present then adding it on root level
  job?.runtimeData?.productStoreId?.length >= 0 && (payload['productStoreId'] = job.productStoreId)
  job?.priority && (payload['SERVICE_PRIORITY'] = job.priority.toString())

  try {
    resp = await scheduleJob({ ...job.runtimeData, ...payload });
    if (resp.status == 200 && !hasError(resp)) {
      console.info('Service scheduled successfully')
      return 'success'
    } else {
      console.error('Something went wrong while running the job')
    }
  } catch (err) {
    console.error('Something went wrong while running the job', err)
  }
  return 'error';
}

const fetchJobInformation = async (payload: any): Promise <any>  => {
  return api({
    url: "findJobs",
    method: "post",
    data: payload
  });
}

const scheduleJob = async (payload: any): Promise <any>  => {
  return api({
    url: "scheduleService",
    method: "post",
    data: payload
  });
}

export const JobService = {
  fetchJobInformation,
  runServiceNow,
  scheduleJob
}