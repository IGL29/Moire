<template>
<div class="catalog__error error">
    <div class="error__img"></div>
    <p class="error__text">Произошла ошибка при запросе</p>
    <button
      class="button button--second error__button"
      @click.prevent="repeatRequest">Повторить</button>
  </div>
</template>

<script>
export default {

  methods: {
    repeatRequest() {
      this.$store.dispatch('loadProductsData');
    },
  },
};
</script>
