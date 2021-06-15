<template>
  <main class="content container" v-if="orderInfo">
    <div class="content__top">
      <BreadCrumbs :routePages="[
        {name: 'main', title: 'Каталог'},
        {name: 'cart', title: 'Корзина'}]"
        currentNamePageText="Оформление заказа"
      />

      <h1 class="content__title">Заказ оформлен <span>№ {{ orderInfo.id }}</span></h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ orderInfo.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ orderInfo.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> {{ orderInfo.paymentType }} </span>
            </li>
          </ul>
        </div>

        <CartProductsInfo
          :products="products"
          :numberProducts="numberProducts"
          :totalPrice="totalPrice"
          :deliveryPrice="formatPriceDelivery(deliveryPrice)"
        />
      </form>
    </section>
  </main>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CartProductsInfo from '@/components/CartProductsInfo.vue';

export default {
  computed: {
    orderInfo() {
      return this.$store.getters.orderData;
    },

    products() {
      return this.$store.getters.orderProducts;
    },

    numberProducts() {
      return this.$store.getters.orderNumberProducts;
    },

    totalPrice() {
      return this.$store.getters.orderTotalPrice;
    },

    deliveryPrice() {
      return this.$store.getters.orderDeliveryPrice;
    },
  },

  methods: {
    formatPriceDelivery(price) {
      if (Number(price) === 0) {
        return 'бесплатно';
      }
      return `${price} ₽`;
    },

    loadOrderInfo() {
      const orderid = this.$route.params.id;
      this.$store.dispatch('loadOrderInfo', orderid);
    },
  },

  components: {
    BreadCrumbs,
    CartProductsInfo,
  },

  created() {
    this.loadOrderInfo();
  },
};
</script>
