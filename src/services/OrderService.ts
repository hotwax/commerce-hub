import api from "../api"

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

const fetchStuckOrders = async (payload: any): Promise<any> => {
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

const fetchOldExpeditedOrders = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  })
}

export const OrderService = {
  findOrder,
  findOrderDetails,
  fetchStuckOrders,
  getOrderFacilityChange,
  fetchOldExpeditedOrders,
  getPOIds
}