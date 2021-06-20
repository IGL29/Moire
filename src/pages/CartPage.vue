<template>
  <LoaderElement v-if="loadingCart"/>

  <ErrorNotify v-else-if="errorRequest"  class="wrapper__cart" />

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
          {{ numberProducts }} {{ declination(numberProducts, ['товар', 'товара', 'товаров']) }}
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
          <ProductsNotFound
            v-if="!productsCart.length"
            :message="messageCartEmpty"
            class="cart__not-found"
          />

          <ul class="cart__list">
            <CartItem
              v-for="product of productsCart"
              :key="product.id"
              :product="product"
            />
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

      <NotifyMessage
        :showMessage="successfulRequestNotify"
        text="Товар удален из корзины"
      />

      <NotifyMessage
        :showMessage="errorRequestNotify"
        text="Произошла ошибка при удалении товара"
      />
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import declination from '@/mixins/declination.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ProductsNotFound from '@/components/ProductsNotFound.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import CartItem from '@/components/CartItem.vue';
import NotifyMessage from '@/components/NotifyMessage.vue';

export default {
  name: 'CartPage',

  mixins: [declination],

  data() {
    return {
      loadingCart: false,
      errorRequest: false,
      messageCartEmpty: 'Корзина пуста...',
    };
  },

  computed: {
    ...mapGetters({
      productsCart: 'basketData',
      totalPrice: 'totalPriceCart',
      numberProducts: 'numberProductsInCart',
      successfulRequestNotify: 'successfulRequestNotify',
      errorRequestNotify: 'errorRequestNotify',
    }),
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
    LoaderElement,
    ErrorNotify,
    CartItem,
    BreadCrumbs,
    ProductsNotFound,
    NotifyMessage,
  },

  created() {
    this.$store.commit('clearTimerNotify');
    this.getProducts();
  },
};
</script>
