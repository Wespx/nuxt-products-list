<template>
  <transition-group  v-if="products.length > 0" tag="ul" name="list-transition" class="products__list">
    <li v-for="product in getSortedProducts" :key="product.id" class="products__item products-list-item">
      <button class="products__delete" title="Удалить товар" @click="$store.commit('removeProduct', product.id)">
        <img src="~assets/delete.svg" />
      </button>
      <img :src="product.img" alt="Image" class="products__img" />
      <div class="products__description-wrap">
        <h2 class="products__title">{{ product.title }}</h2>
        <p class="products__text">{{ product.description }}</p>
        <p class="products__price">{{ product.price }} руб.</p>
      </div>
    </li>
  </transition-group>
  <h2 v-else class="products__title">Список товаров пуст</h2>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
      products() {
          return this.$store.state.products
      },
      ...mapGetters(['getSortedProducts'])
  },
}
</script>

<style lang="scss" scoped>
.products {
  &__list {
    display: grid;
    gap: $base-size;
    grid-template-columns: repeat(auto-fit, minmax(332px, max-content));
    grid-auto-rows: minmax(423px, 1fr);
    grid-auto-flow: dense;
    justify-content: center;
    padding: 0;
    margin: 0;

    list-style-type: none;
  }

  &__item {
    position: relative;

    background-color: #fffefb;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;

    &:hover .products__delete {
      opacity: 1;
    }
  }

  &__img {
    width: 100%;
    max-width: 332px;
    height: 200px;
    object-fit: cover;
    text-align: center;
  }

  &__description-wrap {
    padding: $base-size;
    max-width: 332px;
  }

  &__title {
    margin-top: 0;
    margin-bottom: $base-size;

    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;

    color: #3f3f3f;
  }

  &__text {
    margin-top: 0;
    margin-bottom: calc(#{$base-size} * 2);

    font-size: $base-size;
    line-height: 20px;

    color: #3f3f3f;
  }

  &__price {
    margin: 0;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;

    color: #3f3f3f;
  }

  &__delete {
    position: absolute;
    right: -9px;
    top: -9px;
    padding: 8px;
    height: 32px;
    width: 32px;
    border: none;
    border-radius: 10px;

    background-color: #ff8484;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    opacity: 0;
    transition: background-color 0.2s ease-in, opacity 0.2s ease-in;

    &:hover,
    &:focus {
      background-color: rgb(185, 3, 3);
    }
  }
}

.list-transition-leave-active {
  transition: all 0.3s ease-in;
}
.list-transition-leave-to {
    opacity: 0;
    transform: translateY(-130px);
}
.list-transition-move {
    transition: transform 0.3s ease-in;
}
</style>
