import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessKey: '',
    basketData: [],
    productsData: [],
    productData: null,
    filteredProducts: [],
    materialsData: [],
    seasonsData: [],
    categoriesData: [],
    colorsData: [],
    deliveries: [],
    payments: [],
    orderData: null,
  },

  getters: {
    products(state) {
      return state.filteredProducts;
    },

    numberProductsInCart(state) {
      return state.basketData.length;
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
  },

  mutations: {
    addPoductsData(state, response) {
      state.productsData = response;
      state.filteredProducts = state.productsData;
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
      let filteredProducts = state.productsData;
      if (filters.inputPriceFrom) {
        filteredProducts = filteredProducts.filter((product) => (
          product.price >= filters.inputPriceFrom
        ));
      }
      if (filters.inputPriceTo) {
        filteredProducts = filteredProducts.filter((product) => (
          product.price <= filters.inputPriceTo
        ));
      }
      if (filters.inputSelectCategory) {
        filteredProducts = filteredProducts.filter((product) => (
          product.slug === filters.inputSelectCategory
        ));
      }
      if (filters.inputColors.length) {
        filteredProducts = filteredProducts.filter((product) => (
          product.colors.find((productColor) => (
            filters.inputColors.find((color) => (
              (color === productColor.color.id)
            ))
          ))
        ));
      }
      if (filters.inputMaterials.length) {
        filteredProducts = filteredProducts.filter((product) => (
          product.materials.find((materialItem) => (
            filters.inputMaterial.find((selectedMaterial) => (
              (selectedMaterial === materialItem.id)
            ))
          ))
        ));
      }
      if (filters.inputSeasons.length) {
        filteredProducts = filteredProducts.filter((product) => (
          product.seasons.find((seasonItem) => (
            filters.inputSeasons.find((selectedSeason) => (
              (selectedSeason === seasonItem.id)
            ))
          ))
        ));
      }
      state.filteredProducts = filteredProducts;
    },
    resetFilter(state) {
      state.filteredProducts = state.productsData;
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
  },

  actions: {
    loadProductsData(context) {
      return axios
        .get(`${API_BASE_URL}/api/products`)
        .then((response) => {
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
        .then((response) => (
          context.commit('addProduct', response.data)
        ));
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
