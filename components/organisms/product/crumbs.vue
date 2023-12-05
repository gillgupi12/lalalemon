<script setup lang="ts">
const props = defineProps({
  gender: { type: String, required: true },
  categoryId: { type: Number, required: true },
});

const { getCategory } = useCategoryStore();

const capitalizedText = (text: string) => {
  // Capitalize the first letter and make the rest lowercase
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
</script>

<template>
  <div class="flex flex-row space-x-2 text-sm font-light">
    <div
      class="underline underline-offset-2 decoration-slate-500 decoration-2 cursor-pointer capitalize hover:font-normal hover:decoration-red-500"
    >
      {{ capitalizedText(gender) }}
    </div>
    <div>/</div>
    <div
      class="underline underline-offset-2 decoration-slate-500 decoration-2 cursor-pointer capitalize hover:font-normal hover:decoration-red-500"
    >
      {{ getCategory(categoryId) }}
    </div>
  </div>
</template>
