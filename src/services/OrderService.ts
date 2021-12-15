import api from "../api"

const findOrder = async (payload: any): Promise<any> => {
  return api({
    url: "/wms-orders",
    method: "post",
    data: payload
  });
}

export const OrderService = {
    findOrder
}