<template>
  <router-link
    class="header__cart"
    title="Перейти в корзину"
    aria-label="Корзина с товарами"
    :to="{ name: 'cart' }"
  >
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ numberProducts }}</span>
  </router-link>
</template>

<script>
export default {
  computed: {
    numberProducts() {
      return this.$store.getters.numberProductsInCart;
    },
  },
};
</script>
