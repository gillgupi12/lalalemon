<script setup lang="ts">
import ProductCard from "components/organisms/product/card.vue";
const supabase = useSupabaseClient();

const allProducts = ref();
const loading = ref(false);

const fetchProducts = async () => {
  loading.value = true;
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("categories", "2");

  if (data) {
    allProducts.value = data;
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <div>
    <UProgress animation="carousel" v-if="loading" size="sm" color="red" />
    <UContainer>
      <div class="grid grid-cols-4 gap-4 py-20">
        <div v-for="(product, index) of allProducts" :key="index">
          <ProductCard :item="product" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
