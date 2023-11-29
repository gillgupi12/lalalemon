<script setup lang="ts">
import HeroSideBar from "components/organisms/hero/sidebar.vue";
import HeroHeader from "components/organisms/hero/header.vue";

import ProductCard from "components/organisms/product/card.vue";

const menuItems = [
  {
    label: "Women's What's New",
    path: "women-new",
  },
  {
    label: "Men's What's New",
    path: "men-new",
  },
  {
    label: "Women's Casual",
    path: "women-pants",
  },
  {
    label: "Men's Casual",
    path: "men-hoodies",
  },
  {
    label: "Women's Pants",
    path: "women-pants",
  },
  {
    label: "Men's Pants",
    path: "men-pants",
  },
  {
    label: "Women's Hoodies",
    path: "women-hoodies",
  },
  {
    label: "Men's Hoodies",
    path: "men-hoodies",
  },
  // {
  //   label: "Accessories",
  //   path: "accessories",
  // },
];

const supabase = useSupabaseClient();

const allProducts = ref();
const loading = ref(false);

const fetchProducts = async () => {
  loading.value = true;
  const { data, error } = await supabase
    .rpc("get_product_with_inventory")
    .select()
    .range(0, 7);

  if (data) {
    allProducts.value = data;
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchProducts();
});
const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 3,
    snapAlign: "start",
    itemsToScroll: 3,
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
    itemsToScroll: 4,
  },
};
</script>

<template>
  <div class="container w-8xl mx-auto">
    <div>
      <div class="flex flex-row gap-2 items-start">
        <div class="p-8">
          <HeroSideBar header="lalalemon" :menu-items="menuItems" />
        </div>
        <HeroHeader
          image-path="/5.webp"
          image-alt-description=""
          upper-button-label="Shop women whats's new"
          upper-button-path="women-new"
          lower-button-label="Shop men whats's new"
          lower-button-path="men-new"
          footer-description="Bestselling icons with a proven track record."
        />
      </div>
      <div class="py-10">
        <carousel
          :wrapAround="true"
          snapAlign="start"
          :breakpoints="breakpoints"
        >
          <slide v-for="product in allProducts" :key="product">
            <ProductCard :item="product" />
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>
