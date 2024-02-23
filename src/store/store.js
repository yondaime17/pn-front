// store.js
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    cart: [], 
  }),
  actions: {
    async initializeProducts() {
      if (this.products.length === 0) {
        await this.fetchProducts();
      }
    },
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    getProductById(productId) {
      return this.products.find(product => product._id === productId);
    },
    
    addToCart(productId) {
      const product = this.getProductById(productId);
      if (product) {
        const cartItem = this.cart.find(item => item.productId === productId);
        if (cartItem) {
          cartItem.quantity++; 
        } else {
          this.cart.push({ productId, quantity: 1 });
        }
      }
    },
   
    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item.productId === productId);
      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--; 
        } else {
          this.cart.splice(index, 1); 
        }
      }
    },
    calculateTotalPrice() {
      return this.cart.reduce((total, item) => {
        const product = this.getProductById(item.productId);
        if (product) {
          return total + product.price * item.quantity;
        }
        return total;
      }, 0);
    },
    clearCart() {
      this.cart = [];
    },
  },
  persist: true,
});

