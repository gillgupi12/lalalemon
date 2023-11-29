<script setup lang="ts">
const client = useSupabaseClient();
const { userData } = storeToRefs(useAuthStore());
const { getAllColors } = useColorStore();
const { getAllCategories } = useCategoryStore();

const layout = ref<MaybeRef<string | false | undefined>>();

onMounted(async () => {
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    await getAllColors();
    await getAllCategories();
    userData.value = user;
  }
});
useHead({
  title: "Lalalemon",
});
</script>
<template>
  <div class="min-h-screen">
    <div>
      <NuxtLayout>
        <UNotifications />
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
<style>
.page-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
