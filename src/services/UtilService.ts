import api from "../api"

const getShipmentMethods = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const getFacilities = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "POST",
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

const fetchFacilityTypes = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const getFacilityIdentifications = async (payload: any): Promise<any> => {
  return api({
    url: "/performFind",
    method: "post",
    data: payload
  });
}

const getFacilityAddress = async (payload: any): Promise<any> => {
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

export const UtilService = {
  getShipmentMethods,
  getFacilities,
  fetchEcomStores,
  fetchFacilityTypes,
  getFacilityIdentifications,
  getFacilityAddress,
  fetchStatus
}