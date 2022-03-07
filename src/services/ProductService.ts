import api from '@/api';

const fetchProducts = async (query: any): Promise <any>  => {
  return api({
   // TODO: We can replace this with any API
    url: "searchProducts", 
    method: "post",
    data: query,
    cache: true
  });
}

const getProductDetail = async (payload: any): Promise<any> => {
  return api({
    url: "/solr-query",
    method: "POST",
    data: payload
  })
}

export const ProductService = {
  fetchProducts,
  getProductDetail
}