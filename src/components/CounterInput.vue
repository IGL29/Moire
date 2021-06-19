<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="decrement"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="number"
      name="count"
      @input="enteringNumber"
      @focusout="enteringNumFocusOut"
      v-model.number="quantity"
    />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="increment"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: ['number'],
  data() {
    return {
      quantity: this.number,
    };
  },

  methods: {
    decrement() {
      if (this.quantity > 1) {
        this.$emit('update:number', this.quantity -= 1);
      }
    },

    increment() {
      this.$emit('update:number', this.quantity += 1);
    },

    enteringNumber() {
      if (this.inputValue >= 1) {
        this.$emit('update:number', this.quantity);
      }
    },
    enteringNumFocusOut() {
      if (this.quantity < 1) {
        this.quantity = this.number;
      }
    },
  },
};
</script>
