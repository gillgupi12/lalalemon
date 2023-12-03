<script setup lang="ts">
const client = useSupabaseClient();
const { userData } = storeToRefs(useAuthStore());
const { getAllColors } = useColorStore();
const { getAllCategories } = useCategoryStore();
const { fetchBasket } = useBasketStore();

const {
  data: { user },
} = await client.auth.getUser();
if (user && user.id) {
  await getAllColors();
  await getAllCategories();
  await fetchBasket();
  userData.value = user;
}
useHead({
  title: "Lalalemon",
});
</script>
<template>
  <div class="min-h-screen overflow-hidden">
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
