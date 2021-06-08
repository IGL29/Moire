import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productsData: {},
  },

  mutations: {
    addPoductsData(state, response) {
      state.productsData = response;
    },
  },

  actions: {
    loadProductsData(context) {
      axios
        .get(`${API_BASE_URL}/api/products`)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          context.commit('addPoductsData', response.data.items);
        });
    },
  },
});
