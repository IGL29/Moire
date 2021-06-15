<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="filterProducts">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="filters.inputPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="filters.inputPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model="filters.inputSelectCategory"
          >
            <option value="">Все категории</option>
            <option
              :value="category.slug"
              v-for="category of categories"
              :key="category.id"
            >{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>

        <ul class="colors colors--black">
          <li class="colors__item" v-for="color of colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="checkbox"
                name="color"
                :value="color.id"
                v-model="filters.inputColors"
              />
              <span class="colors__value" :style="{ backgroundColor: color.code }"> </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material of materials" :key="material.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material.id"
                v-model="filters.inputMaterials"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season of seasons" :key="season.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.id"
                v-model="filters.inputSeasons"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="resetFilter"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        inputPriceFrom: 0,
        inputPriceTo: 12345,
        inputSelectCategory: '',
        inputColors: [],
        inputMaterials: [],
        inputSeasons: [],
      },
    };
  },

  computed: {
    materials() {
      return this.$store.state.materialsData;
    },
    seasons() {
      return this.$store.state.seasonsData;
    },
    categories() {
      return this.$store.state.categoriesData;
    },
    colors() {
      return this.$store.state.colorsData;
    },
  },

  methods: {
    getMaterials() {
      this.$store.dispatch('loadMaterialsData');
    },
    getSeasons() {
      this.$store.dispatch('loadSeasonsData');
    },
    getCategories() {
      this.$store.dispatch('loadCategoriesData');
    },
    getColors() {
      this.$store.dispatch('loadColorsData');
    },
    filterProducts() {
      this.$store.commit('filterProducts', this.filters);
    },
    resetFilter() {
      this.filters.inputPriceFrom = 0;
      this.filters.inputPriceTo = 12345;
      this.filters.inputSelectCategory = '';
      this.filters.inputColors = [];
      this.filters.inputMaterials = [];
      this.filters.inputSeasons = [];

      this.$store.commit('resetFilter');
    },
  },

  mounted() {
    this.getMaterials();
    this.getSeasons();
    this.getCategories();
    this.getColors();
  },
};
</script>
