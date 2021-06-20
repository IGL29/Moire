<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ numberProducts }} {{ declination(numberProducts, ['товар', 'товара', 'товаров']) }}
        </span>

        <InputNumberItems :loading="loadingProducts" :error="errorRequest"/>
      </div>
    </div>

    <div class="content__catalog">

      <FilterForm />

      <section class="catalog">
        <ProductsList
          :products="products"
          :error="errorRequest"
          :loading="loadingProducts"
        />

        <ProductsPagination />

        <router-link :to="{ name: 'cart' }" title="Перейти в корзину">
          <NotifyMessage
            :showMessage="successfulRequestNotify"
            text="Товар добавлен в корзину"
          />
        </router-link>

        <NotifyMessage
          :showMessage="errorRequestNotify"
          text="Произошла ошибка при добавлении товара"
        />
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import declination from '@/mixins/declination.vue';
import NotifyMessage from '@/components/NotifyMessage.vue';
import InputNumberItems from '@/components/InputNumberItems.vue';
import FilterForm from '@/components/FilterForm.vue';
import ProductsPagination from '@/components/ProductsPagination.vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'MainPage',

  mixins: [declination],

  data() {
    return {
      errorRequest: false,
      loadingProducts: false,
    };
  },

  computed: {
    ...mapGetters([
      'products',
      'numberProducts',
      'successfulRequestNotify',
      'errorRequestNotify',
    ]),
  },

  methods: {
    getProducts() {
      this.loadingProducts = true;
      this.errorRequest = false;
      this.$store.dispatch('loadProductsData')
        .then(() => {
          this.loadingProducts = false;
        }).catch(() => {
          this.loadingProducts = false;
          this.errorRequest = true;
        });
    },
  },

  components: {
    InputNumberItems,
    FilterForm,
    ProductsPagination,
    ProductsList,
    NotifyMessage,
  },

  created() {
    this.$store.commit('clearTimerNotify');
    this.getProducts();
  },
};
</script>
