<script setup lang="ts">
import baseToggleColor from "components/atoms/base-toggle-color.vue";
const toolbarItems = [
  {
    label: "Stores",
    path: "/stores",
  },
];
</script>

<template>
  <div
    class="md:flex text-black py-4 items-center max-w-8xl container hidden mx-auto dark:text-white"
  >
    <div
      class="flex flex-row space-x-4 text-sm px-4 items-center place-content-end w-full"
    >
      <div v-for="(toolbarItem, index) in toolbarItems" :key="index">
        <NuxtLink
          :to="toolbarItem.path"
          active-class="font-semibold text-slate-700 "
        >
          {{ toolbarItem.label }}
        </NuxtLink>
      </div>
      <baseToggleColor />
    </div>
  </div>
</template>
