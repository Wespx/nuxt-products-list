export const state = () => ({
  products: [
    {
      title: 'Наименование товара',
      description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      img: 'https://i.imgur.com/q9FeyS6.jpg',
      price: '10 000',
      id: 1111111
    },
    {
      title: 'Наименование товара',
      description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      img: 'https://i.imgur.com/q9FeyS6.jpg',
      price: '88 434',
      id: 2222222
    },
    {
      title: 'Название товара',
      description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      img: 'https://i.imgur.com/q9FeyS6.jpg',
      price: '6 000',
      id: 3333333
    },
    {
      title: 'Имя товара',
      description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      img: 'https://i.imgur.com/q9FeyS6.jpg',
      price: '16 000',
      id: 4444444
    },
    {
      title: 'Товар',
      description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      img: 'https://i.imgur.com/q9FeyS6.jpg',
      price: '44 444',
      id: 5555555
    },
    {
      title: 'Очень дорогой товар',
      description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      img: 'https://i.imgur.com/q9FeyS6.jpg',
      price: '777 777',
      id: 6666666
    },
  ],
  sortOptions: [
    {value: 'default', name: 'По умолчанию'},
    {value: 'priceMax', name: 'По возрастанию цены'},
    {value: 'priceMin', name: 'По убыванию цены'},
    {value: 'title', name: 'По названию'},
  ],
  selectedSort: 'default',
  isLoading: true
})

export const mutations = {
  addProduct(state, product) {
    state.products.push(product)
  },
  removeProduct(state, productId) {
    state.products = state.products.filter((product) => product.id !== productId)
  },
  updateProducts(state, products) {
    state.products = products;
  },
  setSelectedSort(state, selectedSort) {
    state.selectedSort = selectedSort;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  }
}

export const actions = {
  getLocalProducts({commit}) {
    const localProducts = JSON.parse(localStorage.getItem('products'));

    if (localProducts) commit('updateProducts', localProducts)
  },
}

export const getters = {
  getSortedProducts(state) {
    if (state.selectedSort === 'default') return state.products;

    if (state.selectedSort === 'priceMax') return [...state.products].sort((a, b) => {
      return parseInt(a.price.replaceAll(' ', ''), 10) - parseInt(b.price.replaceAll(' ', ''), 10)
    });

    if (state.selectedSort === 'priceMin') return [...state.products].sort((a, b) => {
      return parseInt(b.price.replaceAll(' ', ''), 10) - parseInt(a.price.replaceAll(' ', ''), 10)
    });

    if (state.selectedSort === 'title') return [...state.products].sort((product1, product2) => {
        return product1[state.selectedSort]?.localeCompare(product2[state.selectedSort])
    })
  },
}
