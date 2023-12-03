<script setup lang="ts">
import HeroFooter from "components/organisms/footer/index.vue";
</script>
<template>
  <div class="flex flex-col w-full bg-white dark:bg-[#121212] min-h-screen">
    <OrganismsToolbar />
    <OrganismsMenubar class="z-10 sticky top-0 w-full" />

    <div class="w-full mx-auto py-0">
      <slot />
    </div>
    <HeroFooter />
  </div>
</template>
