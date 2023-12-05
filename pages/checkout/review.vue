<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="bg-slate-50">
    <div class="flex flex-col gap-4">
      <UCard>
        <template #header>
          <p class="text-2xl font-bold">Payment Information</p>
        </template>

        <div class="flex flex-col gap-2">
          <UFormGroup
            label="Email address (for order confirmation)*"
            name="email"
          >
            <UInput v-model="email" type="email" size="xl" />
          </UFormGroup>

          <UCheckbox
            label=" Sign me up for lululemon emails (you can unsubscribe at any time). See
      our Terms and Conditions for details."
          />
        </div>
      </UCard>
      <UCard>
        <template #header>
          <p class="text-2xl font-bold">Billing address</p>
        </template>
        <div>
          <div v-if="userAddresses">
            <div v-for="(address, i) in userAddresses?.slice(0, 1)" :key="i">
              <p>{{ address?.first_name }} {{ address?.last_name }}</p>
              <p>{{ address?.country_code }} {{ address?.phone }}</p>
              <p>{{ address?.address_line_1 }}</p>
              <p>{{ address?.address_line_2 }}</p>
              <p>{{ address?.district }}</p>
              <p>{{ address?.region }}</p>
              <p>{{ address?.country }}</p>
            </div>
          </div>
        </div>
      </UCard>
      <div class="flex justify-end pb-10 px-4 md:px-0">
        <UButton
          color="red"
          label="CONTINUE TO BILLING"
          size="xl"
          class="flex items-center justify-center"
          @click="() => router.push('/checkout/payment')"
        />
      </div>
    </div>
  </div>
</template>
