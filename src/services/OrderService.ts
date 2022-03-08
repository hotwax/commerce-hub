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

const findPOFromSO = async (payload: any): Promise<any> => {
  return api({
    url: "/perform-find",
    method: "post",
    data: payload
  })
}

export const OrderService = {
  findOrder,
  findPOFromSO,
  getPOIds
}