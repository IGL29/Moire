<template>
  <Loader v-if="loadingProduct" />

  <Error v-else-if="errorResponse" />

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
            :src="product.colors[0].gallery[0].file.url"
            srcset="img/product-square-1@2x.jpg 2x"
            alt="Название товара"
          />
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src="img/product-square-2.jpg"
                srcset="img/product-square-2@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/product-square-3.jpg"
                srcset="img/product-square-3@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
        </ul>
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

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item" v-for="tab of tabs" :key="tab.name">
            <a
              class="tabs__link"
              :class="{ 'tabs__link--current': currentTab === tab.name }"
              @click.prevent="currentTab = tab.name"
            >
              {{ tab.title }}
            </a>
          </li>
        </ul>

        <div class="item__content">
          <component :is="currentTabComponent"></component>
        </div>
      </div>

      <router-link to="cart" title="Перейти в корзину">
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
import NotifyMessage from '@/components/NotifyMessage.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ProductDescription from '@/components/ProductDescription.vue';
import ProductDeliveryInfo from '@/components/ProductDeliveryInfo.vue';
import CounterInput from '@/components/CounterInput.vue';
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';

export default {
  data() {
    return {
      tabs: [
        {
          name: 'description',
          title: 'Информация о товаре',
          component: ProductDescription,
        },
        {
          name: 'delivery',
          title: 'Доставка и возврат',
          component: ProductDeliveryInfo,
        },
      ],
      selectedColorId: '',
      selectedSizeId: '',
      currentTab: 'description',
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

    currentTabComponent() {
      return this.tabs.find((tab) => tab.name === this.currentTab).component;
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
    ProductDescription,
    ProductDeliveryInfo,
    CounterInput,
    Loader,
    Error,
    NotifyMessage,
  },

  watch: {
    product() {
      this.setDefaultColor();
      this.setDefaultSize();
    },
  },

  created() {
    this.loadProduct();
  },
};
</script>
