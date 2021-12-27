import api from "../api"

const findOrder = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "post",
    data: payload
  });
}

const findOrderDetails = async (): Promise<any> => {
  return api({
    url:"orders/NN11285",
    method: "get",
  })
}

export const OrderService = {
    findOrder,
    findOrderDetails
}