<template>
  <li class="catalog__item">
    <router-link :to="{ name: 'product', params: { slug: product.slug } }" class="catalog__pic">
      <img :src="checkDataProductImage(product)" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { slug: product.slug } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color of product.colors" :key="color.color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :name="`colors-item-${product.slug}`"
            :value="color.color.id"
            v-model="selectedColor"
          />
          <span class="colors__value" :style="{ backgroundColor: color.color.code }"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['product'],

  data() {
    return {
      selectedColor: '',
    };
  },

  methods: {
    checkDataProductImage(product) {
      if (product?.colors[0]?.gallery) {
        return product.colors[0].gallery[0].file.url;
      }
      return '../img/no_image.png';
    },

    setDefaultColor() {
      if (!this.selectedColor && this.product.colors[0].color.id) {
        this.selectedColor = this.product.colors[0].color.id;
      }
    },
  },

  created() {
    this.setDefaultColor();
  },
};
</script>
