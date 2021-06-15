<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <router-link
        class="header__logo"
        href="#"
        :to="{ name: 'main' }"
      >
        <img
          src="img/svg/logo-moire.svg"
          alt="Логотип интернет магазина Moire"
          width="116"
          height="34"
        />
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <router-link
        class="header__cart"
        href="cart.html"
        aria-label="Корзина с товарами"
        :to="{ name: 'cart' }"
      >
        <svg width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{ numberProducts }}</span>
      </router-link>
    </div>
  </header>
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
