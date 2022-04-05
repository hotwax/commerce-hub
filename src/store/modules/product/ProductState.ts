export default interface ProductState {
  cached: any;
  products: {
    list: any;
    total: number;
  },
  filters:{
    current: any,
    list: any
  }
}