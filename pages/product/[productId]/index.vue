<script setup lang="ts">
import ProductCrumb from "components/organisms/product/crumbs.vue";

const route = useRoute();
const productId = route.params.productId.toString();
const supabase = useSupabaseClient();
const selectedProduct = ref();
const { getColor } = useColorStore();
const { addToBasket } = useBasketStore();

const getProduct = async () => {
  const { data, error } = await supabase
    .rpc("get_product_with_inventory")
    .eq("id", productId);

  if (data && data[0]) {
    selectedProduct.value = data[0];
  }
};

const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  await getProduct();

  selectedColorId.value = selectedProduct.value.inventory[0].color_id;
  loading.value = false;
});

const selectedColorId = ref();
const selectedSize = ref();

const onColorChange = (data: any) => {
  selectedColorId.value = data.color_id;
};

const onSizeSelect = (data: any) => {
  selectedSize.value = data;
};

const errorMsg = ref();
const addToBasketFn = () => {
  if (selectedSize.value && selectedColorId.value && selectedProduct.value) {
    addToBasket(
      productId,
      selectedSize.value,
      selectedColorId.value,
      selectedProduct.value.price,
      1
    );
  } else {
    if (!selectedSize.value) {
      errorMsg.value = "Please select size";
    }
  }
};
</script>

<template>
  <UContainer
    class="container w-8xl mx-auto w-full flex items-center justify-center py-6"
  >
    <div v-if="loading">LOADING</div>
    <div v-else>
      <div v-if="selectedProduct" class="sm:grid grid-cols-2 gap-10 w-full">
        <div class="sm:hidden">
          <div class="flex flex-row gap-2">
            <ProductCrumb
              :gender="selectedProduct?.gender"
              :categoryId="selectedProduct?.category_id"
            />
          </div>
        </div>
        <div>
          <div
            v-for="image in selectedProduct?.inventory"
            class="overflow-hidden"
          >
            <div v-show="image.color_id === selectedColorId">
              <div v-for="images in image.images">
                <carousel :wrapAround="true" snapAlign="start">
                  <slide v-for="image in images" :key="images">
                    <NuxtImg :src="image" width="1200px" height="1200px" />
                  </slide>

                  <template #addons>
                    <navigation />
                    <pagination />
                  </template>
                </carousel>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-3">
          <div class="hidden sm:flex">
            <ProductCrumb
              :gender="selectedProduct?.gender"
              :categoryId="selectedProduct?.category_id"
            />
          </div>
          <div class="flex flex-col space-y-1">
            <div class="text-3xl font-bold">{{ selectedProduct?.name }}</div>
            <div class="text-xs font-bold">DESIGNED FOR ON THE MOVE</div>
          </div>
          <div class="flex flex-col space-y-6">
            <div class="flex flex-col space-y-2">
              <div>
                <div class="font-bold">HK$ {{ selectedProduct?.price }}</div>
                <div class="capitalize">
                  Color: {{ getColor(selectedColorId)?.name }}
                </div>
              </div>

              <div class="flex flex-row gap-2">
                <div v-for="info in selectedProduct?.inventory">
                  <div
                    class="h-6 w-6 rounded-full border border-black cursor-pointer"
                    :class="[
                      selectedColorId === info?.color_id
                        ? 'ring-1 ring-black ring-offset-2'
                        : '',
                    ]"
                    :style="{
                      'background-color': `${
                        getColor(info?.color_id)?.hex_code
                      }`,
                    }"
                    @click="onColorChange(info)"
                  ></div>
                </div>
              </div>
            </div>
            <div v-if="selectedSize">SIZE: {{ selectedSize?.size }}</div>
            <div v-else>Select Size</div>

            <div class="flex flex-row space-y-2">
              <div>
                <div v-for="info of selectedProduct?.inventory">
                  <div
                    v-if="info.color_id === selectedColorId"
                    class="flex flex-row gap-1"
                  >
                    <div v-for="size of info.sizes">
                      <UButton
                        :label="size?.size"
                        class="border"
                        :disabled="size?.quantity === 0"
                        :class="
                          selectedSize?.size === size.size
                            ? 'bg-black text-white'
                            : size.quantity > 0
                              ? 'bg-white text-black hover:bg-black hover:text-white'
                              : 'bg-red-500 disabled text-white disabled:bg-red-500'
                        "
                        @click="onSizeSelect(size)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {{ errorMsg }}
            <div class="bg-gray-50 p-4 w-1/2">
              <UButton
                @click="addToBasketFn"
                color="red"
                class="rounded-none py-4 text-center flex item-center justify-center w-full"
                >Add To Bag
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
