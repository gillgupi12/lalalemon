<script setup lang="ts">
import ProductCard from "components/organisms/product/card.vue";
import ProductCardSkeleton from "components/organisms/product/card-skeleton.vue";
import ProductFilter from "components/organisms/gender/filter.vue";
const supabase = useSupabaseClient();

const allProducts = ref(new Array(9));
const totalCount = ref();
const totalFilteredCount = ref();
const loading = ref(true);
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
  const { data, error, count } = await supabase
    .rpc("get_product_with_inventory")
    .eq("gender", "FEMALE")
    .in("category_id", [6]);

  if (data) {
    allProducts.value = data;
  }
  loading.value = false;
};
</script>

<template>
  <div>
    <UProgress animation="carousel" v-if="loading" size="sm" color="red" />
    <div class="container w-7xl mx-auto min-h-screen">
      <div>
        <div class="sm:grid grid-cols-4 pt-10 gap-4">
          <div class="col-span-1">
            <div>
              <ProductFilter @nofilter="getProductInfos" />
            </div>
          </div>
          <div class="col-span-3 flex flex-col gap-2">
            <div class="w-full flex place-content-end">
              <USkeleton v-if="loading" class="h-4 w-[250px]" />
              <div v-else>
                <p v-if="allProducts.length > 0" class="font-bold text-sm">
                  {{ allProducts.length }} products
                </p>
              </div>
            </div>

            <div class="w-full">
              <div
                class="flex flex-col sm:grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 justify-stretch"
              >
                <div
                  v-for="(product, index) of allProducts"
                  :key="index"
                  class="w-full"
                >
                  <ProductCardSkeleton v-if="loading" />
                  <ProductCard v-else-if="product" :item="product" />
                </div>
              </div>
              <div
                v-if="!loading && allProducts.length === 0"
                class="flex items-center justify-center w-full"
              >
                <div class="text-2xl font-bold">No Products found.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
