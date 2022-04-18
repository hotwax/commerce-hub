const prepareOrderQuery = (query: any) => {
  const typeFilterSelected = [];
  const viewSize = query.viewSize ? query.viewSize : process.env.VUE_APP_VIEW_SIZE;
  const viewIndex = query.viewIndex ? query.viewIndex : 0;

  const payload = {
    "json": {
      "params": {
        "sort": `${query.sort}`,
        "rows": viewSize,
        "start": viewSize * viewIndex,
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
            "mincount": 1,
            "limit": -1,
            "sort": "index",
            "type": "terms"
        },
        "shipmentMethodTypeIdFacet": {
          "excludeTags": "shipmentMethodTypeIdFilter",
          "field": "shipmentMethodTypeId",
          "mincount": 1,
          "limit": -1,
          "sort": "index",
          "type": "terms"
        }
      }
    }
  }

  if (query.queryString) {
    payload.json.params.defType = 'edismax'
    payload.json.params.qf = 'orderId customerPartyName customerPartyId productId internalName'
    payload.json.query = `*${query.queryString}*`
  }

  // updating the filter value in json object as per the filters selected
  // TODO: optimize this code
  if (query.storePickup) {
    payload.json.filter = payload.json.filter.concat(' AND shipmentMethodTypeId: STOREPICKUP')
  }

  if (query.shipFromStore) {
    payload.json.filter = payload.json.filter.concat(' AND -shipmentMethodTypeId: STOREPICKUP AND facilityTypeId: RETAIL_STORE')
  }

  if (query.preOrder) {
    typeFilterSelected.push('PRE_ORDER_PARKING')
  }

  if (query.backOrder) {
    typeFilterSelected.push('BACKORDER_PARKING')
  }

  if (query.unfillable) {
    typeFilterSelected.push('_NA_')
  }

  const typeFilterValues = typeFilterSelected.join(" OR ")

  payload.json.filter = payload.json.filter.concat(` AND facilityId: (${typeFilterValues ? typeFilterValues : '*'})`)

  if (query.shipFromLocation) {
    payload.json.filter = payload.json.filter.concat(` AND facilityTypeId: ${query.shipFromLocation}`)
  }

  payload.json.filter = payload.json.filter.concat(` AND orderStatusId: ${query.status ? query.status : '*'}`)

  payload.json.filter = payload.json.filter.concat(` AND shipmentMethodTypeId: ${query.shippingMethod ? query.shippingMethod : '*' }`)

  // TODO: improve logic to pass the date in the solr-query payload
  if (query.orderCreated) {
    payload.json.filter = payload.json.filter.concat(` AND orderDate: [${query.orderCreated + 'T00:00:00Z'} TO ${query.orderCreated + 'T23:59:59Z'}]`)
  }

  if (query.promisedDate) {
    payload.json.filter = payload.json.filter.concat(` AND promisedDatetime: [${query.promisedDate + 'T00:00:00Z'} TO ${query.promisedDate + 'T23:59:59Z'}]`)
  }

  if (query.autoCancelDate) {
    payload.json.filter = payload.json.filter.concat(` AND autoCancelDate: [${query.autoCancelDate + 'T00:00:00Z'} TO ${query.autoCancelDate + 'T23:59:59Z'}]`)
  }

  const correspondingPoId = query.selectedPoIds.map((id: string) => query.poIds[id]).join(" OR ")
  if (query.selectedPoIds.length > 0) {
    payload.json.filter = payload.json.filter.concat(` AND correspondingPoId: (${correspondingPoId})`)
  }

  return payload
}

export { prepareOrderQuery }
