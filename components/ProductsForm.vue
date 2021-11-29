<template>
  <form class="main-form" @submit.prevent="handleForm">
    <div class="main-form__input-wrap" :class="errors.title ? 'show-error' : ''">
      <label class="main-form__label" for="name">Наименование товара</label>
      <input
        id="name"
        v-model.trim="product.title"
        class="main-form__input"
        type="text"
        placeholder="Введите наименование товара"
        name="Name"
      />
      <strong class="main-form__error">{{ errors.title }}</strong>
    </div>

    <div class="main-form__input-wrap">
      <label class="main-form__label" for="">Описание товара</label>
      <textarea
        id="descripion"
        v-model.trim="product.description"
        class="main-form__input main-form__textarea"
        placeholder="Введите описание товара"
        name="Description"
      ></textarea>
    </div>

    <div class="main-form__input-wrap" :class="errors.img ? 'show-error' : ''">
      <label class="main-form__label" for="link"
        >Ссылка на изображение товара</label
      >
      <input
        id="link"
        v-model.trim="product.img"
        class="main-form__input"
        type="text"
        placeholder="Введите ссылку"
        name="Link"
      />
      <strong class="main-form__error">{{ errors.img }}</strong>
    </div>

    <div class="main-form__input-wrap" :class="errors.price ? 'show-error' : ''">
      <label class="main-form__label" for="price">Цена товара</label>
      <input
        id="price"
        v-model.trim="product.price"
        class="main-form__input"
        type="text"
        placeholder="Введите цену"
        name="Price"
      />
      <strong class="main-form__error">{{ errors.price }}</strong>
    </div>

    <button
      class="main-form__button"
      :disabled="!product.title || !product.img || !product.price"
      type="submit"
      >
      Добавить товар
      </button>
  </form>
</template>

<script>
export default {
  data() {
      return {
          product: {
            title: '',
            description: '',
            img: '',
            price: ''
          },

          errors: {
            title: '',
            img: '',
            price: ''
          }
      }
  },
  methods: {
      addProduct() {
          this.product.id = Date.now();
          this.$store.commit('addProduct', this.product)

          this.product = {
              title: '',
              description: '',
              img: '',
              price: ''
          }
      },
      checkForm() {
        const errors = {};

        if (this.product.title.length < 3)
          errors.title = 'Наименование товара не может содержать менее 3 символов'

        if (!this.product.img.match(/^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi))
          errors.img = 'Введите корректную ссылку на товар'

        if (!this.product.price.replace(/\D/g, '') || parseFloat(this.product.price) < 0)
          errors.price = 'Введите коррекную цену на товар'

        const handledPrice = this.product.price.replace(/\D/g, '');
        this.product.price = handledPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

        return Object.keys(errors).length === 0 ? false : errors;
      },
      handleForm() {
          const errors = this.checkForm();

          if (!errors) this.addProduct()

          this.errors = errors;

          setTimeout(() => {
            this.errors = {
              title: '',
              img: '',
              price: ''
            }
          },3000);
      }
  }
}
</script>

<style lang="scss" scoped>
.main-form {
  position: fixed;
  width: $form-width;
  display: flex;
  flex-flow: row wrap;
  padding: 24px;

  background: #fffefb;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);

  &__label {
    margin-bottom: 4px;
    position: relative;

    font-size: 10px;
    line-height: 13px;
    color: #49485e;

    &:not([for=''])::after {
      content: '';
      position: absolute;
      top: 0;
      right: -5px;
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #ff8484;
    }
  }

  &__input {
    padding: calc(#{$base-size} / 2) $base-size;
    border: 1px solid transparent;
    border-radius: 4px;
    width: 100%;

    font-size: 12px;
    line-height: 15px;

    color: #3f3f3f;
    outline: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

    transition: border-color 0.2s ease-in, box-shadow 0.2s ease-in;

    &:hover,
    &:focus {
      border-color: #333;
    }

    &::placeholder {
      font-size: 12px;
      color: #b4b4b4;
    }
  }

  &__error {
    position: absolute;
    width: 100%;
    bottom: -14px;
    left: 0;
    margin: 0;
    font-weight: normal;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.02em;

    color: #ff8484;
    transition: opacity 0.2s ease-in;
    opacity: 0;
  }

  &__input-wrap {
    position: relative;
    width: 100%;
    margin-bottom: $base-size;

    &:last-of-type {
      margin-bottom: 24px;
    }
  }

  &__input-wrap.show-error &__error {
    opacity: 1;
  }

  &__input-wrap.show-error &__input {
    border-color: #FF8484;
  }

  &__textarea {
    min-height: 108px;
    resize: none;
  }

  &__button {
    border-radius: 10px;
    width: 100%;
    padding: 11px $base-size;
    border: none;

    color: #fff;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    background-color: #7bae73;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    transition: background-color 0.2s ease-in, color 0.2s ease-in;

    &:disabled {
      background-color: #eeeeee;
      color: #b4b4b4;
      cursor: default;
    }
  }
}

@media (max-width: 768px) {
  .main-form {
    position: static;
    width: 100%;
  }
}
</style>
