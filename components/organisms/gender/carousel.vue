<script setup lang="ts">
import ProductCard from "../../organisms/product/card.vue";
const props = defineProps({
  items: { type: Array, default: [], required: true },
  itemsPerSlide: { type: Number, default: 4, required: false },
});

const activeSlideIndex = ref(0);
const totalSlides = computed(() =>
  Math.ceil(props.items.length / props.itemsPerSlide)
);

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
  const start = activeSlideIndex.value * props.itemsPerSlide;
  const end = start + props.itemsPerSlide;
  return props.items.slice(start, end) as [];
});

const goToSlide = (index: number) => {
  console.log(index);
  activeSlideIndex.value = index - 1;
};
</script>

<template>
  <div class="flex flex-col items-center py-10 pb-40">
    <div class="flex flex-row pb-2 items-center gap-3 relative">
      <UButton
        @click="previousSlide"
        variant="ghost"
        class="text-black border hover:bg-slate-100 absolute top-50 left-4 hidden sm:block"
      >
        <Icon name="material-symbols:arrow-back-ios-new" />
      </UButton>
      <transition-group name="slide-fade" tag="div" class="flex flex-row gap-1">
        <div v-for="(item, i) of productsToShow" :key="i">
          <ProductCard :item="item" />
        </div>
      </transition-group>
      <UButton
        @click="nextSlide"
        variant="ghost"
        class="text-black border hover:bg-slate-100 absolute top-50 right-4 hidden sm:block"
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
</template>

<style>
.slide-fade-enter-active {
  transition: all 10s ease;
}
.slide-fade-leave-active {
  transition: all 10s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
