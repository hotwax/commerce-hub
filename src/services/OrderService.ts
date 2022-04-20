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

const getCustomerInformation = async (payload: any): Promise<any> => {
  return api({
    url: "performFind",
    method: "post",
    data: payload
  })
}

const getPostalAddress = async (payload: any): Promise<any> => {
  return api({
    url: "performFind",
    method: "post",
    data: payload
  })
}

const getCustomerPhoneNumber = async (payload: any): Promise<any> => {
  return api({
    url: "performFind",
    method: "post",
    data: payload
  })
}

const getCustomerEmail = async (payload: any): Promise<any> => {
  return api({
    url: "performFind",
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

const getShippingDetails = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const getShippingAddress = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

export const OrderService = {
  fetchStatusChange,
  findOrder,
  findOrderDetails,
  getPOIds,
  updateOrderStatus,
  getCustomerInformation,
  getPostalAddress,
  getCustomerPhoneNumber,
  getCustomerEmail,
  getShippingDetails,
  getShippingAddress
}