<script setup lang="ts">
import ImageCarousel from "components/organisms/common/image-carousel.vue";
const route = useRoute();
const productId = route.params.productId.toString();
const supabase = useSupabaseClient();
const selectedProduct = ref();
const productInventory = ref();
const productImages = ref();
const formattedProduct = ref();

const { getColor } = useColorStore();

const getProduct = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId);

  if (data) {
    selectedProduct.value = data;
  }
};
const getProductInfo = async () => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("product_id", productId);

  if (data) {
    productInventory.value = data;
  }
};
const getProductImages = async () => {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId);

  if (data) {
    productImages.value = data;
  }
};

onMounted(async () => {
  await getProduct();
  await getProductInfo();
  await getProductImages();
  if (productInventory.value) {
    selectedProduct.value = selectedProduct.value.map((product: any) => {
      return {
        ...product,
        additionalInfo: product.colorIds.map((colorId: number) => {
          const data: { quantity: number; size_id: string } =
            productInventory.value.find(
              (inventory: {
                product_id: number;
                color_id: number;
                size_id: string;
                quantity: number;
              }) => inventory.color_id === colorId
            );
          console.log(
            productImages.value.find(
              (product: {
                id: string;
                created_at: Date;
                product_id: number | string;
                color_id: number;
                images: string[];
              }) =>
                product.product_id === product.id &&
                product.color_id === colorId
            )
          );
          return {
            colorId,
            quantity: data?.quantity ?? 0,
            sizeInfo: product.sizes.map((size: any) => {
              return {
                size,
                available: data?.size_id === size ?? false,
                quantity:
                  productInventory.value.find(
                    (inventory: {
                      product_id: number;
                      color_id: number;
                      size_id: string;
                      quantity: number;
                    }) =>
                      inventory.color_id === colorId &&
                      inventory.size_id === size
                  )?.quantity ?? 0,
                // ...data,
              };
            }),
            images: productImages.value.find(
              (product: {
                id: string;
                created_at: Date;
                product_id: number | string;
                color_id: number;
                images: string[];
              }) => product.color_id === colorId
            )?.images,
          };
        }),
      };
    });
    selectedColorId.value =
      selectedProduct.value && selectedProduct.value[0].colorIds[0];
  }
});

const selectedColorId = ref();
const selectedSize = ref();

const onColorChange = (data: any) => {
  selectedColorId.value = data.colorId;
};

const onSizeSelect = (data: any) => {
  selectedSize.value = data;
};
</script>

<template>
  <UContainer class="container w-7xl mx-auto w-full">
    <div v-for="product in selectedProduct" class="grid grid-cols-2 gap-2">
      <div>
        <div v-for="image in product.additionalInfo">
          <div v-if="image.colorId === selectedColorId">
            <ImageCarousel
              v-if="image.images?.length > 0"
              :images="image.images"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col space-y-3">
        <div class="flex flex-col space-y-1">
          <div class="text-3xl font-bold">{{ product.name }}</div>
          <div class="text-xs font-bold">DESIGNED FOR ON THE MOVE</div>
        </div>
        <div class="flex flex-col space-y-6">
          <div class="flex flex-col space-y-2">
            <div>
              <div class="font-bold">HK$ {{ product.price }}</div>
              <div class="capitalize">
                Color: {{ getColor(selectedColorId)?.name }}
              </div>
            </div>

            <div class="flex flex-row gap-2">
              <div v-for="info in product.additionalInfo">
                <div
                  class="h-6 w-6 rounded-full border border-black cursor-pointer"
                  :class="[
                    selectedColorId === info.colorId
                      ? 'ring-1 ring-black ring-offset-2'
                      : '',
                  ]"
                  :style="{
                    'background-color': `${getColor(info.colorId)?.hex_code}`,
                  }"
                  @click="onColorChange(info)"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex flex-row space-y-2">
            <div>
              <div v-for="info of product.additionalInfo">
                <div
                  v-if="info.colorId === selectedColorId"
                  class="flex flex-row gap-1"
                >
                  <div v-for="size of info.sizeInfo">
                    <UButton
                      :label="size.size"
                      class="border"
                      :disabled="size.quantity === 0"
                      :class="
                        size.quantity > 0
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
        </div>
      </div>
    </div>
  </UContainer>
</template>
