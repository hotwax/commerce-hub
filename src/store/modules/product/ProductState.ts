export default interface ProductState {
  cached: any;
  products: {
    list: any;
    total: number;
    variants: number;
  },
  current: any
}