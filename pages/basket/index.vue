<script setup lang="ts">
import ProductCheckoutCard from "components/organisms/product/checkout-card.vue";

import ProductCard from "components/organisms/product/card.vue";
const array = ref<any>([
  {
    name: "Steady State Half zip",
    price: 1180,
    image: "/images/men/products/1.webp",
    imageAlt: "Steady State Half zip",
  },
  {
    name: "Sueded Cargo Pant",
    price: 1280,
    image: "/images/men/products/2.webp",
    imageAlt: "Sueded Cargo Pant",
  },
  {
    name: "Sueded Utility Jacket",
    price: 1780,
    image: "/images/men/products/3.webp",
    imageAlt: "Sueded  Utility Jacket",
  },
  {
    name: "Alpaca Wool-Blend Crewneck Sweater",
    price: 1780,
    image: "/images/men/products/4.webp",
    imageAlt: "Alpaca Wool-Blend Crewneck Sweater",
  },
  {
    name: "Sueded Utility Jacket",
    price: 1780,
    image: "/images/men/products/3.webp",
    imageAlt: "Sueded  Utility Jacket",
  },
  {
    name: "Steady State Half zip",
    price: 1180,
    image: "/images/men/products/1.webp",
    imageAlt: "Steady State Half zip",
  },

  {
    name: "Alpaca Wool-Blend Crewneck Sweater",
    price: 1780,
    image: "/images/men/products/4.webp",
    imageAlt: "Alpaca Wool-Blend Crewneck Sweater",
  },

  {
    name: "Sueded Cargo Pant",
    price: 1280,
    image: "/images/men/products/2.webp",
    imageAlt: "Sueded Cargo Pant",
  },
]);

const basketData = ref();
const router = useRouter();
const loading = ref(false);
const supabase = useSupabaseClient();
const getData = async () => {
  const response = await supabase
    .rpc("get_basket_with_product_details")
    .select();

  if (response.data) {
    basketData.value = response.data;
  }
};

const loadBasketData = async () => {
  loading.value = true;
  await getData();
  loading.value = false;
};

const allProducts = ref();
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
const totalAmount = computed(() => {
  return basketData.value
    .map((row: any) => {
      const data = row.item_data?.price * row?.item_data?.quantity;
      return data;
    })
    .reduce((a: any, b: any) => a + b, 0);
});
onMounted(async () => {
  await loadBasketData();
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
  <div>
    <div v-if="loading" class="flex items-center justify-center py-40">
      <div class="font-bold text-4xl">Loading Basket...</div>
    </div>
    <div v-else>
      <UContainer
        v-if="basketData?.length > 0"
        class="flex flex-col gap-4 py-10"
      >
        <div class="flex flex-row justify-between">
          <p class="md:text-3xl font-bold">My Bag({{ basketData?.length }})</p>
          <p class="md:text-xl font-bold">Need Help? +852 8009 06220</p>
        </div>
        <UDivider />
        <div class="md:grid grid-cols-3 gap-4">
          <div class="col-span-2 w-full pb-2 md:pb-0">
            <div v-for="item in basketData">
              <ProductCheckoutCard
                :item="item.item_data"
                @refetch-basket="loadBasketData()"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-row justify-between">
              <p>Subtotal</p>
              <div>HK${{ totalAmount }}</div>
            </div>
            <UDivider />
            <div class="flex flex-row justify-between">
              <p>Shipping cost</p>
              <div>FREE</div>
            </div>
            <UDivider />
            <div class="flex flex-row justify-between font-bold">
              <div>Estimated Total</div>
              <div>HK${{ totalAmount }}</div>
            </div>
            <UButton
              color="red"
              class="py-4 rounded-none text-center flex items-center justify-center"
              label="CHECKOUT"
            />
          </div>
        </div>
      </UContainer>
      <UContainer
        v-else
        class="max-w-4xl p-10 items-center flex flex-col gap-4 py-40"
      >
        <Icon name="ph:shopping-cart" size="80" />
        <p class="text-3xl font-bold">Your bag is empty</p>
        <p>Not sure where to start? Here are some of our favorites.</p>
        <div class="flex flex-row gap-3">
          <UButton
            color="black"
            label="SHOP WOMEN'S"
            class="rounded py-4 px-8"
            @click="() => router.push('/women')"
          />
          <UButton
            color="black"
            label="SHOP MEN'S"
            class="rounded py-4 px-8"
            @click="() => router.push('/men')"
          />
        </div>
      </UContainer>
      <UContainer class="flex flex-col gap-8 py-4">
        <div>
          <p class="text-4xl text-center font-bold">You May Also Like</p>
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
      </UContainer>
    </div>
  </div>
</template>
