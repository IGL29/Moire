<template>
  <main class="content container">
    <div class="content__top">
      <BreadCrumbs
        :routePages="[
          { name: 'main', title: 'Каталог' },
          { name: 'cart', title: 'Корзина' }
        ]"
        currentNamePageText="Оформление заказа"
      />

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <FormField
              formElement="input"
              label="ФИО"
              type="text"
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
              :errorText="formErrors.name"
            />

            <FormField
              formElement="input"
              label="Адрес доставки"
              type="text"
              placeholder="Введите ваш адрес"
              v-model="formData.address"
              :errorText="formErrors.address"
            />

            <FormField
              formElement="input"
              label="Телефон"
              type="tel"
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
              :errorText="formErrors.phone"
            />

            <FormField
              formElement="input"
              label="Email"
              type="email"
              placeholder="Введи ваш Email"
              v-model="formData.email"
              :errorText="formErrors.email"
            />

            <FormField
              formElement="textaria"
              label="Комментарий к заказу"
              placeholder="Ваши пожелания"
              v-model="formData.comment"
              :errorText="formErrors.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="delivery of deliveries" :key="delivery.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    :value="delivery.id"
                    v-model="deliveryTypeId"
                  />
                  <span class="options__value">
                    {{ delivery.title }}
                    <b> {{ formatPriceDelivery(delivery.price) }} </b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="payment of payments" :key="payment.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="payment.id"
                    v-model="paymentTypeId"
                  />
                  <span class="options__value">
                    {{ payment.title }}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <CartProductsInfo
          :products="products"
          :numberProducts="numberProducts"
          :totalPrice="totalPrice"
          :deliveryPrice="formatPriceDelivery(priceSelectedDelivery)"
        >
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </CartProductsInfo>

        <ErrorOrder v-if="errorMessage" :errorMessage="errorMessage"/>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import FormField from '@/components/FormField.vue';
import CartProductsInfo from '@/components/CartProductsInfo.vue';
import ErrorOrder from '@/components/ErrorOrder.vue';

export default {
  data() {
    return {
      formData: {},
      formErrors: {},
      deliveryTypeId: '',
      paymentTypeId: '',
      errorMessage: '',
    };
  },

  computed: {
    ...mapGetters({
      payments: 'payments',
      products: 'productsInCart',
      numberProducts: 'numberProductsInCart',
      totalPriceCart: 'totalPriceCart',
    }),

    deliveries() {
      return this.$store.getters.deliveries;
    },

    priceSelectedDelivery() {
      let price = null;
      if (this.deliveryTypeId) {
        price = this.deliveries.find((delivery) => (
          Number(delivery.id) === Number(this.deliveryTypeId)
        )).price;
      }
      return price;
    },

    totalPrice() {
      return Number(this.totalPriceCart) + Number(this.priceSelectedDelivery);
    },
  },

  methods: {
    loadDeliveries() {
      this.$store.dispatch('loadDeliveries');
    },

    formatPriceDelivery(price) {
      if (Number(price) === 0) {
        return 'бесплатно';
      }
      return `${price} ₽`;
    },

    setDefaultDelivery() {
      if (this.deliveries[0].id) {
        this.deliveryTypeId = this.deliveries[0].id;
      }
    },

    loadPayments() {
      this.$store.dispatch('loadPayments', this.deliveryTypeId);
    },

    setDefaultPayments() {
      if (this.payments[0].id) {
        this.paymentTypeId = this.payments[0].id;
      }
    },

    order() {
      this.formErrors = {};
      this.$store.dispatch('postOrder', {
        ...this.formData,
        deliveryTypeId: this.deliveryTypeId,
        paymentTypeId: this.paymentTypeId,
      })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$router.push({ name: 'order-info', params: { id: response.data.id } });
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data.error.message;
            this.formErrors = error.response.data.error.request || {};
          } else if (error.request) {
            this.errorMessage = 'Сервер не отвечает. Обновите страницу или попробуйте позднее.';
          } else {
            this.errorMessage = 'Произошла ошибка при запросе на сервер.';
          }
        });
    },
  },

  components: {
    BreadCrumbs,
    FormField,
    CartProductsInfo,
    ErrorOrder,
  },

  watch: {
    deliveries() {
      this.setDefaultDelivery();
    },

    deliveryTypeId() {
      this.loadPayments();
    },

    payments() {
      this.setDefaultPayments();
    },
  },

  created() {
    this.loadDeliveries();
  },
};
</script>
