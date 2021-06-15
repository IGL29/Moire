<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="product.color.gallery[0].file.url"
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
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import CounterInput from '@/components/CounterInput.vue';

export default {
  props: ['product'],

  data() {
    return {
      quantityProducts: this.product.quantity,
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
      this.$store.dispatch('deleteProduct', {
        basketItemId: this.product.id,
      });
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
