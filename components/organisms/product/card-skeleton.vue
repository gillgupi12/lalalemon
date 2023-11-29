<template>
  <div class="flex flex-col gap-2">
    <USkeleton class="w-full h-96" />
    <div class="flex flex-col items-start space-y-2">
      <div class="flex flex-row gap-2">
        <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
        <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
      </div>
      <div class="space-y-2">
        <USkeleton class="h-3 w-[250px]" />
        <USkeleton class="h-3 w-[200px]" />
      </div>
    </div>
  </div>
</template>
