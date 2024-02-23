<template>
  <div class="product-details">
    <div class="gallery">
      <div v-for="image in product.img" :key="image">
        <img :src="image" :alt="product.name">
      </div>
    </div>
    <div class="description">
      <h2>{{ product.name }}</h2>
      <p>Price: {{ product.price }} ₾</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useProductsStore } from "../../store/store.js";

const route = useRoute();
const productsStore = useProductsStore();

const productId = route.params.id;

const product = productsStore.getProductById(productId);

const addToCart = () => {
  productsStore.addToCart(productId);
};
</script>

<style scoped>
@import "./ProductDetails.css"
</style>
