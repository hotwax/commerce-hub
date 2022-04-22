import api from "../api"

const getShipmentMethods = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const fetchStatus = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  })
}

const getFacilities = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  })
}

export const UtilService = {
  getShipmentMethods,
  fetchStatus,
  getFacilities
}