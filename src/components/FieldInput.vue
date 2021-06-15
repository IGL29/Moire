<template>
  <input class="form__input" :type="type" :placeholder="placeholder" v-model="dataInput"/>
</template>

<script>
export default {
  props: ['placeholder', 'type', 'value'],

  computed: {
    dataInput: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
