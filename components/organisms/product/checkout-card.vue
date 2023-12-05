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

const { getColor } = useColorStore();
const { deleteBasketItem, updateBasketItem } = useBasketStore();
const { basket } = storeToRefs(useBasketStore());
const emits = defineEmits(["refetchBasket"]);

const isOpen = ref(false);

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

const deletedItem = async (itemId: string) => {
  const response = await deleteBasketItem(itemId);
  if (response?.error) {
  } else if (response?.data) {
    emits("refetchBasket");
  }
};

watch(
  props,
  async (newData, oldData) => {
    const index = basket.value.items.findIndex(
      (item) => item.id === props.item.id
    );

    if (index !== -1) {
      basket.value.items[index].id = props.item.id;
      basket.value.items[index].color_id = props.item.color_id;
      basket.value.items[index].size_id = props.item.size_id;
      basket.value.items[index].quantity = props.item.quantity;
      basket.value.items[index].price = props.item.price;
    }
    await updateBasketItem();
  },
  { deep: true }
);
</script>

<template>
  <div class="overflow-hidden bg-white p-2 shadow-sm border mb-2">
    <div class="flex flex-row gap-4">
      <div class="relative overflow-hidden w-60">
        <carousel :wrapAround="true" snapAlign="start">
          <slide v-for="image in item.product.product_images" :key="image">
            <NuxtImg :src="image" />
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
      <div class="w-full">
        <div class="flex flex-row justify-between w-full">
          <p class="font-semibold text-xl">{{ item.product.product_name }}</p>
          <div>
            <UButton
              color="black"
              variant="soft"
              class="hover:bg-black hover:bg-opacity-20 rounded-full !p-0"
              @click="toggleModal()"
            >
              <Icon name="iconamoon:sign-times-light" />
            </UButton>
          </div>
        </div>
        <p class="capitalize text-base">
          Color: {{ getColor(item.color_id)?.name }}
        </p>
        <p class="text-base">Size: {{ item.size_id.size }}</p>
        <div class="flex flex-row gap-2 items-center">
          Quantity:
          <USelect :options="[1, 2, 3, 4]" v-model="item.quantity"></USelect>
        </div>

        <div>
          Total:
          <span class="font-bold"
            >HK${{ item!.quantity * item.product.product_price }}</span
          >
        </div>
      </div>
    </div>
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800 ',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Remove Product
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="flex flex-col gap-2">
          <UButton
            @click="deletedItem(item.id)"
            class="w-full flex items-center justify-center py-3 text-lg"
            label="Remove"
            color="red"
          />
          <UButton
            @click="toggleModal"
            label="Cancel"
            color="gray"
            variant="ghost"
            class="text-center flex items-center justify-center text-lg py-3"
          />
        </div>
      </UCard>
    </UModal>
  </div>
</template>
