<template>
<div class="cart__block">
  <OrderList :products="products"/>

  <div class="cart__total">
    <p>Доставка: <b>{{ deliveryPrice }}</b></p>
    <p>Итого:
      <b>{{ numberProducts }}</b>
      {{ declination(numberProducts, ['товар', 'товара', 'товаров']) }} на сумму
      <b>{{ totalPrice }} ₽</b>
    </p>
  </div>

  <slot />
</div>
</template>

<script>
import OrderList from '@/components/OrderList.vue';
import declination from '@/mixins/declination.vue';

export default {
  mixins: [declination],

  props: ['products', 'numberProducts', 'totalPrice', 'deliveryPrice'],

  components: {
    OrderList,
  },
};
</script>
