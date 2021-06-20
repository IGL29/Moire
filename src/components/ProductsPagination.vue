<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': !allowedGoToPrevPage}"
        aria-label="Предыдущая страница"
        @click.prevent="goToPrevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="page of numberPages" :key="page">
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': addClassActivePage(page) }"
        @click.prevent="goToPage(page)"
      >
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': !allowedGoToNextPage }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="goToNextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductsPagination',

  computed: {
    ...mapGetters([
      'numberPages',
      'currentPage',
    ]),

    allowedGoToNextPage() {
      return this.numberPages > this.currentPage;
    },

    allowedGoToPrevPage() {
      return this.currentPage > 1;
    },
  },

  methods: {
    addClassActivePage(page) {
      return page === this.currentPage;
    },

    goToPage(page) {
      this.$store.commit('updateCurrentPage', page);
      this.$store.dispatch('loadProductsData');
    },

    goToNextPage() {
      if (this.allowedGoToNextPage) {
        this.$store.commit('updateCurrentPage', this.currentPage + 1);
        this.$store.dispatch('loadProductsData');
      }
    },

    goToPrevPage() {
      if (this.allowedGoToPrevPage) {
        this.$store.commit('updateCurrentPage', this.currentPage - 1);
        this.$store.dispatch('loadProductsData');
      }
    },
  },
};
</script>
