export default interface OrderState {
  list: {
    orders: any[],
    total: number
  },
  availableOrderFilterOptions: any,
  currentOrderFiltersSelected: any,
  stuck: {
    orders: any[],
    total: number,
    orderFacilityChangeInformation: any
  },
  oldExpedited: {
    orders: any[],
    total: number,
    orderFacilityChangeInformation: any
  }
  current: any
}