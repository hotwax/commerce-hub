import api from "../api"

const findOrder = async (payload: any): Promise<any> => {
  return api({
    url: "/searchOrders",
    method: "post",
    data: payload
  });
}

export const OrderService = {
    findOrder
}