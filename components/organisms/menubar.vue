<script setup lang="ts">
import Logo from './logo.vue'

const toolbarItems = [
  {
    label: 'Women',
    path: '/women',
  },
  {
    label: 'Men',
    path: '/men',
  },
  {
    label: 'Accessories',
    path: '/accessories',
  },
  {
    label: 'Community',
    path: '/community',
  },
  {
    label: 'Find your Wellbeing',
    path: '/wellbeing',
  },

]
</script>

<template>
  <div class="md:flex flex-row  text-black py-6   w-full shadow-sm hidden bg-white px-4 ">
    <div class="flex max-w-7xl container justify-between flex-row mx-auto">
      <div class="flex flex-row items-center space-x-8">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
        <div class="flex flex-row space-x-8 text-lg  px-4 ">
          <div v-for="toolbarItem, index in toolbarItems" :key="index">
            <NuxtLink
              :to="toolbarItem.path" class="uppercase text-sm font-bold hover:underline underline-offset-4 decoration-2 decoration-red-500 mb-2"
              active-class="underline decoration-2 decoration-red-500 mb-2 underline-offset-4"
            >
              {{ toolbarItem.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center gap-4">
        <InputText class="p-2 border border-black rounded" type="search" inputmode="search" />
        <div>
          <NuxtLink :to="{ name: 'profile' }">
            <Icon name="teenyicons:user-circle-outline" class="hover:text-slate-500" />
          </NuxtLink>
        </div>
        <NuxtLink :to="{ name: 'basket' }">
          <Icon name="material-symbols:shopping-cart-outline" class="hover:text-slate-500" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
