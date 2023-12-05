<script setup lang="ts">
definePageMeta({
  layout: false,
});

const supabase = useSupabaseClient();
const { getUserAddresses } = useAuthStore();
const { getColor } = useColorStore();
const { userData } = storeToRefs(useAuthStore());
const { userAddresses } = storeToRefs(useAuthStore());

const email = ref(userData.value?.email);
const basketData = ref();

const handleGetUserAddress = async () => {
  await getUserAddresses();
};

const getData = async () => {
  const response = await supabase
    .rpc("get_basket_with_product_details")
    .select();

  if (response.data) {
    basketData.value = response.data;
  }
};

const totalAmount = computed(() => {
  return basketData.value
    ?.map((row: any) => {
      const data = row.item_data?.price * row?.item_data?.quantity;
      return data;
    })
    .reduce((a: any, b: any) => a + b, 0);
});

onMounted(async () => {
  await handleGetUserAddress();
  await getData();
});
</script>

<template>
  <NuxtLayout name="checkout">
    <div class="bg-slate-50">
      <div class="container max-w-8xl mx-auto">
        <div class="md:grid grid-cols-2 py-4 gap-4">
          <div class="h-fit md:sticky top-14 p-4 md:p-0 md:order-2">
            <div class="flex flex-row justify-between border-y py-3">
              <p>{{ basketData?.length }} Item</p>
              <p class="font-bold">HK${{ totalAmount }}</p>
            </div>
            <div
              v-for="item in basketData"
              class="flex flex-row gap-2 py-3 border-b"
            >
              {{ item.product_id }}
              <NuxtImg
                :src="item.item_data.product.product_images[0]"
                width="150px"
              />
              <div class="flex flex-row justify-between w-full">
                <div>
                  <p class="font-bold">
                    {{ item.item_data.product.product_name }}
                  </p>
                  <p class="capitalize">
                    Color: {{ getColor(item.item_data.color_id)?.name }}
                  </p>
                  <p>Quantity: {{ item.item_data.quantity }}</p>
                </div>
                <p>HK${{ item.item_data.product.product_price }}</p>
              </div>
            </div>
            <div class="flex flex-col gap-2 border-b mb-4 py-2">
              <div class="flex flex-row justify-between">
                <p>Subtotal</p>
                <p>HK${{ totalAmount }}</p>
              </div>
              <div class="flex flex-row justify-between">
                <p>Shipping</p>
                <p>FREE</p>
              </div>
            </div>

            <div class="flex flex-row justify-between pb-4">
              <p class="font-bold">Total</p>
              <p class="font-bold">HK${{ totalAmount }}</p>
            </div>

            <small class="text-gray-500 font-light text-sm">
              Please Note: If you're shipping outside of Hong Kong you may be
              subject to charges such as customs duties & consumption taxes.
            </small>
          </div>
          <div class="flex flex-col gap-4">
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
