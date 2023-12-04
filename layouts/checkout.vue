<script setup lang="ts">
import HeroFooter from "components/organisms/footer/index.vue";
</script>
<template>
  <div class="flex flex-col bg-white dark:bg-[#121212]">
    <OrganismsMenubar class="z-10 sticky top-0 w-full" />

    <div>
      <slot />
    </div>

    <HeroFooter />
  </div>
</template>
