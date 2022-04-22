import { hasError } from "@/utils";
import api from "../api"

const getShipmentDetailForOrderItem = async (payload: any) => {
  let resp;

  // TODO: implement grouping logic to get the tracking code for order items
  // currently when grouping only getting response for two groups thus used in operator for now
  const params = {
    "inputFields": {
      "primaryOrderId": payload,
      "primaryOrderId_op": "in",
      "trackingCode_op": "not-empty",
      "orderItemSeqId_op": "not-empty"
    },
    "entityName": "ShipmentPackageRouteSegAndItemDetail",
    "distinct": "Y",
    "noConditionFind": "Y",
    "fieldList": ["trackingCode", "primaryOrderId", "orderItemSeqId"],
    "viewSize": 100
  }

  try {
    resp = await fetchShipmentDetailForOrderItem(params)
    if(resp.status == 200 && !hasError(resp) && resp.data.count > 0) {
      return resp.data.docs.reduce((acc: any, list: any) => {
        if(!acc[list.primaryOrderId]) {
          acc[list.primaryOrderId] = {}
        }
        acc[list.primaryOrderId][list.orderItemSeqId] = list.trackingCode
        return acc;
      }, {})
    } else {
      console.error('Something went wrong while fetching tracking code for order items or there may not exist any tracking code for current order ids')
    }
  } catch(err) {
    console.error(err)
  }
  return {};
}

const findOrder = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  });
}

const getPOIds = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  })
}

const findOrderDetails = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  })
}

const fetchStatusChange = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const updateOrderStatus = async (payload: any): Promise<any> => {
  return api({
    url: "/service/changeOrderStatus",
    method: "post",
    data: payload
  })
}

const fetchStuckOrders = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  })
}

const getPOIdsForSo = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  })
}

const fetchShipmentDetailForOrderItem = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  })
}

const getOrderFacilityChange = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const fetchOldExpeditedOrders = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  })
}

export const OrderService = {
  fetchShipmentDetailForOrderItem,
  fetchStatusChange,
  findOrder,
  findOrderDetails,
  getPOIds,
  getPOIdsForSo,
  getShipmentDetailForOrderItem,
  updateOrderStatus,
  fetchStuckOrders,
  getOrderFacilityChange,
  fetchOldExpeditedOrders
}