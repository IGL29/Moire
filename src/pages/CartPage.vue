<template>
  <Loader v-if="loadingCart"/>

  <Error v-else-if="errorRequest"/>

  <main class="content container" v-else>
    <div class="content__top">

      <BreadCrumbs
        :routePages="[{ name: 'main', title: 'Каталог'}]"
        currentNamePageText="Корзина"
      />

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ numberProducts }} товара
        </span>
      </div>
    </div>

    <section class="cart">

      <form
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <ProductsNotFound v-if="!productsCart.length" :message="messageCartEmpty" />

          <ul class="cart__list">
            <CartItem v-for="product of productsCart" :key="product.id" :product="product"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">Итого: <span>{{ totalPrice }} ₽</span></p>

          <router-link tag="button" :to="{ name: 'order' }"
            class="cart__button button button--primery"
            type="submit"
            v-show="numberProducts"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ProductsNotFound from '@/components/ProductsNotFound.vue';
import Error from '@/components/Error.vue';
import Loader from '@/components/Loader.vue';
import CartItem from '@/components/CartItem.vue';

export default {
  data() {
    return {
      loadingCart: false,
      errorRequest: false,
      messageCartEmpty: 'Корзина пуста...',
    };
  },

  computed: {
    productsCart() {
      return this.$store.state.basketData;
    },

    totalPrice() {
      return this.$store.getters.totalPriceCart;
    },

    numberProducts() {
      return this.$store.getters.numberProductsInCart;
    },
  },

  methods: {
    getProducts() {
      this.loadingCart = true;
      this.errorRequest = false;
      this.$store.dispatch('loadBasketData')
        .then(() => {
          this.loadingCart = false;
        })
        .catch(() => {
          this.loadingCart = false;
          this.errorRequest = true;
        });
    },
  },

  components: {
    Loader,
    Error,
    CartItem,
    BreadCrumbs,
    ProductsNotFound,
  },

  created() {
    this.getProducts();
  },
};
</script>
