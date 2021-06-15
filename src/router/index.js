import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/product/:slug',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '/cart/',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/order/',
    name: 'order',
    component: OrderPage,
  },
  {
    path: '/order-info/:id',
    name: 'order-info',
    component: OrderInfoPage,
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
