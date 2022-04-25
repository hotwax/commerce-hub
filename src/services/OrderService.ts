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
  let orderIds = payload.map((order: any) => {
    return order.orderId;
  })
  orderIds = [...new Set(orderIds)]
  const params = {
    "inputFields": {
      "orderId": orderIds,
      "orderId_op": "in",
    },
    "entityName": "OrderFacilityChange",
    "noConditionFind": "Y",
    "viewSize": 200,
    "orderBy": "orderId ASC | changeDatetime ASC",
    "fieldList": ["orderId", "changeDatetime", "facilityId", "fromFacilityId", "orderItemSeqId"]
  }
  try {
    const resp = await fetchOrderBrokering(params);
    const orderFacilityChangeInformation = {} as any;
    if(resp.status == 200 && !hasError(resp) && resp.data.count > 0) {
      const facilitiesList = await store.dispatch('util/fetchFacilitiesList');
      const orders = payload
      orders.forEach((order: any) => {
        if (!orderFacilityChangeInformation[order.orderId]) {
          orderFacilityChangeInformation[order.orderId] = {}
        }
        orderFacilityChangeInformation[order.orderId][order.orderItemSeqId] = {
          count: 0,
          lastBrokeredFacility: "-"
        } as any;
        resp.data.docs.forEach((ordersBrokered: any) => {
          if(ordersBrokered.orderId == order.orderId && ordersBrokered.orderItemSeqId == order.orderItemSeqId){
            let facility;
            if(facilitiesList){
              facility = facilitiesList.find((facility: any) => facility.facilityId === ordersBrokered.facilityId )
              if(facility.facilityName && facility.facilityId !== "_NA_"){
                orderFacilityChangeInformation[order.orderId][order.orderItemSeqId].lastBrokeredFacility = facility?.facilityName ? facility?.facilityName : '-';
              }
            }
            orderFacilityChangeInformation[order.orderId][order.orderItemSeqId].count += 1;
          }
        })
        if(orderFacilityChangeInformation[order.orderId][order.orderItemSeqId].count>0){
          orderFacilityChangeInformation[order.orderId][order.orderItemSeqId].count--;
        }
      })
      return orderFacilityChangeInformation;
    }
  } catch(err){
    console.error(err);
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