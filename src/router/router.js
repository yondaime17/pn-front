// router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import Products from "../components/products/Products.vue";
import ProductDetails from "../components/productDetails/ProductDetails.vue";
import Cart from "../components/cart/Cart.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product-details/:id", 
    name: "ProductDetails",
    component: ProductDetails,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
