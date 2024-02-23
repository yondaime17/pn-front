<template>
  <div class="cart">
    <h2>Shopping Cart</h2>
    <div v-if="cart.length === 0">
      Your cart is empty.
    </div>
    <div v-else>
      <div v-for="item in cart" :key="item.productId" class="cart-item">
        <img :src="getProductById(item.productId).img[0]" :alt="getProductById(item.productId).name">
        
        <div>{{ getProductById(item.productId).name }}</div>
        <div>Quantity: 
          <button @click="decrementQuantity(item.productId)">-</button>
          {{ item.quantity }}
          <button @click="incrementQuantity(item.productId)">+</button>
        </div>
        <div>Price: {{ getProductById(item.productId).price }} ₾</div>
        <button @click="removeFromCart(item.productId)">Remove</button>
      </div>
      <br/>
      <br/>
      <div class="total">Total Price: {{ calculateTotalPrice() }} ₾</div>
    </div>
  </div>
</template>

<script>
import { useProductsStore } from "../../store/store.js";

export default {
  name: 'Cart',
  setup() {
    const productsStore = useProductsStore();
    const cart = productsStore.cart;
    const getProductById = productsStore.getProductById;
    const removeFromCart = productsStore.removeFromCart;
    const incrementQuantity = (productId) => {
      productsStore.addToCart(productId);
    };
    const decrementQuantity = (productId) => {
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem.quantity > 0) {
        removeFromCart(productId);
      }
    };
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cart.forEach(item => {
        totalPrice += getProductById(item.productId).price * item.quantity;
      });
      return totalPrice;
    };

    return { cart, getProductById, removeFromCart, incrementQuantity, decrementQuantity, calculateTotalPrice };
  }
};
</script>

<style scoped>
@import "./Cart.css";
</style>
