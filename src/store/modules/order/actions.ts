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
    console.log(payload)
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
    return resp;
  },

  async appliedFiltersUpdated({ commit }, payload) {
    commit(types.ORDER_FILTERS_UPDATED, payload)
    return payload;
  },

  async updateQuery({ state }, params) {
    const typeFilterSelected = [];

    const payload = {
      "json": {
        "params": {
          "sort": "orderDate desc",
          "rows": params.viewSize,
          "start": params.viewSize * params.viewIndex,
          "group": true,
          "group.field": "orderId",
          "group.limit": 10000,
          "group.ngroups": true,
          "q.op": "AND"
        } as any,
        "query": "*:*",
        "filter": "docType: ORDER AND orderTypeId: SALES_ORDER",
        "facet": {
          "orderStatusIdFacet": {
              "field": "orderStatusId",
              "mincount": 0,
              "limit": -1,
              "sort": "index",
              "type": "terms"
          },
          "shipmentMethodTypeIdFacet": {
            "excludeTags": "shipmentMethodTypeIdFilter",
            "field": "shipmentMethodTypeId",
            "mincount": 0,
            "limit": -1,
            "sort": "index",
            "type": "terms"
          }
        }
      }
    }

    if (params.queryString) {
      payload.json.params.defType = 'edismax'
      payload.json.params.qf = 'orderId customerPartyName customerPartyId productId internalName'
      payload.json.query = `*${params.queryString}*`
    }

    // updating the filter value in json object as per the filters selected
    // TODO: optimize this code
    if (state.currentOrderFiltersSelected.storePickup) {
      payload.json.filter = payload.json.filter.concat(' AND shipmentMethodTypeId: STOREPICKUP')
    }

    if (state.currentOrderFiltersSelected.shipFromStore) {
      payload.json.filter = payload.json.filter.concat(' AND -shipmentMethodTypeId: STOREPICKUP AND facilityTypeId: RETAIL_STORE')
    }

    if (state.currentOrderFiltersSelected.preOrder) {
      typeFilterSelected.push('PRE_ORDER_PARKING')
    }

    if (state.currentOrderFiltersSelected.backOrder) {
      typeFilterSelected.push('BACKORDER_PARKING')
    }

    if (state.currentOrderFiltersSelected.unfillable) {
      typeFilterSelected.push('_NA_')
    }

    const typeFilterValues = typeFilterSelected.toString().replaceAll(",", " OR ")

    payload.json.filter = payload.json.filter.concat(` AND facilityId: (${typeFilterValues ? typeFilterValues : '*'})`)

    if (state.currentOrderFiltersSelected.shipFromLocation === 'store') {
      payload.json.filter = payload.json.filter.concat(' AND facilityTypeId: RETAIL_STORE')
    } else if (state.currentOrderFiltersSelected.shipFromLocation === 'warehouse') {
      payload.json.filter = payload.json.filter.concat(' AND facilityTypeId: WAREHOUSE')
    }

    if (state.currentOrderFiltersSelected.status) {
      payload.json.filter = payload.json.filter.concat(` AND orderStatusId: ${state.currentOrderFiltersSelected.status !== 'any' ? state.currentOrderFiltersSelected.status : '*'}`)
    }

    if (state.currentOrderFiltersSelected.shippingMethod) {
      payload.json.filter = payload.json.filter.concat(` AND shipmentMethodTypeId: ${state.currentOrderFiltersSelected.shippingMethod !== 'any' ? state.currentOrderFiltersSelected.shippingMethod : '*' }`)
    }

    // TODO: improve logic to pass the date in the solr-query payload
    if (state.currentOrderFiltersSelected.orderCreated) {
      payload.json.filter = payload.json.filter.concat(` AND orderDate: [${state.currentOrderFiltersSelected.orderCreated + 'T00:00:00Z'} TO ${state.currentOrderFiltersSelected.orderCreated + 'T23:59:59Z'}]`)
    }

    if (state.currentOrderFiltersSelected.promiseDate) {
      payload.json.filter = payload.json.filter.concat(` AND promiseDateTime: [${state.currentOrderFiltersSelected.promiseDate + 'T00:00:00Z'} TO ${state.currentOrderFiltersSelected.promiseDate + 'T23:59:59Z'}]`)
    }

    if (state.currentOrderFiltersSelected.autoCancelDate) {
      payload.json.filter = payload.json.filter.concat(` AND autoCancelDate: [${state.currentOrderFiltersSelected.autoCancelDate + 'T00:00:00Z'} TO ${state.currentOrderFiltersSelected.autoCancelDate + 'T23:59:59Z'}]`)
    }

    return payload;
  },

  updateCurrent ({ commit }, payload) {
    commit(types.ORDER_CURRENT_UPDATED, { order: payload.order })
  },

  async fetchStuckOrders({commit}){
    let resp;
    const payload = {
      "json": {
        "params": {
          "rows": "20",
          "sort": "orderDate asc"
        },
        "query":"(*:*)",
        "filter": ["docType:ORDER","orderTypeId: SALES_ORDER","facilityId: _NA_","orderStatusId: ORDER_APPROVED" ]
      }
    }
    try {
      resp = await OrderService.findOrderDetails(payload);
      if (resp.status === 200 && !hasError(resp)) {
        const productIds = resp.data.response.docs.map((order: any) => {
          return order.productId;
        })
        const orderIds = resp.data.response.docs.map((order: any) => {
          return order.orderId;
        })
        const viewSize = productIds.length;
        const viewIndex = 0;
        const payload = {
          viewSize,
          viewIndex,
          productIds
        }
        await this.dispatch('stock/addProducts', payload);
        await this.dispatch("product/fetchProducts", payload);
        const orderFacilityChangeInformation = await this.dispatch('order/getOrderFacilityChangeInformation', orderIds);
        commit(types.ORDER_STUCK_UPDATED, { orders: resp.data.response.docs, total: resp.data.response.numFound, orderFacilityChangeInformation })
      }
    } catch(err) {
      console.log("error");
    } 
    
  },
  async getOrderFacilityChangeInformation({commit}, payload){
    try {
      const orderFacilityChangeInformation = {} as any;
      const resp = await OrderService.getOrderFacilityChange({
        "inputFields": {
          "orderId": payload,
          "orderId_op": "in",
          "changeReasonEnumId_op": "empty"
        },
        "entityName": "OrderFacilityChange",
        "noConditionFind": "Y",
        "viewSize": 200,
        "orderBy": "orderId ASC | changeDatetime ASC",
        "fieldList": ["orderId", "changeDatetime", "facilityId", "fromFacilityId"]
      });
      this.dispatch('util/fetchFacilitiesList');
      const orderIds = payload
      orderIds.forEach((orderId: any) => {
        orderFacilityChangeInformation[orderId] = {
          count: 0,
          LastBrokeredFacility: "-"
        } as any;
        resp.data.docs.forEach((order: any) => {
          if(order.orderId == orderId){
            orderFacilityChangeInformation[orderId].LastBrokeredFacility = this.getters['util/getFacilityName'](order.facilityId).facilityName;
            orderFacilityChangeInformation[orderId].count += 1;
          }
        })
      })
      return orderFacilityChangeInformation;
    } catch (err){
      console.log(err);
    }
  },

  async fetchOldExpeditedOrders({commit}){
    let resp;
    try {
      resp = await OrderService.fetchOldExpeditedOrders({
        "json": {
          "params": {
            "rows": "20",
            "sort": "orderDate asc"
          },
          "query":"(*:*)",
          "filter": ["docType:ORDER","orderTypeId: SALES_ORDER", "shipmentMethodTypeId: (NEXT_DAY OR SECOND_DAY)"]
        }
      });
      if (resp.status === 200 && !hasError(resp)) {
        const productIds = resp.data.response.docs.map((order: any) => {
          return order.productId;
        })
        const orderIds = resp.data.response.docs.map((order: any) => {
          return order.orderId;
        })
        const viewSize = productIds.length;
        const viewIndex = 0;
        const payload = {
          viewSize,
          viewIndex,
          productIds
        }
        await this.dispatch('stock/addProducts', payload);
        await this.dispatch("product/fetchProducts", payload);
        const orderFacilityChangeInformation = await this.dispatch('order/getOrderFacilityChangeInformation', orderIds);
        commit(types.ORDER_OLD_EXPEDITED_UPDATED, { orders: resp.data.response.docs, total: resp.data.response.numFound, orderFacilityChangeInformation })
      }
      
    } catch (err) {
      console.error(err);
    }
  }
}

export default actions