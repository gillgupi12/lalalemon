<script setup lang="ts"></script>

<template>
  <div class="!bg-gray-200 w-full border-t">
    <UContainer class="p-10 flex items-center flex-col space-y-6">
      <div class="text-center flex flex-col gap-2">
        <p class="text-4xl font-bold">
          Our freshest gear. Straight to your inbox.
        </p>

        <p class="font-semibold text-2xl">
          Be first to know about our newest products, limited-time offers,
          community events, and more.
        </p>
      </div>

      <div class="flex flex-row gap-4 text-xl">
        <UCheckbox label="Women's" />
        <UCheckbox label="Men's" />
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-row gap-2">
          <UInput
            placeholder="Enter your email address"
            size="xl"
            class="w-[400px]"
          />
          <UButton
            label="SIGN UP"
            size="xl"
            color="black"
            class="px-10 rounded"
          ></UButton>
        </div>
        <div class="flex flex-col text-center text-gray-500 pt-2">
          <small>
            We respect your privacy and won't spam you. Unsubscribe at anytime.
          </small>
          <small>To learn more, see our privacy policy.</small>
        </div>
      </div>
    </UContainer>
  </div>
</template>
