<script setup lang="ts">
import ImageCarousel from "../common/image-carousel.vue";
const props = defineProps({
  item: { type: Object || String || null, required: true },
});

const redirectToItem = (item: any) => {
  console.log(item);
};
const router = useRouter();
const { getColor } = useColorStore();

const selectedColor = ref();

onMounted(() => {
  if (
    props.item &&
    props.item.inventory.length > 0 &&
    props.item.inventory[0].color_id
  )
    selectedColor.value = props.item?.inventory[0]?.color_id;
});

const onColorSelect = (colorId: string) => {
  selectedColor.value = colorId;
};
</script>

<template>
  <div class="overflow-hidden p-2">
    <div class="flex flex-col">
      <div v-for="data in item.inventory" class="pb-1">
        <div v-if="selectedColor === data.color_id">
          <div v-if="data.images" v-for="images in data.images">
            <ImageCarousel
              v-if="images && data.images.length > 0"
              :images="images"
              :hide-dots="true"
              :hide-arrow="true"
            />
          </div>
          <div v-else>
            <NuxtImg src="https://placehold.co/1200x1200" />
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
