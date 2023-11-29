<script setup lang="ts">
import ImageCarousel from "../common/image-carousel.vue";
const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, required: false, default: false },
});

const router = useRouter();
const { getColor } = useColorStore();

const selectedColor = ref();
onMounted(() => {
  if (
    props.item &&
    props.item.inventory.length > 0 &&
    props.item.inventory[0].color_id
  )
    console.log(props.item, props.item?.inventory[0]?.color_id);
  selectedColor.value = props.item?.inventory[0]?.color_id;
});

watch(
  () => props.item,
  () => {
    selectedColor.value = props.item?.inventory[0]?.color_id;
  }
);
const onColorSelect = (colorId: string) => {
  console.log(selectedColor.value);
  selectedColor.value = colorId;
};

const goToItem = (productId: string) => {
  console.log(productId);
  router.push({
    name: "product-productId",
    params: { productId },
  });
};
</script>

<template>
  <div class="overflow-hidden p-2">
    <div v-if="item && item.inventory" class="flex flex-col">
      <div v-for="(data, i) in item.inventory" :key="i" class="overflow-hidden">
        <div v-for="(images, index) in data?.images" :key="index">
          <div v-if="data.color_id === selectedColor" class="relative">
            <ImageCarousel
              :images="images"
              :hide-dots="true"
              :hide-arrow="true"
              @click="goToItem(item.id)"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <div v-for="data in item.inventory">
          <div
            :style="{
              'background-color': `${getColor(data.color_id)?.hex_code}`,
            }"
            :class="[
              selectedColor === (data && data.color_id) ? 'ring-2' : '',
              'h-6 w-6 rounded-full cursor-pointer border',
            ]"
            @click="onColorSelect(data.color_id)"
          />
        </div>
      </div>
      <div>
        <p class="font-semibold">{{ item?.name }}</p>
        <p>HK${{ item?.price }}</p>
      </div>
    </div>
  </div>
</template>
