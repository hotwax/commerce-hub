import { OrderService } from '@/services/OrderService'
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import OrderState from './OrderState'
import * as types from './mutation-types'
import { hasError, showToast } from '@/utils'
import { translate } from '@/i18n'

const actions: ActionTree<OrderState, RootState> = {
  
  // Find Orders
  async findOrders ( { commit, state }, payload) {
    let resp;
    try {
      resp = await OrderService.findOrder(payload)
      if (resp && resp.status === 200 && !hasError(resp)) {
        const orders = resp.data.grouped.orderId;
        this.dispatch('product/getProductInformation', { orders });
        commit(types.ORDER_LIST_UPDATED, {
          items: orders.groups,
        });
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch(error){
      showToast(translate("Something went wrong"));
    }
    return resp;
  },
  async getOrderDetails({commit}, payload){
    let resp;
    try{
      resp = await OrderService.findOrderDetails(payload);
      commit(types.ORDER_DETAILS_UPDATED, {
        orderDetails: resp.data
      })
    } catch(error) {
      showToast(translate("Something went wrong"));
    }
  }
} 

export default actions