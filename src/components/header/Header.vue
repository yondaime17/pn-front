<template>
  <header class="header">
    <!-- Link to home page -->
    <router-link to="/" class="home-link">
      <h1>Online Shop</h1>
    </router-link>
    <div class="actions">
      <router-link to="/cart" class="cart-link">
        <button class="cart" @click="handleShoppingCartButtonClick">
          <img src="../../assets/shopping-cart_3225209.png" alt="Cart Icon" />
        </button>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    handleShoppingCartButtonClick() {
      console.log("Shopping cart button clicked");
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
@import "./Header.css";
</style>
