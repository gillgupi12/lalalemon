<script setup lang="ts">
const toolbarItems = [
  {
    label: 'Track Order',
    path: '/track-order',
  },
  {
    label: 'Email SignUp',
    path: '/email-signup',
  },
  {
    label: 'Stores',
    path: '/stores',
  },

]
</script>

<template>
  <div class="md:flex  text-black py-10  items-center  max-w-7xl container  hidden mx-auto">
    <div class="flex flex-row space-x-4 text-lg  px-4 items-center place-content-end   w-full ">
      <div v-for="toolbarItem, index in toolbarItems" :key="index">
        <NuxtLink :to="toolbarItem.path" active-class="font-semibold text-slate-700">
          {{ toolbarItem.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
