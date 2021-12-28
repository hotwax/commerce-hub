import api from "../api"

const findOrder = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  });
}

const findOrderDetails = async (payload: any): Promise<any> => {
  return api({
    url:`orders/${payload}`,
    method: "get",
  })
}

export const OrderService = {
    findOrder,
    findOrderDetails
}