<template>
  <Loader v-if="loading" />

  <Error v-else-if="error" @repeat-request="this.$emit('repeat-request');"/>

  <ProductsNotFound v-else-if="!products.length" :message="messageNotFoundProducts" />

  <ul class="catalog__list" v-else>
    <ProductsItem v-for="product of products" :key="product.id" :product="product"/>
  </ul>
</template>

<script>
import ProductsItem from '@/components/ProductsItem.vue';
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';
import ProductsNotFound from '@/components/ProductsNotFound.vue';

export default {
  props: ['products', 'error', 'loading'],

  data() {
    return {
      messageNotFoundProducts: 'Товары с выбранными параметрами фильтра не найдены',
    };
  },

  components: {
    ProductsItem,
    Loader,
    Error,
    ProductsNotFound,
  },
};
</script>
