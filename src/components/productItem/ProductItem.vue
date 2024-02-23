<template>
    <li>
      <h3>{{ product.name }}</h3>
      <a class="link" :href="`/product-details/${product._id}`">
        <img :src="product.img[0]" :alt="product.name">
      </a>
      <p>{{product.price}}₾</p>
    </li>

</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log("Product ID:", this.product._id);
  }

};


</script>

<style scoped>
@import "./ProductItem.css"
</style>