export default interface ProductState {
  cached: any;
  products: {
    list: any;
    total: number;
  }
  facilities: {
    list: any,
    total: number
  }
}