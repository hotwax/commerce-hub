export default interface OrderState {
  list: {
    orders: any[],
    total: number,
    items: number
  },
  poIds: any,
  query: any,
  current: any,
  validStatusChange: any
}