<template>
  <span class="form__error">{{ error }}</span>
</template>

<script>
export default {
  name: 'ErrorField',

  props: ['error'],
};
</script>
