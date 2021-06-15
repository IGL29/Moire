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
    <li class="pagination__item" v-for="pageNumber of countPages" :key="pageNumber">
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': addClassActivePage(pageNumber) }"
        @click.prevent="goToPage(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>

    <!-- <li class="pagination__item">
      <a class="pagination__link" href="#">
        ...
      </a>
    </li> -->
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
export default {
  props: ['countPages', 'currentPage'],

  computed: {
    allowedGoToNextPage() {
      return this.countPages > this.currentPage;
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
      this.$emit('update:currentPage', page);
    },
    goToNextPage() {
      if (this.allowedGoToNextPage) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },
    goToPrevPage() {
      if (this.allowedGoToPrevPage) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
  },
};
</script>
