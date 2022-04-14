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
    poIds: {},
    query: {
      'status': 'any',
      'shippingMethod': 'any',
      'shipFromLocation': 'any',
      'storePickup': false,
      'shipFromStore': false,
      'preOrder': false,
      'backOrder': false,
      'unfillable': false,
      'orderCreated': '',
      'promisedDate': '',
      'autoCancelDate': '',
      'selectedPoIds': [] as Array<string>,
      'queryString': '',
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
