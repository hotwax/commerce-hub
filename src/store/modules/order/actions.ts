import { OrderService } from '@/services/OrderService'
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import OrderState from './OrderState'
import * as types from './mutation-types'
import { hasError, showToast } from '@/utils'
import { translate } from '@/i18n'

const actions: ActionTree<OrderState, RootState> = {
  
  // Find Orders
  async findOrders ( { commit, state, dispatch }, payload) {
    let resp;
    try {
      resp = await OrderService.findOrder(payload)
      if (resp && resp.status === 200 && !hasError(resp)) {
        const orders = resp.data.grouped.orderId;
        // Add some product data into cache to access it later 
        dispatch('getProductInformation', { orders });

        if (payload.viewIndex && payload.viewIndex > 0) orders.groups = state.list.items.concat(orders.groups)
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

  // Add Product information in cache

  async getProductInformation(context, { orders }){
    let productIds: any = new Set();
    orders.groups.forEach((order: any) => {
      order.doclist.docs.forEach((item: any) =>{
        if(item.productId) productIds.add(item.productId);
      })
    })
    productIds = [...productIds]
    if(productIds.length){
      this.dispatch('product/fetchProducts', { productIds })
    }
  }

} 

export default actions