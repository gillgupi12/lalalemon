<script setup lang="ts">
const supabase = useSupabaseClient();
const emits = defineEmits(["filter", "nofilter"]);

const loading = ref(false);
const allCategories = ref();
const fetchCategories = async () => {
  loading.value = true;
  const { data, error } = await supabase.from("categories").select("*");

  if (data) {
    allCategories.value = data.map((category: any) => {
      return {
        ...category,
        selected: false,
      };
    });
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchCategories();
});

watch(
  allCategories,
  async () => {
    const data = allCategories.value
      .filter((category: any) => category.selected === true)
      .map((category: any) => category.id);

    if (data.length === 0) {
      emits("nofilter");
      //   await fetchProducts();
    } else {
      emits("filter", data);
      //   await fetchProductswithFilters(data);
    }
  },
  { deep: true, immediate: false }
);

const items = [
  {
    label: "Category",
    icon: "i-heroicons-information-circle",
    defaultOpen: true,
    slot: "category-filter",
  },
];
</script>

<template>
  <div>
    <div class="text-sm pb-2">
      <div class="font-bold px-2">Filters</div>
    </div>
    <UAccordion :items="items" class="bg-white border">
      <template #category-filter>
        <div class="flex flex-col space-y-1 px-4">
          <div v-for="(categories, index) in allCategories" :key="index">
            <USkeleton v-if="loading" class="w-full h-4 mb-1 mt-1" />
            <UCheckbox
              v-else
              v-model="categories.selected"
              name="categories"
              class="capitalize"
              :label="categories.name"
            >
            </UCheckbox>
          </div>
        </div>
      </template>

      <template #default="{ item, index, open }">
        <UButton
          color="gray"
          variant="ghost"
          class="border-b border-gray-200 dark:border-gray-700 hover:bg-white"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <span class="truncate"> {{ item.label }}</span>

          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
          </template>
        </UButton>
      </template>
    </UAccordion>
  </div>
</template>
