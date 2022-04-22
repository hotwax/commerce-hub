import { hasError } from "@/utils";
import api from "../api"
import store from '@/store'

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

const getOrderBrokeringInfo = async (payload: any) => {
  const params = {
    "inputFields": {
      "orderId": payload,
      "orderId_op": "in",
      "changeReasonEnumId_op": "empty"
    },
    "entityName": "OrderFacilityChange",
    "noConditionFind": "Y",
    "viewSize": 200,
    "orderBy": "orderId ASC | changeDatetime ASC",
    "fieldList": ["orderId", "changeDatetime", "facilityId", "fromFacilityId"]
  }
  try {
    const resp = await fetchOrderBrokering(params);
    const orderFacilityChangeInformation = {} as any;
    if(resp.status == 200 && !hasError(resp) && resp.data.count > 0) {
      const facilitiesList = await store.dispatch('util/fetchFacilitiesList');
      const orderIds = payload
      orderIds.forEach((orderId: any) => {
        orderFacilityChangeInformation[orderId] = {
          count: 0,
          lastBrokeredFacility: "-"
        } as any;
        resp.data.docs.forEach((order: any) => {
          if(order.orderId == orderId){
            const facility = facilitiesList.find((facility: any) => facility.facilityId === order.facilityId )
            orderFacilityChangeInformation[orderId].lastBrokeredFacility = facility.facilityName;
            orderFacilityChangeInformation[orderId].count += 1;
          }
        })
      })
      return orderFacilityChangeInformation;
    }
  } catch(err){
    console.error(err);
  }
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

const fetchOrderBrokering = async (payload: any): Promise<any> => {
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

const getOrderFacilityChange = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
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
  fetchOrderBrokering,
  fetchOldExpeditedOrders,
  getOrderBrokeringInfo,
  getOrderFacilityChange
}