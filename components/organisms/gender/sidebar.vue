<script setup lang="ts">
interface MenuItem {
  label: string
  path: string
}

defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>,
    default: () => [], // use a function to return the default array
    required: true,
  },
  header: {
    type: String,
    default: '',
    required: true,
  },
})
</script>

<template>
  <div class="w-[200px] flex flex-col space-y-6">
    <div class="text-4xl break-words font-bold">
      {{ header }}
    </div>
    <div v-if="menuItems" class="flex flex-col space-y-4">
      <div v-for="item, index in menuItems" :key="index">
        <NuxtLink
          :to="{ name: item.path }" class="capitalize text-lg font-semibold hover:underline underline-offset-4 decoration-2 decoration-red-500 mb-2"
          active-class="underline decoration-2 decoration-red-500 mb-2 underline-offset-4"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
