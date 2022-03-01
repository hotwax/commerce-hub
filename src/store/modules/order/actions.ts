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
        let orders = resp.data.grouped.orderId.groups.map((order: any) => {
          order.orderId = order.doclist.docs[0].orderId
          order.customerPartyName = order.doclist.docs[0].customerPartyName
          order.orderName = order.doclist.docs[0].orderName
          order.orderNotes = order.doclist.docs[0].orderNotes
          order.orderDate = order.doclist.docs[0].orderDate
          order.orderStatusId = order.doclist.docs[0].orderStatusId

          return order
        })

        const total = resp.data.grouped.orderId.ngroups;
        if (payload.json.params.start && payload.json.params.start > 0) orders = state.list.orders.concat(orders)
        this.dispatch('product/getProductInformation', { orders });
        commit(types.ORDER_LIST_UPDATED, { orders, total });
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch(error){
      showToast(translate("Something went wrong"));
    }
    return resp;
  },

  async getPurchaseOrderIds({ dispatch }) {
    let resp;

    try {
      const payload = {
        "json": {
          "params": {
            "rows": 1000,
            "group": true,
            "group.field": "externalOrderId"
          },
          "filter": "docType: ORDER AND orderTypeId: PURCHASE_ORDER",
          "fields": "externalOrderId",
          "query": "*:*"
        }
      }

      resp = await OrderService.getPOIds(payload);
      if (resp.status == 200 && !hasError(resp)) {
        return resp.data.grouped.externalOrderId.groups.map((group: any) => group.groupValue);
      } else {
        console.error('Something went wrong')
      }
    } catch(err) {
      console.error('Something went wrong')
    }

    return resp;
  }
} 

export default actions