<script setup lang="ts">
import Card from "components/organisms/common/card.vue";
import ProductCheckoutCard from "components/organisms/product/checkout-card.vue";
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

const bag = ref([{ id: "1" }]);
</script>

<template>
  <div>
    <UContainer
      v-if="bag.length === 0"
      class="max-w-4xl p-10 items-center flex flex-col gap-4 py-40"
    >
      <Icon name="ph:shopping-cart" size="80" />
      <p class="text-3xl font-bold">Your bag is empty</p>
      <p>Not sure where to start? Here are some of our favorites.</p>
      <div class="flex flex-row gap-3">
        <UButton color="black" label="SHOP WOMEN'S" class="rounded py-4 px-8" />
        <UButton color="black" label="SHOP MEN'S" class="rounded py-4 px-8" />
      </div>
    </UContainer>
    <UContainer class="flex flex-col gap-4 py-10">
      <div class="flex flex-row justify-between">
        <p class="text-3xl font-bold">My Bag(1)</p>
        <p class="text-xl font-bold">Need Help? +852 8009 06220</p>
      </div>
      <UDivider />
      <div class="grid grid-cols-3 gap-4">
        <ProductCheckoutCard class="col-span-2" />
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 pt-2 pb-4">
            <Icon name="prime:plus" />
            <p class="underline-offset-4 underline">Enter promo code</p>
          </div>
          <div class="flex flex-row justify-between">
            <p>Subtotal</p>
            <div>HK$1,180.00</div>
          </div>
          <UDivider />
          <div class="flex flex-row justify-between">
            <p>Shipping cost</p>
            <div>FREE</div>
          </div>
          <UDivider />
          <div class="flex flex-row justify-between font-bold">
            <div>Estimated Total</div>
            <div>HK$1,180.00</div>
          </div>
          <UButton
            color="red"
            class="py-4 rounded-none text-center flex items-center justify-center"
            label="CHECKOUT"
          />
        </div>
      </div>
    </UContainer>
    <UContainer class="flex flex-col gap-8 py-4">
      <div>
        <p class="text-4xl text-center font-bold">You May Also Like</p>
      </div>
      <OrganismsGenderCarousel :items="array" />
    </UContainer>
  </div>
</template>
