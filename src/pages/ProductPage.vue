<template>
  <LoaderElement v-if="loadingProduct" />

  <ErrorNotify v-else-if="errorResponse" />

  <main class="content container" v-else-if="product">
    <div class="content__top">
      <BreadCrumbs
      :routePages="[{ name: 'main', title: 'Каталог' }, { name: 'main', title: category }]"
      currentNamePageText="Корзина" />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="currentImage()"
            srcset="img/product-square-1@2x.jpg 2x"
            alt="Название товара"
          />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addProductToCart">
            <div class="item__row item__row--center">
              <CounterInput :number.sync="quantityProducts" />

              <b class="item__price"> {{ product.price }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color of product.colors" :key="color.id">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        :value="color.color.id"
                        v-model="selectedColorId"
                      />
                      <span class="colors__value" :style="{ backgroundColor: color.color.code }">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="size" v-model="selectedSizeId">
                    <option v-for="size of product.sizes" :key="size.id" :value="size.id">{{
                      size.title
                    }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <AboutProductTabs />

      <router-link :to="{ name: 'cart' }" title="Перейти в корзину">
        <NotifyMessage
          :showMessage="successfulRequestNotify"
          text="Товар добавлен в корзину"
        />
      </router-link>

      <NotifyMessage
        :showMessage="errorRequestNotify"
        text="Произошла ошибка при добавлении товара"
      />
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import AboutProductTabs from '@/components/AboutProductTabs.vue';
import changeImage from '@/mixins/changeImage.vue';
import NotifyMessage from '@/components/NotifyMessage.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CounterInput from '@/components/CounterInput.vue';
import LoaderElement from '@/components/LoaderElement.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';

export default {
  name: 'ProductPage',

  mixins: [changeImage],

  data() {
    return {
      selectedColorId: '',
      selectedSizeId: '',
      quantityProducts: 1,
      loadingProduct: false,
      errorResponse: false,
    };
  },

  computed: {
    ...mapGetters([
      'successfulRequestNotify',
      'errorRequestNotify',
    ]),

    product() {
      return this.$store.state.productData;
    },

    category() {
      if (this.product?.category?.title) {
        return this.product.category.title;
      }
      return 'Категория';
    },

    title() {
      if (this.product?.title) {
        return this.product.title;
      }
      return 'Название товара';
    },
  },

  methods: {
    loadProduct() {
      this.loadingProduct = true;
      this.errorResponse = false;
      const { slug } = this.$route.params;
      this.$store
        .dispatch('loadProductData', { slug })
        .then(() => {
          this.loadingProduct = false;
          this.errorResponse = false;
        })
        .catch(() => {
          this.loadingProduct = false;
          this.errorResponse = true;
        });
    },

    addProductToCart() {
      this.$store.dispatch('addProductToCart', {
        productId: this.product.id,
        colorId: this.selectedColorId,
        sizeId: this.selectedSizeId,
        quantity: this.quantityProducts,
      })
        .then(() => {
          this.$store.commit('showNotifySuccess');
        })
        .catch(() => {
          this.$store.commit('showNotifyError');
        });
    },

    setDefaultColor() {
      const defaultColor = this.product.colors[0].color.id;
      if (defaultColor) {
        this.selectedColorId = defaultColor;
      }
    },

    setDefaultSize() {
      const defaultSize = this.product.sizes[0].id;
      if (defaultSize) {
        this.selectedSizeId = defaultSize;
      }
    },
  },

  components: {
    BreadCrumbs,
    CounterInput,
    LoaderElement,
    ErrorNotify,
    NotifyMessage,
    AboutProductTabs,
  },

  watch: {
    product() {
      this.setDefaultColor();
      this.setDefaultSize();
    },
  },

  created() {
    this.$store.commit('clearTimerNotify');
    this.loadProduct();
  },
};
</script>
