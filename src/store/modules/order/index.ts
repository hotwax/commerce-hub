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
    availableOrderFilterOptions: {
      'date': {
        'orderCreated': '',
        'promiseDate': '',
        'autoCancelDate': ''
      },
      'type': {
        'storePickup': false,
        'shipFromStore': false,
        'preOrder': false,
        'backOrder': false,
        'unfillable': false
      },
      'fulfillment': {
        'status': 'any',
        'shippingMethod': 'any',
        'shipFromLocation': 'any'
      }
    },
    currentOrderFiltersSelected: {
      'status': 'any',
      'shippingMethod': 'any',
      'shipFromLocation': 'any',
      'storePickup': false,
      'shipFromStore': false,
      'preOrder': false,
      'backOrder': false,
      'unfillable': false,
      'orderCreated': '',
      'promiseDate': '',
      'autoCancelDate': ''
    },
    sort: 'orderDate',
    current: {}
  },
  getters,
  actions,
  mutations,  
}

export default orderModule;
