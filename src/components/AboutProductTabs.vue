<template>
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
</template>

<script>
import ProductDescription from '@/components/ProductDescription.vue';
import ProductDeliveryInfo from '@/components/ProductDeliveryInfo.vue';

export default {
  name: 'AboutProductsTabs',

  data() {
    return {
      currentTab: 'description',

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
    };
  },

  computed: {
    currentTabComponent() {
      return this.tabs.find((tab) => tab.name === this.currentTab).component;
    },
  },

  components: {
    ProductDescription,
    ProductDeliveryInfo,
  },
};
</script>
