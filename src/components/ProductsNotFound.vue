<template>
<div class="catalog__not-found not-found">
  <div class="not-found__img"></div>
  <p class="not-found__text">{{ message }}</p>
</div>
</template>

<script>
export default {
  name: 'ProductsNotFound',

  props: ['message'],
};
</script>
