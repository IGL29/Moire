<template>
  <LoaderElement v-if="loading" />

  <ErrorNotify v-else-if="error"/>

  <ProductsNotFound v-else-if="!products.length" :message="messageNotFoundProducts" />

  <ul class="catalog__list" v-else>
    <ProductsItem v-for="product of products" :key="product.id" :product="product"/>
  </ul>
</template>

<script>
import ProductsItem from '@/components/ProductsItem.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import ProductsNotFound from '@/components/ProductsNotFound.vue';

export default {
  name: 'ProductsList',

  props: ['products', 'error', 'loading'],

  data() {
    return {
      messageNotFoundProducts: 'Товары с выбранными параметрами фильтра не найдены',
    };
  },

  components: {
    ProductsItem,
    LoaderElement,
    ErrorNotify,
    ProductsNotFound,
  },
};
</script>
