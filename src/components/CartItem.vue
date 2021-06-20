<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="checkImage(product)"
        width="120"
        height="120"
        srcset="img/product-square-4@2x.jpg 2x"
        alt="Название товара"
      />
    </div>
    <h3 class="product__title">
      {{ product.product.title }}
    </h3>
    <p class="product__info info product__info--color">
      Цвет:
      <span>
        <i class="info__color" :style="{ backgroundColor: product.color.color.code }"></i>
        {{ product.color.color.title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ product.product.id }} </span>

    <CounterInput :number.sync="quantityProducts"/>

    <b class="product__price"> {{ product.price }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct"
    >
      <svg width="20" height="20" v-if="loading">
        <use xlink:href="#icon-loading"></use>
      </svg>

      <svg width="20" height="20" fill="currentColor" v-else>
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import CounterInput from '@/components/CounterInput.vue';

export default {
  name: 'CartItem',

  props: ['product'],

  data() {
    return {
      quantityProducts: this.product.quantity,
      loading: false,
    };
  },

  methods: {
    changeQuantity() {
      this.$store.dispatch('changeQuantityProduct', {
        basketItemId: this.product.id,
        quantity: this.quantityProducts,
      });
    },

    deleteProduct() {
      this.loading = true;
      this.$store.dispatch('deleteProduct', {
        basketItemId: this.product.id,
      })
        .then(() => {
          this.$store.commit('showNotifySuccess');
        })
        .catch(() => {
          this.$store.commit('showNotifyError');
        })
        .finally(() => { this.loading = false; });
    },

    checkImage(product) {
      if (product.color?.gallery?.[0]?.file.url) {
        return product.color?.gallery?.[0]?.file.url;
      }
      return '../img/no_image.png';
    },
  },

  components: {
    CounterInput,
  },

  watch: {
    quantityProducts() {
      this.changeQuantity();
    },
  },
};

</script>
