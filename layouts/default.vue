<template>
  <div class="flex flex-col w-full bg-gray-50 dark:bg-black min-h-screen">
    <OrganismsToolbar />
    <OrganismsMenubar class="z-10 sticky top-0 w-full" />

    <div class="max-w-8xl container mx-auto py-0">
      <slot />
    </div>
  </div>
</template>
