<!-- <script setup>
// const openSideBar = ref(false)
// function toggleSideBar() {
//   openSideBar.value = !openSideBar.value
// }
</script> -->

<template>
  <div class="!h-screen !overflow-hidden flex flex-row w-full bg-gray-50">
    <div class="flex flex-col w-full ">
      <div class="bg-gray-100">
        <OrganismsToolbar />
        <OrganismsMenubar />
      </div>
      <div class="max-w-7xl container mx-auto py-4">
        <slot />
      </div>
    </div>
  </div>
</template>
