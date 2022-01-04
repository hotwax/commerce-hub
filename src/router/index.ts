
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue'
import Order from '@/views/Order.vue'
import OrderFind from '@/views/OrderFind.vue'
import ProductInventory from '@/views/ProductInventory.vue'
import PurchaseOrderDetail from '@/views/PurchaseOrderDetail.vue'
import Login from '@/views/Login.vue'
import Settings from "@/views/Settings.vue"
import store from '@/store'

const authGuard = (to: any, from: any, next: any) => {
  if (store.getters['user/isAuthenticated']) {
      next()
  } else {
    next("/login")
  }
};

const loginGuard = (to: any, from: any, next: any) => {
  if (!store.getters['user/isAuthenticated']) {
      next()
  } else {
    next("/")
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/purchase-order-detail'
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    beforeEnter: authGuard
  },
  {
    path: '/orderfind',
    name: 'OrderFind',
    component: OrderFind,
    beforeEnter: authGuard
  },
  {
    path: '/product',
    name: 'ProductInventory',
    component: ProductInventory,
    beforeEnter: authGuard
  },
  {
    path: '/purchase-order-detail',
    name: 'PurchaseOrderDetail',
    component: PurchaseOrderDetail,
    beforeEnter: authGuard
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loginGuard
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router