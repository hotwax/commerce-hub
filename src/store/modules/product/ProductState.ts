export default interface ProductState {
  cached: any;
  products: {
    list: any;
    productCount: number;
    variantCount: number;
  },
  current: any
}