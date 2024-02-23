<template>
  <div>
    <ul class="products">
      <ProductItem v-for="product in displayedProducts" :key="product._id" :product="product" />
    </ul>
    <div class="pagination">
      <button @click="previousPage" :disabled="page === 1">Previous</button>
      <span v-for="pageNumber in paginationNumbers" :key="pageNumber">
        <button @click="goToPage(pageNumber)" :class="{ active: page === pageNumber }">{{ pageNumber }}</button>
      </span>
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useProductsStore } from "../../store/store.js";
import { useRoute, useRouter } from "vue-router";

import ProductItem from "../productItem/ProductItem.vue";

const productsStore = useProductsStore();
const route = useRoute();
const router = useRouter();
const page = ref(parseInt(route.query.page) || 1);

watch(() => route.query.page, (newPage) => {
  page.value = parseInt(newPage) || 1;
});

watch(page, (newPage, oldPage) => {
  if (newPage !== oldPage && !isNaN(newPage)) {
    fetchProducts(newPage);
  }
});

const fetchProducts = async (pageNumber) => {
  await productsStore.fetchProducts(pageNumber);
  updateRoute(pageNumber);
};

const updateRoute = (pageNumber) => {
  router.replace({ query: { ...route.query, page: pageNumber } });
};

const displayedProducts = computed(() => {
  const startIndex = (page.value - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return productsStore.products.slice(startIndex, endIndex);
});

const productsPerPage = 2;
const totalPages = computed(() => Math.ceil(productsStore.products.length / productsPerPage));

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};

const previousPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const paginationNumbers = computed(() => {
  const numbers = [];
  for (let i = 1; i <= totalPages.value; i++) {
    numbers.push(i);
  }
  return numbers;
});

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    page.value = pageNumber;
  }
};
</script>

<style scoped>
@import "./Products.css"
</style>
