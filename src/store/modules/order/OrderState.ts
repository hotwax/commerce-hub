export default interface OrderState {
  list: {
    orders: any[],
    total: number
  },
  poList: {
    orders: any[],
    count: {
      order: number,
      item: number
    }
  },
  poIds: any,
  query: any,
  current: any,
  validStatusChange: any,
  poQuery: any
}