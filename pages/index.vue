<script setup lang="ts">
import HeroSideBar from "components/organisms/hero/sidebar.vue";
import HeroHeader from "components/organisms/hero/header.vue";
import Carousel from "components/organisms/gender/carousel.vue";

const menuItems = [
  {
    label: "Women's What's New",
    path: "women-new",
  },
  {
    label: "Men's What's New",
    path: "men-new",
  },
  {
    label: "Women's Casual",
    path: "women-pants",
  },
  {
    label: "Men's Casual",
    path: "men-hoodies",
  },
  {
    label: "Women's Pants",
    path: "women-pants",
  },
  {
    label: "Men's Pants",
    path: "men-pants",
  },
  {
    label: "Women's Hoodies",
    path: "women-hoodies",
  },
  {
    label: "Men's Hoodies",
    path: "men-hoodies",
  },
  {
    label: "Accessories",
    path: "accessories",
  },
];

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
</script>

<template>
  <div class="container w-7xl mx-auto">
    <div>
      <div class="flex flex-row gap-2 items-start">
        <div class="p-8">
          <HeroSideBar header="lalalemon" :menu-items="menuItems" />
        </div>
        <HeroHeader
          image-path="/5.webp"
          image-alt-description=""
          upper-button-label="Shop women whats's new"
          upper-button-path="women-new"
          lower-button-label="Shop men whats's new"
          lower-button-path="men-new"
          footer-description="Bestselling icons with a proven track record."
        />
      </div>
      <Carousel :items="array" :items-per-slide="4" />
    </div>
  </div>
</template>
