<script setup lang="ts">
defineProps({
  item: { type: Object || String || null, required: true },
});

const redirectToItem = (item: any) => {
  console.log(item);
};
</script>

<template>
  <div class="bg-slate-50" @click="redirectToItem(item)">
    <img :src="item.image" :alt="item.imageAlt" />
    <p class="font-semibold">{{ item.name }}</p>
    <p>HK${{ item.price }}</p>
  </div>
</template>
