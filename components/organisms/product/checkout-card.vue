<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object || String || null,
    required: false,
    default: {
      name: "Steady State Jogger",
      image: "/images/men/products/4.webp",
      imageAlt: "",
      color: "Black",
      price: 1000,
      size: "L",
    },
  },
});

const redirectToItem = (item: any) => {
  console.log(item);
};

const quantity = ref(1);
const total = computed(() => {
  return quantity.value * props.item.price;
});
</script>

<template>
  <div class="overflow-hidden bg-white p-2 shadow-sm">
    <div class="flex flex-row gap-4" @click="redirectToItem(item)">
      <div class="relative overflow-hidden w-60">
        <img
          :src="item.image"
          :alt="item.imageAlt"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="w-full">
        <div class="flex flex-row justify-between w-full">
          <p class="font-semibold">{{ item.name }}</p>
          <div>
            <UButton
              color="black"
              variant="soft"
              class="hover:bg-black hover:bg-opacity-20 rounded-full !p-0"
            >
              <Icon name="iconamoon:sign-times-light" />
            </UButton>
          </div>
        </div>
        <p class="">{{ item.name }}</p>
        <p class="">Color: {{ item.color }}</p>
        <p class="">Size: {{ item.size }}</p>
        <div class="flex flex-row gap-2 items-center">
          Quantity:
          <USelect :options="[1, 2, 3, 4]" v-model="quantity"></USelect>
        </div>

        <div>Total: ${{ total }}</div>
      </div>
    </div>
  </div>
</template>
