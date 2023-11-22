<script setup lang="ts">
import ProductCard from "components/organisms/product/card.vue";

const props = defineProps({
  items: { type: Array, default: [], required: true },
  itemsPerSlide: { type: Number, default: 4, required: false },
});

const activeSlideIndex = ref(0);
const totalSlides = computed(() => {
  if (viewportWidth.value > 1200) {
    return Math.ceil(props.items.length / itemsPerSlide.value);
  } else if (viewportWidth.value > 900) {
    return Math.ceil(props.items.length / itemsPerSlide.value);
  } else if (viewportWidth.value > 600) {
    return Math.ceil(props.items.length / itemsPerSlide.value);
  } else {
    return Math.ceil(props.items.length / itemsPerSlide.value);
  }
});

const nextSlide = () => {
  if (activeSlideIndex.value < totalSlides.value - 1) {
    activeSlideIndex.value += 1;
  } else {
    activeSlideIndex.value = 0;
  }
};

const previousSlide = () => {
  if (activeSlideIndex.value > 0) {
    activeSlideIndex.value -= 1;
  } else {
    activeSlideIndex.value = totalSlides.value - 1;
  }
};

const productsToShow = computed(() => {
  const start = activeSlideIndex.value * itemsPerSlide.value;
  const end = start + itemsPerSlide.value;
  return props.items.slice(start, end) as [];
});

const goToSlide = (index: number) => {
  console.log(index);
  activeSlideIndex.value = index - 1;
};

const viewportWidth = ref();

// Adjust the number of items per slide based on the viewport width
const itemsPerSlide = computed(() => {
  if (viewportWidth.value > 1200) {
    return 4;
  } else if (viewportWidth.value > 900) {
    return 3;
  } else if (viewportWidth.value > 600) {
    return 2;
  } else {
    return 1;
  }
});
const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth;
};

//auto next slide
let autoSlideInterval: NodeJS.Timeout | null = null;

const startAutoSlide = () => {
  stopAutoSlide(); // Clear any existing interval first
  autoSlideInterval = setInterval(nextSlide, 4000);
};
const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

onMounted(() => {
  if (process.client) {
    viewportWidth.value = window.innerWidth;
    window?.addEventListener("resize", updateViewportWidth);
    startAutoSlide();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateViewportWidth);
  stopAutoSlide();
});
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col py-4 items-center">
      <div class="flex flex-row pb-2 items-center gap-3 relative">
        <UButton
          @click="previousSlide"
          color="white"
          class="z-10 text-black bg-opacity-50 hover:bg-slate-100 absolute top-50 left-4 hidden sm:block"
        >
          <Icon name="material-symbols:arrow-back-ios-new" />
        </UButton>

        <div v-for="(item, i) of productsToShow" :key="i">
          <ProductCard :item="item" />
        </div>

        <UButton
          @click="nextSlide"
          color="white"
          class="text-black bg-opacity-50 hover:bg-slate-100 absolute top-50 right-4 hidden sm:block"
        >
          <Icon name="material-symbols:arrow-back-ios-new" class="rotate-180" />
        </UButton>
      </div>
      <div class="flex flex-row gap-2 items-center">
        <div v-for="slide in totalSlides" :key="slide">
          <div
            v-if="activeSlideIndex + 1 === slide"
            @click="goToSlide(slide)"
            class="rounded-full bg-black w-3 h-3 cursor-pointer"
          ></div>
          <div
            v-else
            @click="goToSlide(slide)"
            class="rounded-full bg-slate-500 w-3 h-3 cursor-pointer"
          ></div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
