export default interface OrderState {
  list: {
    orders: any[],
    total: number
  },
  availableOrderFilterOptions: any,
  poIds: any,
  query: any,
  current: any
}