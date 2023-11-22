<script setup lang="ts">
import { routerKey } from "vue-router";

const props = defineProps({
  imagePath: { type: String, default: "", required: true },
  title: { type: String, default: "", required: true },
  description: { type: String, default: "", required: true },
  buttonRoutePath: { type: String, default: "", required: true },
  buttonText: { type: String, default: "", required: true },
});

const router = useRouter();
const goTo = () => {
  router.push(props.buttonRoutePath);
};
</script>

<template>
  <div class="flex flex-col space-y-3">
    <img :src="imagePath" class="cursor-pointer" @click="goTo()" />
    <p class="font-bold text-2xl">{{ title }}</p>
    <p class="font-normal">{{ description }}</p>
    <div>
      <UButton
        :label="buttonText"
        color="white"
        class="p-4 px-10 hover:bg-black hover:text-white"
        @click="goTo()"
      />
    </div>
  </div>
</template>
