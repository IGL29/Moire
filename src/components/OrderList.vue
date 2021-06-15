<template>
<ul class="cart__orders">
  <OrderItem v-for="product of products" :key="product.id" :product="product"/>
</ul>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';

export default {
  props: ['products'],

  components: {
    OrderItem,
  },
};
</script>
