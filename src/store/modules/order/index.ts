import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import OrderState from './OrderState'
import RootState from '../../RootState'

const orderModule: Module<OrderState, RootState> ={
  namespaced: true,
  state: {
    list: {
      orders: [],
      orderCount: 0,
      itemCount: 0
    },
    poIds: {},
    query: {
      'status': '',
      'shippingMethod': '',
      'shipFromLocation': '',
      'storePickup': false,
      'shipFromStore': false,
      'preOrder': false,
      'backOrder': false,
      'orderCreated': '',
      'promisedDate': '',
      'autoCancelDate': '',
      'selectedPoIds': [] as Array<string>,
      'queryString': '',
      'sort': 'orderDate desc',
      'productStoreId': ''
    },
    current: {},
    validStatusChange: {},
    stuck: {
      orders: [],
      total: 0,
    },
    oldExpedited: {
      orders: [],
      total: 0,
    },
    orderFacilityChange: {}
  },
  
  getters,
  actions,
  mutations,  
}

export default orderModule;
