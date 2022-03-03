export default interface OrderState {
  list: {
    orders: any[],
    total: number
  },
  availableOrderFilterOptions: any,
  currentOrderFiltersSelected: any
}