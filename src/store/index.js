import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessKey: null,
    basketData: [],
    productsData: [],
    productData: null,
    materialsData: [],
    seasonsData: [],
    categoriesData: [],
    colorsData: [],
    deliveries: [],
    payments: [],
    orderData: null,
    currentPage: 1,
    numberPrevProducts: 12,
    numberPages: null,
    numberProducts: null,
    successfulRequestNotify: false,
    errorRequestNotify: false,
    timerNotify: null,

    filters: {
      inputPriceFrom: null,
      inputPriceTo: null,
      inputSelectCategory: null,
      inputColors: [],
      inputMaterials: [],
      inputSeasons: [],
    },
  },

  getters: {
    products(state) {
      return state.productsData;
    },

    numberPrevProducts(state) {
      return state.numberPrevProducts;
    },

    numberProducts(state) {
      return state.numberProducts;
    },

    numberPages(state) {
      return state.numberPages;
    },

    currentPage(state) {
      return state.currentPage;
    },

    basketData(state) {
      return state.basketData;
    },

    numberProductsInCart(state) {
      return state.basketData.length;
    },

    filters(state) {
      return state.filters;
    },

    materials(state) {
      return state.materialsData;
    },

    seasons(state) {
      return state.seasonsData;
    },

    categories(state) {
      return state.categoriesData;
    },

    colors(state) {
      return state.colorsData;
    },

    totalPriceCart(state) {
      return state.basketData.reduce((sum, current) => (sum + current.price * current.quantity), 0);
    },

    productsInCart(state) {
      if (state.orderData?.basket?.items) {
        return state.orderData.basket.items;
      }
      return state.basketData;
    },

    deliveries(state) {
      return state.deliveries;
    },

    payments(state) {
      return state.payments;
    },

    orderData(state) {
      return state.orderData;
    },

    orderProducts(state) {
      return state.orderData.basket.items;
    },

    orderNumberProducts(state) {
      return state.orderData.basket.items.length;
    },

    orderTotalPrice(state) {
      return Number(state.orderData.totalPrice) + Number(state.orderData.deliveryType.price);
    },

    orderDeliveryPrice(state) {
      return state.orderData.deliveryType.price;
    },

    successfulRequestNotify(state) {
      return state.successfulRequestNotify;
    },

    errorRequestNotify(state) {
      return state.errorRequestNotify;
    },
  },

  mutations: {
    addPoductsData(state, response) {
      state.productsData = response;
    },

    updateNumberPages(state, response) {
      state.numberPages = response;
    },

    updateNumberPrevProducts(state, numbers) {
      state.numberPrevProducts = numbers;
    },

    updateNumberProducts(state, response) {
      state.numberProducts = response;
    },

    updateCurrentPage(state, page) {
      state.currentPage = page;
    },

    addMaterialsData(state, response) {
      state.materialsData = response;
    },

    addSeasonsData(state, response) {
      state.seasonsData = response;
    },

    addCategoriesData(state, response) {
      state.categoriesData = response;
    },

    addColors(state, response) {
      state.colorsData = response;
    },

    filterProducts(state, filters) {
      state.filters = filters;
    },

    resetFilter(state) {
      state.filters.inputPriceFrom = null;
      state.filters.inputPriceTo = null;
      state.filters.inputSelectCategory = null;
      state.filters.inputColors = [];
      state.filters.inputMaterials = [];
      state.filters.inputSeasons = [];
    },

    addProduct(state, response) {
      state.productData = response;
    },

    getProductsFromCart(state, response) {
      state.basketData = response.items;
    },

    saveAccessKey(state, response) {
      if (response) {
        localStorage.setItem('user', response.accessKey);
      }
      state.accessKey = localStorage.getItem('user');
    },

    saveDeliveries(state, response) {
      state.deliveries = response;
    },

    savePayments(state, response) {
      state.payments = response;
    },

    saveOrderData(state, response) {
      state.orderData = response;
    },

    resetCart(state) {
      state.basketData = [];
    },

    showNotifySuccess(state) {
      clearTimeout(state.timerNotify);
      state.successfulRequestNotify = true;
      state.timerNotify = setTimeout(() => { state.successfulRequestNotify = false; }, 2000);
    },
    showNotifyError(state) {
      clearTimeout(state.errorRequestNotify);
      state.errorRequestNotify = true;
      state.timerNotify = setTimeout(() => { state.errorRequestNotify = false; }, 2000);
    },
  },

  actions: {
    loadProductsData(context) {
      return axios
        .get(`${API_BASE_URL}/api/products`, {
          params: {
            page: context.state.currentPage,
            limit: context.state.numberPrevProducts,
            categoryId: context.state.filters.inputSelectCategory,
            materialIds: context.state.filters.inputMaterials,
            seasonIds: context.state.filters.inputSeasons,
            colorIds: context.state.filters.inputColors,
            minPrice: context.state.filters.inputPriceFrom,
            maxPrice: context.state.filters.inputPriceTo,
          },
        })
        .then((response) => {
          context.commit('updateNumberPages', response.data.pagination.pages);
          context.commit('updateNumberProducts', response.data.pagination.total);
          context.commit('addPoductsData', response.data.items);
        });
    },

    loadMaterialsData(context) {
      axios
        .get(`${API_BASE_URL}/api/materials`)
        .then((response) => {
          context.commit('addMaterialsData', response.data.items);
        });
    },

    loadSeasonsData(context) {
      axios
        .get(`${API_BASE_URL}/api/seasons`)
        .then((response) => {
          context.commit('addSeasonsData', response.data.items);
        });
    },

    loadCategoriesData(context) {
      axios
        .get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          context.commit('addCategoriesData', response.data.items);
        });
    },

    loadColorsData(context) {
      axios
        .get(`${API_BASE_URL}/api/colors`)
        .then((response) => {
          context.commit('addColors', response.data.items);
        });
    },

    loadProductData(context, { slug }) {
      return axios
        .get(`${API_BASE_URL}/api/products/${slug}`)
        .then((response) => {
          context.commit('addProduct', response.data);
          return response.data;
        });
    },

    loadBasketData(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.accessKey,
          },
        })
        .then((response) => {
          context.commit('getProductsFromCart', response.data);
        });
    },

    createUser(context) {
      axios
        .get(`${API_BASE_URL}/api/users/accessKey`)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          context.commit('saveAccessKey', response.data);
        });
    },

    addProductToCart(context, {
      productId, colorId, sizeId, quantity,
    }) {
      axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          colorId,
          sizeId,
          quantity,
        }, {
          params: {
            userAccessKey: context.state.accessKey,
          },
        })
        .then(() => { context.dispatch('loadBasketData'); });
    },

    changeQuantityProduct(context, { basketItemId, quantity }) {
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId,
          quantity,
        }, {
          params: {
            userAccessKey: context.state.accessKey,
          },
        })
        .then(() => { context.dispatch('loadBasketData'); });
    },

    deleteProduct(context, { basketItemId }) {
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data: {
            basketItemId,
          },
          params: {
            userAccessKey: context.state.accessKey,
          },
        })
        .then(() => { context.dispatch('loadBasketData'); });
    },

    loadDeliveries(context) {
      axios
        .get(`${API_BASE_URL}/api/deliveries`)
        .then((response) => {
          context.commit('saveDeliveries', response.data);
        });
    },

    loadPayments(context, deliveryTypeId) {
      axios
        .get(`${API_BASE_URL}/api/payments`, {
          params: {
            deliveryTypeId,
          },
        })
        .then((response) => context.commit('savePayments', response.data));
    },

    postOrder(context, {
      name, address, phone, email, deliveryTypeId, paymentTypeId, comment,
    }) {
      return axios
        .post(`${API_BASE_URL}/api/orders`, {
          name,
          address,
          phone,
          email,
          deliveryTypeId,
          paymentTypeId,
          comment,
        },
        {
          params: {
            userAccessKey: context.state.accessKey,
          },
        })
        .then((response) => {
          context.commit('saveOrderData', response.data);
          return response;
        });
    },

    loadOrderInfo(context, id) {
      axios
        .get(`${API_BASE_URL}/api/orders/${id}`, {
          params: {
            userAccessKey: context.state.accessKey,
          },
        })
        .then((response) => { context.commit('saveOrderData', response.data); });
    },
  },
});
