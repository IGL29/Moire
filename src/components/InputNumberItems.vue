<template>
  <div class="content__form-container form-container">
  <form class="form-container__form">
      <span class="form-container__span">Количество товаров на странице:</span>
      <label class="form-container__label">
        <input
          class="form-container__input"
          type="radio"
          name="prevNumberProduct"
          :value="12"
          v-model="numberItems"
        >
        <span class="form-container__number">12</span>
      </label>

      <label class="form-container__label">
        <input
          class="form-container__input"
          type="radio"
          name="prevNumberProduct"
          :value="24"
          v-model="numberItems"
        >
        <span class="form-container__number">24</span>
      </label>

      <label class="form-container__label">
        <input
          class="form-container__input"
          type="radio"
          name="prevNumberProduct"
          :value="32"
          v-model="numberItems"
        >
        <span class="form-container__number">32</span>
      </label>
  </form>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['loading', 'error'],

  computed: {
    ...mapGetters([
      'numberPrevProducts',
    ]),

    numberItems: {
      get() {
        return this.numberPrevProducts;
      },
      set(value) {
        this.$emit('error', false);
        this.$emit('loading', true);
        this.$store.commit('updateNumberPrevProducts', value);
        this.$store.dispatch('loadProductsData')
          .catch(() => { this.$emit('error', true); })
          .finally(() => { this.$emit('loading', false); });
      },
    },
  },

};
</script>
