import { OrderService } from '@/services/OrderService'
import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import OrderState from './OrderState'
import * as types from './mutation-types'
import { getCustomerLoyalty, getIdentification, hasError, showToast } from '@/utils'
import { translate } from '@/i18n'
import { Order, OrderItem } from '@/types'
import { prepareOrderQuery } from '@/utils/solrHelper'

const actions: ActionTree<OrderState, RootState> = {
  
  // Find Orders
  async findOrders ( { commit, state, dispatch }, params) {
    let resp;
    const query = prepareOrderQuery({ ...(state.query), poIds: state.poIds, ...params})
    try {
      resp = await OrderService.findOrder(query)
      if (resp && resp.status === 200 && !hasError(resp)) {
        let orders = await Promise.all(resp.data.grouped.orderId.groups.map(async(order: any) =>  {
          const info = await dispatch('getCustomerInformation', order.doclist.docs[0].orderId);
          order.orderId = order.doclist.docs[0].orderId
          order.customer = {
            name: order.doclist.docs[0].customerPartyName,
            emailId: order.doclist.docs[0].customerEmailId,
            phoneNumber: order.doclist.docs[0].customerPhoneNumber,
            toName: order.doclist.docs[0].customerPartyName,
            city: info.city,
            state: info.stateProvinceGeoId,
            zipCode: info.postalCode,
            country: info.countryGeoId,
            addressLine1: info.address1,
            addressLine2: info.address2,
          },
          order.orderName = order.doclist.docs[0].orderName
          order.orderNotes = order.doclist.docs[0].orderNotes
          order.orderDate = order.doclist.docs[0].orderDate
          order.orderStatusId = order.doclist.docs[0].orderStatusId

          return order
        })) as any
        const total = resp.data.grouped.orderId.ngroups;
        if (query.json.params.start && query.json.params.start > 0) orders = state.list.orders.concat(orders)
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
  async getOrderDetails({ commit, dispatch }, orderId) {
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
        const info = await dispatch('getCustomerInformation', group.doclist.docs[0].orderId);
        const shippingDetails = await dispatch('getShippingDetails',group.doclist.docs[0].orderId)
        await this.dispatch("util/findGeoName",[info.countryGeoId, info.stateProvinceGeoId])
        const order: Order = {
          orderId: group.doclist.docs[0].orderId,
          orderName: group.doclist.docs[0].orderName,
          customer: {
            name: group.doclist.docs[0].customerPartyName,
            emailId: group.doclist.docs[0].customerEmailId,
            phoneNumber: info.contactNumber,
            toName: group.doclist.docs[0].customerPartyName,
            city: info.city,
            state: info.stateProvinceGeoId,
            zipCode: info.postalCode,
            country: info.countryGeoId,
            addressLine1: info.address1,
            addressLine2: info.address2,
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
      console.error(error)
      showToast(translate("Something went wrong"));
    }
    return resp;
  },

  async updateAppliedFilters({ state, commit, dispatch }, payload) {
    if (payload.filterName === 'selectedPoIds') {
      const poIds = state.query.selectedPoIds;
      !poIds.includes(payload.value) ? poIds.push(payload.value) : poIds.splice(poIds.indexOf(payload.value), 1)
      payload.value = poIds
    }
    commit(types.ORDER_FILTERS_UPDATED, payload)
    const resp = await dispatch('findOrders')
    return resp;
  },

  async updateSort({ commit, dispatch }, payload) {
    commit(types.ORDER_SORT_UPDATED, payload)
    await dispatch('findOrders')
  },

  async updatePoIds({ commit }, payload) {
    commit(types.ORDER_PO_ID_UPDATED, payload)
    return payload;
  },

  async fetchStatusChange({ commit }) {
    let resp;
    try {
      resp = await OrderService.fetchStatusChange({
        "inputFields": {
          "statusTypeId": "ORDER_STATUS",
          "conditionExpression_op": "empty"
        },
        "fieldList": ["statusId", "statusIdTo"],
        "entityName": "StatusValidChangeToDetail",
        "noConditionFind": "Y",
        "viewSize": 100
      });

      if (resp.status == 200 && resp.data.count && !hasError(resp)) {
        const orderStatusValidChange = resp.data.docs.reduce((acc: any, obj: any) => {
          const status = obj['statusId']
          if (!acc[status]) {
            acc[status] = []
          }
          acc[status].push(obj.statusIdTo)
          return acc
        }, {})
        commit(types.ORDER_VALID_STATUS_CHANGE_UPDATED, orderStatusValidChange)
      } else {
        console.error('Unable to fetch valid order status change options')
      }
    } catch (err) {
      console.error(err)
    }
  },

  async updateOrderStatus({ dispatch }, payload) {
    let resp;
    try {
      resp = await OrderService.updateOrderStatus(payload);
      if (resp.status == 200 && !hasError(resp)) {
        dispatch('getOrderDetails', payload.orderId)
      } else {
        console.error('Unable to update order status')
        showToast(translate('Something went wrong'))
      }
    } catch (err) {
      console.error(err)
      showToast(translate('Something went wrong'))
    }
  },

  async getShippingDetails ({commit}, orderId) {
    const resp = await OrderService.getShippingDetails({
      "inputFields": {
        "orderId": orderId,
      },
      "fieldList": ["orderId", "contactMechId"],
      "entityName": "OrderItemShipGroup",
      "noConditionFind": "Y",
    })
    const shippingAddress = await OrderService.getShippingAddress({
      "inputFields": {
        "contactMechId": resp.data.docs[0].contactMechId,
      },
      "fieldList": ["address1", "address2", "city", "countryGeoId", "postalCode", "stateProvinceGeoId"],
      "entityName": "PostalAddress",
      "noConditionFind": "Y",
    })
  },
  
  async getCustomerInformation({ commit },orderId){
    const resp = await OrderService.getCustomerInformation({
      "inputFields": {
        "orderId": orderId,
        "contactMechPurposeTypeId": ["BILLING_LOCATION", "PHONE_BILLING"]
      },  
      "entityName": "OrderContactMech",
      "fieldList": ["contactMechPurposeTypeId", "contactMechId"],
      "noConditionFind": "Y",
    });
    const postalAddress = resp.data.docs.find((item: any) => {
      return item.contactMechPurposeTypeId === "BILLING_LOCATION";
    });
    const phoneNumber = resp.data.docs.find((item: any) => {
      return item.contactMechPurposeTypeId === "PHONE_BILLING";
    });
    const address = await OrderService.getPostalAddress({
      "inputFields": {
        "contactMechId": postalAddress?.contactMechId,
      },
      "fieldList": ["city", "stateProvinceGeoId", "postalCode", "countryGeoId", "address1", "address2"],
      "entityName": "PostalAddress",
      "noConditionFind": "Y",
    });
    const number = await OrderService.getCustomerPhoneNumber({
      "inputFields": {
        "contactMechId": phoneNumber?.contactMechId,
      },
      "fieldList": ["contactMechId", "contactNumber"],
      "entityName": "TelecomNumber",
      "noConditionFind": "Y",
    });
    const info = {...address.data.docs[0], ...number.data.docs[0]}
    return info;
  }
} 

export default actions