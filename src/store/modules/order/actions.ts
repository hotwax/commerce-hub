import { OrderService } from '@/services/OrderService'
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import OrderState from './OrderState'
import * as types from './mutation-types'
import { getCustomerLoyalty, getIdentification, hasError, showToast } from '@/utils'
import { translate } from '@/i18n'
import { Order, OrderItem } from '@/types'
import { UtilService } from '@/services/UtilService'

const actions: ActionTree<OrderState, RootState> = {
  
  // Find Orders
  async findOrders ( { commit, state }, payload) {
    let resp;
    try {
      resp = await OrderService.findOrder(payload)
      if (resp && resp.status === 200 && !hasError(resp)) {
        let orders = resp.data.grouped.orderId.groups.map((order: any) => {
          order.orderId = order.doclist.docs[0].orderId
          order.customer = {
            name: order.doclist.docs[0].customerPartyName,
            emailId: order.doclist.docs[0].customerEmailId,
            phoneNumber: order.doclist.docs[0].customerPhoneNumber,
            toName: order.doclist.docs[0].customerPartyName,
            city: order.doclist.docs[0].shipToCity,
            state: order.doclist.docs[0].shipToState,
            zipCode: order.doclist.docs[0].postalCode,
            country: order.doclist.docs[0].shipToCountry,
            addressLine1: order.doclist.docs[0].address1,
            addressLine2: order.doclist.docs[0].address2,
          },
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
  async getOrderDetails({ commit }, orderId) {
    let resp;

    const payload = {
      "json": {
        "params": {
          "group": true,
          "group.field": "orderId",
          "group.limit": 10000,
          "q.op": "AND"
        } as any,
        "query": "*:*",
        "filter": `docType: ORDER AND orderTypeId: SALES_ORDER AND orderId: ${orderId}`
      }
    }

    try {
      resp = await OrderService.findOrderDetails(payload);

      if (resp.status == 200 && !hasError(resp)) {
        const orderName = process.env.VUE_APP_ORD_IDENT_TYPE_NAME
        const orderId = process.env.VUE_APP_ORD_IDENT_TYPE_ID
        const orderNo = process.env.VUE_APP_ORD_IDENT_TYPE_NO
        const customerLoyaltyOptions = process.env.VUE_APP_CUST_LOYALTY_OPTIONS

        const group = resp.data.grouped.orderId.groups.length > 0 && resp.data.grouped.orderId.groups[0]

        const order: Order = {
          orderId: group.doclist.docs[0].orderId,
          orderName: group.doclist.docs[0].orderName,
          customer: {
            name: group.doclist.docs[0].customerPartyName,
            emailId: group.doclist.docs[0].customerEmailId,
            phoneNumber: group.doclist.docs[0].customerPhoneNumber,
            toName: group.doclist.docs[0].customerPartyName,
            city: group.doclist.docs[0].shipToCity,
            state: group.doclist.docs[0].shipToState,
            zipCode: group.doclist.docs[0].postalCode,
            country: group.doclist.docs[0].shipToCountry,
            addressLine1: group.doclist.docs[0].address1,
            addressLine2: group.doclist.docs[0].address2,
            loyaltyOptions: getCustomerLoyalty(group.doclist.docs[0].orderNotes, customerLoyaltyOptions)
          },
          /** An array containing the items purchased in this order */
          items: group.doclist.docs,
          statusId: group.doclist.docs[0].orderStatusId,
          identifications: {
            'orderName': getIdentification(group.doclist.docs[0]?.orderIdentifications, orderName),
            'orderId': getIdentification(group.doclist.docs[0]?.orderIdentifications, orderId),
            'orderNo': getIdentification(group.doclist.docs[0]?.orderIdentifications, orderNo),
          },
          notes: group.doclist.docs[0].orderNotes
        }

        const productIds = order.items?.map((item: OrderItem) => item.productId)

        commit(types.ORDER_CURRENT_UPDATED, { order })
        this.dispatch('product/fetchProducts', { productIds });
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch(error) {
      showToast(translate("Something went wrong"));
    }
  }
} 

export default actions