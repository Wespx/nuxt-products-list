<template>
  <div v-if="!isLoading" class="container" :class="{ loading: isLoading }">
    <div class="form-bar">
      <h1 class="main-title">Добавление товара</h1>
      <products-form></products-form>
    </div>

    <div class="products">
      <select
        class="products__sort"
        :modelValue="selectedSort"
        @change="setSelectedSort($event.target.value)"
      >
        <option
          v-for="option in sortOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
      <products-list></products-list>
    </div>
  </div>
  <div v-else class="preloader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import ProductsList from '@/components/ProductsList'
import ProductsForm from '@/components/ProductsForm'
export default {
  components: {
    ProductsForm,
    ProductsList,
  },
  computed: {
    ...mapGetters(['getSortedProducts']),
    ...mapState(['products', 'sortOptions', 'selectedSort', 'isLoading']),
  },
  watch: {
    products(newValue) {
      localStorage.setItem('products', JSON.stringify(newValue))
    },
  },
  mounted() {
    this.getLocalProducts();
    this.setLoading(false);
  },
  methods: {
    ...mapActions(['getLocalProducts']),
    ...mapMutations(['setSelectedSort', 'setLoading']),
  },
}
</script>

<style lang="scss">
@import url(https://necolas.github.io/normalize.css/8.0.1/normalize.css);

body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  background-color: rgba(255, 254, 251, 0.8);

  font-family: 'Source Sans Pro', sans-serif;
  font-size: $base-size;
  font-weight: 400;
  line-height: 20px;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

.container {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: calc(#{$base-size} * 2);
  transition: opacity 0.2s ease-in;
}

.loading {
  opacity: 0;
}

.form-bar {
  width: $form-width;
  height: 100%;
}

.main-title {
  width: 100%;
  min-width: $form-width;
  margin-top: 0;
  margin-bottom: $base-size;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;

  color: #3f3f3f;
}

.products-bar {
  flex-grow: 2;
}

.products {
  width: 100%;
  max-width: 1028px;

  &__sort {
    display: block;
    margin-left: auto;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: $base-size;

    background: #fffefb;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 12px;
    line-height: 15px;
    color: #b4b4b4;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .form-bar {
    width: 100%;
    margin-bottom: $base-size;
  }
}

.preloader {
  color: #3f3f3f;
  display: block;
  margin: 50vh auto;
  position: relative;
  width: 80px;
  height: 80px;
}
.preloader div {
  transform-origin: 40px 40px;
  animation: preloader 1.2s linear infinite;
}
.preloader div:after {
  content: ' ';
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #3f3f3f;
}
.preloader div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.preloader div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.preloader div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.preloader div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.preloader div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.preloader div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.preloader div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.preloader div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.preloader div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.preloader div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.preloader div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.preloader div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes preloader {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
