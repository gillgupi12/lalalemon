<script setup lang="ts">
const client = useSupabaseClient();
const { userData } = storeToRefs(useAuthStore());

const layout = ref<MaybeRef<string | false | undefined>>();

onMounted(async () => {
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    userData.value = user;
  }
});
</script>
<template>
  <div class="!bg-white h-screen">
    <div>
      <NuxtLayout>
        <UNotifications />
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
