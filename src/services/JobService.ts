import { hasError } from "@/utils";
import moment from "moment";
import api from "../api"

const runServiceNow = async (job: any): Promise<any> => {
  let resp;

    const payload = {
      'JOB_NAME': job.jobName,
      'SERVICE_NAME': job.serviceName,
      'SERVICE_COUNT': '0',
      'jobFields': {
        // TODO: for now we are sending empty product store id but need to get the product store id
        'productStoreId': '',
        'systemJobEnumId': job.systemJobEnumId,
        'tempExprId': job.tempExprId,
        'parentJobId': job.parentJobId,
        'recurrenceTimeZone': moment.tz.guess()
      },
      // TODO: for now we are sending empty shopifyConfig id but need to get the shopifyConfig id
      'shopifyConfigId': '',
      'statusId': "SERVICE_PENDING",
      'systemJobEnumId': job.systemJobEnumId
    } as any

    // checking if the runtimeData has productStoreId, and if present then adding it on root level
    // TODO: for now we are sending empty product store id but need to get the product store id
    job?.runtimeData?.productStoreId?.length >= 0 && (payload['productStoreId'] = '')
    job?.priority && (payload['SERVICE_PRIORITY'] = job.priority.toString())

    try {
      resp = await scheduleJob({ ...job.runtimeData, ...payload });
      if (resp.status == 200 && !hasError(resp)) {
        console.error('Something went wrong while running the job')
      } else {
        console.error('Something went wrong while running the job')
      }
    } catch (err) {
      console.error('Something went wrong while running the job')
      console.error(err)
    }
    return resp;
}

const fetchJobInformation = async (payload: any): Promise <any>  => {
  return api({
    url: "/findJobs",
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