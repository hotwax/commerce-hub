import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import ProductState from './ProductState'
import RootState from '../../RootState'

const productModule: Module<ProductState, RootState> = {
    namespaced: true,
    state: {
      cached: {},
      products: {
        list: [],
        total: 0
      },
      current: {},
      currentProductFilterSelected: {
        category: 'All',
        color: 'All',
        size: 'All',
        tags: [],
        preOrder: false,
        backOrder: false,
        queryString: ''
      }
    },
    getters,
    actions,
    mutations,
}

export default productModule;