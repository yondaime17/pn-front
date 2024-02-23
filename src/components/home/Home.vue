<template>
  <div>
    <Products />
    <Pagination
      :totalProducts="totalProducts"
      :productsPerPage="productsPerPage"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Products from "../products/Products.vue";


export default {
  components: {
    Products,

  },
  setup() {
    const route = useRoute();
    const totalProducts = ref(100); 
    const productsPerPage = ref(10); 

    return {
      totalProducts,
      productsPerPage,
    };
  },
};
</script>
