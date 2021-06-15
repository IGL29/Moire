<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts }} товара
        </span>
      </div>
    </div>

    <div class="content__catalog">

      <FilterForm :filters="filters"/>

      <section class="catalog">
        <ProductsList
          :products="prevProducts"
          :error="errorRequest"
          :loading="loadingProducts"
          @repeat-request="getProducts"
        />

        <ProductsPagination :countPages="countPages" :currentPage.sync="currentPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import FilterForm from '@/components/FilterForm.vue';
import ProductsPagination from '@/components/ProductsPagination.vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  data() {
    return {
      numberPrevProducts: 12,
      currentPage: 1,
      errorRequest: false,
      loadingProducts: false,
      filters: {
        inputPriceFrom: 0,
        inputPriceTo: 12345,
        inputSelectCategory: '',
        inputColors: [],
        inputMaterials: [],
        inputSeasons: [],
      },
    };
  },

  computed: {
    products() {
      this.resetToFirstPage();
      return this.$store.getters.products;
    },
    countProducts() {
      return this.products.length;
    },
    countPages() {
      const pages = Math.ceil(this.countProducts / this.numberPrevProducts);
      return pages || 1;
    },
    prevProducts() {
      const offset = (this.currentPage - 1) * this.numberPrevProducts;
      return this.products.slice(offset, offset + this.numberPrevProducts);
    },
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
    resetToFirstPage() {
      this.currentPage = 1;
    },
  },

  components: {
    FilterForm,
    ProductsPagination,
    ProductsList,
  },

  created() {
    this.getProducts();
  },
};
</script>
