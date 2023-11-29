<script setup lang="ts">
interface MenuItem {
  label: string;
  path: string;
}

defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>,
    default: () => [], // use a function to return the default array
    required: true,
  },
  header: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<template>
  <div>
    <div
      class="flex items-center py-4 text-base justify-center md:text-4xl break-words font-bold"
    >
      {{ header }}
    </div>
    <div
      v-if="menuItems"
      class="overflow-scroll w-screen md:w-full flex flex-row gap-4 border-b p-2 md:p-0 text-sm md:text-base border-t md:border-none md:flex-col md:space-y-4 md:gap-0"
    >
      <div v-for="(item, index) in menuItems" :key="index">
        <NuxtLink
          :to="{ name: item.path }"
          class="capitalize hover:underline underline-offset-4 decoration-2 decoration-red-500 mb-2 truncate"
          active-class="underline decoration-2 decoration-red-500 mb-2 underline-offset-4"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
