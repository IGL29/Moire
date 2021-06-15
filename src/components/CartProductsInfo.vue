<template>
<div class="cart__block">
  <OrderList :products="products"/>

  <div class="cart__total">
    <p>Доставка: <b>{{ deliveryPrice }}</b></p>
    <p>Итого: <b>{{ numberProducts }}</b> товара на сумму <b>{{ totalPrice }} ₽</b></p>
  </div>

  <slot />
</div>
</template>

<script>
import OrderList from '@/components/OrderList.vue';

export default {
  props: ['products', 'numberProducts', 'totalPrice', 'deliveryPrice'],

  components: {
    OrderList,
  },
};
</script>
