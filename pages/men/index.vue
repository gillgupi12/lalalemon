<script setup>
import GenderSideBar from "../../components/organisms/gender/sidebar.vue";

const menuItems = [
  {
    label: "What is New",
    path: "men-new",
  },
  {
    label: "Bestsellers",
    path: "men-best-sellers",
  },
  {
    label: "Pants",
    path: "men-pants",
  },
  {
    label: "Hoodies",
    path: "men-hoodies",
  },
  {
    label: "Jackets",
    path: "men-jackets",
  },
  {
    label: "Shorts",
    path: "men-shorts",
  },
  {
    label: "Accessories",
    path: "men-accessories",
  },
];
</script>

<template>
  <div class="flex flex-row gap-2 items-center">
    <GenderSideBar header="lalalemon men's" :menu-items="menuItems" />
    <div>Gallery & CTA</div>
  </div>
</template>
