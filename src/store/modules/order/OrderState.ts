export default interface OrderState {
  list: {
    orders: any[],
    total: number
  },
  availableOrderFilterOptions: any,
  query: any,
  current: any
}