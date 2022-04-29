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
      total: 0
    },
    poList: {
      orders: [],
      count: {
        order: 0,
        item: 0
      }
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
    },
    poQuery: {
      'productStoreId': '',
      'facilityId': '',
      'queryString': '',
      'estimatedDeliveryDate': '',
      'sort': 'orderDate desc',
    },
    current: {},
    validStatusChange: {}
  },
  getters,
  actions,
  mutations,  
}

export default orderModule;
