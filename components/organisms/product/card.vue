<script setup lang="ts">
defineProps({
  item: { type: Object || String || null, required: true },
});

const redirectToItem = (item: any) => {
  console.log(item);
};
</script>

<template>
  <div class="h-[450px] overflow-hidden">
    <div class="flex flex-col items-stretch" @click="redirectToItem(item)">
      <div class="relative h-96 overflow-hidden">
        <img
          :src="item.image"
          :alt="item.imageAlt"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="">
        <p class="font-semibold">{{ item.name }}</p>
        <p>HK${{ item.price }}</p>
      </div>
    </div>
  </div>
</template>
