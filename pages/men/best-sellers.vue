<script setup lang="ts">
import ProductCard from "components/organisms/product/card.vue";
import ProductFilter from "components/organisms/gender/filter.vue";
const supabase = useSupabaseClient();

const allProducts = ref();
const loading = ref(false);

const fetchProducts = async () => {
  loading.value = true;
  const { data, error } = await supabase.from("products").select();

  if (data) {
    allProducts.value = data;
  }
  loading.value = false;
};

const fetchProductswithFilters = async (categoryIds: number) => {
  loading.value = true;
  const { data, error } = await supabase
    .from("products")
    .select()
    .in("category_id", [categoryIds]);

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

    <UContainer class="grid grid-cols-4 py-20 gap-4">
      <div class="col-span-1">
        <ProductFilter
          @filter="fetchProductswithFilters"
          @nofilter="fetchProducts()"
        />
      </div>
      <div class="grid grid-cols-3 gap-4 max-w-fit col-span-3">
        <div v-for="(product, index) of allProducts" :key="index">
          <ProductCard :item="product" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
