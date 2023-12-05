<script setup lang="ts">
import { useCheckOutStore } from "~/stores/checkout.store";

definePageMeta({
  layout: false,
});

const router = useRouter();
const { getUserAddresses } = useAuthStore();
const { userData } = storeToRefs(useAuthStore());
const { userAddresses } = storeToRefs(useAuthStore());
const { checkoutDetails } = storeToRefs(useCheckOutStore());

const handleGetUserAddress = async () => {
  await getUserAddresses();
};

onMounted(async () => {
  await handleGetUserAddress();
  if (userData.value?.email) {
    checkoutDetails.value.email = userData.value?.email;
    checkoutDetails.value.shipping_details = userAddresses.value.slice(0, 1)[0];
  }
});
</script>

<template>
  <div class="bg-slate-50">
    <div class="flex flex-col gap-4">
      <UCard>
        <template #header>
          <p class="text-2xl font-bold">Contact information</p>
        </template>

        <div class="flex flex-col gap-2">
          <UFormGroup
            label="Email address (for order confirmation)*"
            name="email"
          >
            <UInput v-model="checkoutDetails.email" type="email" size="xl" />
          </UFormGroup>

          <UCheckbox
            label=" Sign me up for lululemon emails (you can unsubscribe at any time). See
      our Terms and Conditions for details."
          />
        </div>
      </UCard>
      <UCard>
        <template #header>
          <p class="text-2xl font-bold">Shipping address</p>
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
      <UCard>
        <template #header>
          <p class="text-2xl font-bold">Shipping method</p>
        </template>
        <div class="flex flex-row justify-between">
          <p class="font-bold">Standard</p>
          <p class="font-normal">(1-3 Business Days)</p>
          <p class="font-bold">FREE</p>
        </div>
      </UCard>
      <div class="flex justify-between pb-10 px-4 md:px-0 items-center">
        <div />
        <UButton
          color="red"
          label="CONTINUE TO PAYMENT"
          size="xl"
          class="flex items-center justify-center"
          @click="() => router.push('/checkout/payment')"
        />
      </div>
    </div>
  </div>
</template>
