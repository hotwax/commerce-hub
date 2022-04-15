import api from "../api"

const getShipmentMethods = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const fetchEcomStores = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "POST",
    data: payload
  });
}

export const UtilService = {
  getShipmentMethods,
  fetchEcomStores
}