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
  async findOrders ({ dispatch, commit, state }, params) {
    let resp;
    const query = prepareOrderQuery({ ...(state.query), poIds: state.poIds, ...params})
    try {
      resp = await OrderService.findOrder(query)
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

        const status = new Set();
        const orderItems = [] as any;
        const completedOrderIds = [] as any;
        let orderItemTrackingCodes = {} as any;

        orders.map((order: any) => {
          status.add(order.orderStatusId)
          order.doclist.docs.map((item: any) => {
            if (item.shipmentMethodTypeId !== 'STOREPICKUP' && item.orderItemStatusId === 'ITEM_COMPLETED' && !completedOrderIds.includes(item.orderId)) {
              completedOrderIds.push(item.orderId)
            }
            status.add(item.orderItemStatusId)
            orderItems.push(item)
          })
        })

        if (completedOrderIds.length) {
          orderItemTrackingCodes = await OrderService.getShipmentDetailForOrderItem(completedOrderIds)
        }

        this.dispatch('stock/fetchProductStockForFacility', orderItems)

        const statuses = await this.dispatch('util/fetchStatus', [...status])
        orders.map((order: any) => {
          order['orderStatusDesc'] = statuses[order.orderStatusId]
          order.doclist.docs.map((item: any) => {
            item['orderItemStatusDesc'] = statuses[item.orderItemStatusId]
            if (orderItemTrackingCodes[item.orderId] && item.shipmentMethodTypeId !== 'STOREPICKUP' && item.orderItemStatusId === 'ITEM_COMPLETED') {
              item['orderItemTrackingCode'] = orderItemTrackingCodes[item.orderId][item.orderItemSeqId]
            }
          })
        })

        if (query.json.params.start && query.json.params.start > 0) orders = state.list.orders.concat(orders)
        this.dispatch('product/getProductInformation', { orders });

        commit(types.ORDER_LIST_UPDATED, { orders, total });
      } else {
        showToast(translate("Something went wrong"));
      }
    } catch(error){
      console.error(error)
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
        // TODO Improve environment variable names
        const orderNameIdentificationKey = process.env.VUE_APP_ORD_IDENT_TYPE_NAME
        const orderIdIdentificationKey = process.env.VUE_APP_ORD_IDENT_TYPE_ID
        const orderNoIdentificationKey = process.env.VUE_APP_ORD_IDENT_TYPE_NO
        const customerLoyaltyOptions = process.env.VUE_APP_CUST_LOYALTY_OPTIONS

        const group = resp.data.grouped.orderId.groups.length > 0 && resp.data.grouped.orderId.groups[0]
        let itemGroups = [];
        const items = group.doclist.docs;

        const orderItemShipGrpInfoResp = await OrderService.fetchOrderItemShipGrpInformation({
          "inputFields": {
            orderId
          },
          "fieldList": ["shipGroupSeqId", "orderItemSeqId"],
          "entityName": "OrderItemShipGroupAssoc",
          "noConditionFind": "Y",
          "viewSize": 100
        });
        if (orderItemShipGrpInfoResp.status == 200 && !hasError(orderItemShipGrpInfoResp)) {
          const orderItemShipGrpList = orderItemShipGrpInfoResp.data.docs;
          const prepareGroups = (items: any, orderItemShipGrpList: any) => {
            const groups:any = [];
            items.map((item: any) => {
              const orderItemShipGrp = orderItemShipGrpList.find((orderItemShipGrp: any) => orderItemShipGrp.orderItemSeqId === item.orderItemSeqId);
              item.orderItemGroupId = orderItemShipGrp.shipGroupSeqId;
              let group = groups.find((group: any) => {
                return group.orderItemGroupId === item.orderItemGroupId;
              })
              if (!group) {
                group = {
                  orderItemGroupId: orderItemShipGrp.shipGroupSeqId,
                  facility: {
                    id: item.facilityId,
                    name: item.facilityName
                  },
                  shippingMethod: {
                    id: item.shipmentMethodTypeId
                  },
                  carrier: {
                    partyId: item.carrierPartyId
                  },
                  shippingAddress: {
                    toName: item.customerPartyName,
                    addressLine1: item.address1,
                    addressLine2: item.address2,
                    city: item.shipToCity,
                    postalCode: item.postalCode,
                    state: item.shipToState,
                    country: item.shipToCountry
                  }
                }
                groups.push(group);
              }
  
            })
            return groups;
          }
          itemGroups = prepareGroups(items, orderItemShipGrpList);
        }

        const orderItemShipGrpInvResInfoResp = await OrderService.fetchOrderItemShipGrpInvResInfo({
          "inputFields": {
            orderId
          },
          "fieldList": ["orderItemSeqId"],
          "entityName": "OrderItemShipGrpInvRes",
          "noConditionFind": "Y",
          "viewSize": 100
        });
        if (orderItemShipGrpInvResInfoResp.status == 200 && !hasError(orderItemShipGrpInvResInfoResp)) {
          const orderItemShipGrpInvResInfoList = orderItemShipGrpInvResInfoResp.data.docs;
          items.map((item: any) => {
            item.reserved = orderItemShipGrpInvResInfoList.some((orderItemShipGrpInvRes: any) => item.orderItemSeqId === orderItemShipGrpInvRes.orderItemSeqId);
          })
        }

        const orderBrokeringInfoResp = await OrderService.fetchOrderBrokeringInfo({
          "inputFields": {
            orderId,
            // TODO "changeReasonEnumId_op": "empty"
          },
          "entityName": "OrderFacilityChange",
          "noConditionFind": "Y",
          "viewSize": 20,
          "fieldList": ["orderItemSeqId"]
        });
        if (orderBrokeringInfoResp.status == 200 && !hasError(orderBrokeringInfoResp)) {
          const orderBrokeringInfoRespInfoList = orderBrokeringInfoResp.data.docs;
          items.map((item: any) => {
            item.brokeringAttempt = orderBrokeringInfoRespInfoList.filter((orderBrokeringInfo: any) => item.orderItemSeqId === orderBrokeringInfo.orderItemSeqId).length;
          })
        }

        const orderPreOrderFacilityId = process.env.VUE_APP_PRE_ORDER_IDNT_ID
        const orderBackOrderFacilityId = process.env.VUE_APP_BACKORDER_IDNT_ID
        // Find Preorder or Backorder items
        const correspondingPoIds = items
            .filter((item: any) => item.facilityId === orderPreOrderFacilityId || item.facilityId === orderBackOrderFacilityId)
            .map((item: any) => item.correspondingPoId)

        // Find PO Information if corresponding PO ids found
        if (correspondingPoIds.length) {
          const correspondingPoExternalIds = await OrderService.getPOInformationForPOIds({correspondingPoIds});
          items.map((item: any) => {
            const order = correspondingPoExternalIds[item.correspondingPoId];
            item.correspondingPoExternalId = order ? order.externalOrderId : undefined;
            item.estimatedArrivalDate = order ? order.estimatedDeliveryDate : undefined;
          })

        }

        const order: Order = {
          orderId: items[0].orderId,
          orderName: items[0].orderName,
          customer: {
            name: items[0].customerPartyName,
            emailId: items[0].customerEmailId,
            phoneNumber: items[0].customerPhoneNumber,
            toName: items[0].customerPartyName,
            city: items[0].shipToCity,
            state: items[0].shipToState,
            zipCode: items[0].postalCode,
            country: items[0].shipToCountry,
            addressLine1: items[0].address1,
            addressLine2: items[0].address2,
            loyaltyOptions: getCustomerLoyalty(items[0].orderNotes, customerLoyaltyOptions)
          },
          /** An array containing the items purchased in this order */
          items: items,
          statusId: items[0].orderStatusId,
          statusDesc: items[0].orderStatusDesc,
          identifications: {
            'orderName': getIdentification(items[0]?.orderIdentifications, orderNameIdentificationKey),
            'orderId': getIdentification(items[0]?.orderIdentifications, orderIdIdentificationKey),
            'orderNo': getIdentification(items[0]?.orderIdentifications, orderNoIdentificationKey),
          },
          notes: items[0].orderNotes,
          itemGroups
        }

        const statusIds = new Set();
        const orderItems = [] as any;

        order.items?.map((item: any) => {
          statusIds.add(item.orderItemStatusId)
          orderItems.push(item)
        })

        this.dispatch('stock/fetchProductStockForFacility', orderItems)
 
        // TODO Remove this code when the status description is directly available
        const statuses = await this.dispatch('util/fetchStatus', [...statusIds])
        order.items?.map((item: any) => item['orderItemStatusDesc'] = statuses[item.orderItemStatusId])

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

  async fetchStuckOrders({commit}){
    let resp;
    const payload = {
      "json": {
        "params": {
          "rows": "20",
          "sort": "orderDate ASC"
        },
        "query":"(*:*)",
        "filter": ["docType:ORDER","orderTypeId: SALES_ORDER","facilityId: _NA_","orderStatusId: ORDER_APPROVED" ]
      }
    }
    try {
      resp = await OrderService.findOrderDetails(payload);
      if (resp.status === 200 && !hasError(resp)) {
        const total = resp.data.response.numFound;
        let orders = resp.data.response.docs;

        if (orders.length) {
          let productIds = orders.map((order: any) => {
            return order.productId;
          })
          productIds = [...new Set(productIds)]
          const viewSize = productIds.length;
          const viewIndex = 0;
          const payload = {
            viewSize,
            viewIndex,
            productIds
          }
          const orderBrokering = await OrderService.getOrderBrokeringInfo(orders);
          this.dispatch('stock/addProducts', payload);
          const products = await this.dispatch("product/fetchProducts", payload);
          orders = orders.map( (order: any) => {
            order = {...order, brokering: { ...(orderBrokering[order.orderId] ? orderBrokering[order.orderId][order.orderItemSeqId] : {}) }}
            order.item = products[order.productId]
            return order
          })
        }
        commit(types.ORDER_STUCK_UPDATED, { orders, total })
      }
    } catch(err) {
      console.error(err);
    }
  },

  async fetchOldExpeditedOrders({commit}){
    let resp;
    try {
      // TODO Verify conditions
      resp = await OrderService.fetchOldExpeditedOrders({
        "json": {
          "params": {
            "rows": "20",
            "sort": "orderDate DESC"
          },
          "query":"(*:*)",
          "filter": ["docType:ORDER","orderTypeId: SALES_ORDER","-shipmentMethodTypeId: STANDARD", "-shipmentMethodTypeId: STOREPICKUP","-orderStatusId: ORDER_CANCELLED","-orderStatusId: ORDER_REJECTED","-orderStatusId: ORDER_COMPLETED"]
        }
      });
      if (resp.status === 200 && !hasError(resp)) {
        let orders = resp.data.response.docs
        const total = resp.data.response.numFound
        if (orders.length) {
          let productIds = orders.map((order: any) => {
            return order.productId;
          })
          productIds = [...new Set(productIds)]
          const viewSize = productIds.length;
          const viewIndex = 0;
          const payload = {
            viewSize,
            viewIndex,
            productIds
          }
          const orderBrokering = await OrderService.getOrderBrokeringInfo(orders);
          if (productIds.length) {
            this.dispatch('stock/addProducts', payload);
            const products = await this.dispatch("product/fetchProducts", payload);
            orders = orders.map( (order: any) => {
              order = {...order, brokering: { ...(orderBrokering[order.orderId] ? orderBrokering[order.orderId][order.orderItemSeqId] : {}) }}
              order.item = products[order.productId]
              return order
            })
          }
        }
        commit(types.ORDER_OLD_EXPEDITED_UPDATED, { orders, total });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default actions