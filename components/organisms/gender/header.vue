<script setup lang="ts">
defineProps({
  imagePath: { type: String, required: true, default: "" },
  imageAltDescription: { type: String, required: true, default: "" },
  upperButtonLabel: { type: String, required: true, default: "" },
  upperButtonPath: { type: String, required: true, default: "" },
  lowerButtonLabel: { type: String, required: true, default: "" },
  lowerButtonPath: { type: String, required: true, default: "" },
  footerDescription: { type: String, required: true, default: "" },
});
const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="relative">
      <img :src="imagePath" :alt="imageAltDescription" />
      <div class="py-4 px-2 md:absolute bottom-10 right-5 flex flex-col gap-2">
        <UButton
          color="white"
          class="border-black text-sm border uppercase text-center font-bold py-4 px-4 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          size="xl"
          :label="upperButtonLabel"
          @click="() => router.push({ name: upperButtonPath })"
        />

        <UButton
          color="white"
          class="border-black text-sm border uppercase text-center font-bold py-4 px-4 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          size="xl"
          :label="lowerButtonLabel"
          @click="() => router.push({ name: lowerButtonPath })"
        />
      </div>
    </div>
    <h3 class="text-xl md:text-3xl px-2">
      {{ footerDescription }}
    </h3>
  </div>
</template>
