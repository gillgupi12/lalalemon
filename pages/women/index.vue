<script setup>
import GenderSideBar from '../../components/organisms/gender/sidebar.vue'

const menuItems = [
  {
    label: 'What is New',
    path: 'women-new',
  },
  {
    label: 'Bestsellers',
    path: 'women-best-sellers',
  },
  {
    label: 'Pants',
    path: 'women-pants',
  },
  {
    label: 'Hoodies',
    path: 'women-hoodies',
  },
  {
    label: 'Jackets',
    path: 'women-jackets',
  },
  {
    label: 'Matching Sets',
    path: 'women-matching-sets',
  },
  {
    label: 'Accessories',
    path: 'women-accessories',
  },
]
</script>

<template>
  <div class="flex flex-row gap-2 items-center">
    <GenderSideBar header="lululemon women's" :menu-items="menuItems" />
    <div>Gallery & CTA </div>
  </div>
</template>
