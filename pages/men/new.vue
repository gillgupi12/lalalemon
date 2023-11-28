<script setup lang="ts">
import ProductCard from "components/organisms/product/card.vue";
import ProductFilter from "components/organisms/gender/filter.vue";
const supabase = useSupabaseClient();

const allProducts = ref([]);
const totalCount = ref();
const totalFilteredCount = ref();
const loading = ref(false);
const page = ref(0);

const getFromAndTo = () => {
  let itemPerPage = 5;
  let from = page.value * itemPerPage;
  let to = from + itemPerPage;

  if (page.value > 0) {
    from += 1;
  }
  return { from, to };
};

const getProductInfos = async () => {
  loading.value = true;
  const { data, error, count } = await supabase.rpc(
    "get_product_with_inventory"
  );

  if (data) {
    allProducts.value = data;
  }
  loading.value = false;
};

const fetchProductswithFilters = async (categoryIds: number) => {
  loading.value = true;
  const { data, error } = await supabase
    .rpc("get_product_with_inventory")
    .in("category_id", [categoryIds]);

  if (data) {
    allProducts.value = data;
  }
  loading.value = false;
};
</script>

<template>
  <div class="container w-7xl mx-auto">
    <UProgress animation="carousel" v-if="loading" size="sm" color="red" />
    <div>
      <div class="sm:grid grid-cols-4 pt-10 gap-4">
        <div class="col-span-1">
          <ProductFilter
            @filter="fetchProductswithFilters"
            @nofilter="getProductInfos"
          />
        </div>
        <div class="col-span-3 flex flex-col gap-2 max-w-fit">
          <div class="w-full flex place-content-end">
            <p v-if="!totalFilteredCount" class="font-bold text-sm">
              {{ totalCount }} products
            </p>
          </div>
          <div
            class="flex flex-col sm:grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4"
          >
            <div
              v-for="(product, index) of allProducts"
              :key="index"
              class="col-span-1 border bg-white"
            >
              <ProductCard :item="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
