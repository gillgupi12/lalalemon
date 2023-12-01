<script setup lang="ts">
import Card from "components/organisms/common/card.vue";
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  addressTitle: undefined,
  country: undefined,
  firstName: undefined,
  lastName: undefined,
  countryCode: undefined,
  phone: undefined,
  addressLine1: undefined,
  addressLine2: undefined,
  region: undefined,
  district: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.addressTitle)
    errors.push({ path: "addressTitle", message: "Required" });
  if (!state.country) errors.push({ path: "country", message: "Required" });
  if (!state.firstName) errors.push({ path: "firstName", message: "Required" });
  if (!state.lastName) errors.push({ path: "lastName", message: "Required" });
  if (!state.countryCode)
    errors.push({ path: "countryCode", message: "Required" });
  if (!state.phone) errors.push({ path: "phone", message: "Required" });
  if (!state.addressLine1)
    errors.push({ path: "addressLine1", message: "Required" });
  if (!state.region) errors.push({ path: "region", message: "Required" });
  if (!state.district) errors.push({ path: "district", message: "Required" });

  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
}
</script>

<template>
  <Card class="flex flex-col gap-8">
    <div>
      <div class="font-bold text-2xl">ADD NEW ADDRESS</div>
      <small>* indicates the field is required</small>
    </div>
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Address Title*" name="addressTitle">
        <UInput v-model="state.addressTitle" size="xl" />
      </UFormGroup>

      <UFormGroup label="Country*" name="country">
        <UInput v-model="state.country" size="xl" />
      </UFormGroup>
      <UFormGroup label="First Name*" name="firstName">
        <UInput v-model="state.firstName" size="xl" />
      </UFormGroup>
      <UFormGroup label="Last Name*" name="lastName">
        <UInput v-model="state.lastName" size="xl" />
      </UFormGroup>
      <div class="flex flex-row gap-4">
        <UFormGroup label="Country Code*" name="countryCode">
          <UInput v-model="state.countryCode" size="xl" />
          <small class="text-gray-400">852</small>
        </UFormGroup>
        <UFormGroup label="Phone*" name="phone" class="w-full">
          <UInput v-model="state.phone" size="xl" />
          <small class="text-gray-400">22345678</small>
        </UFormGroup>
      </div>
      <UFormGroup label="Address Line1*" name="addressLine1">
        <UInput v-model="state.addressLine1" size="xl" />
        <small class="text-gray-400">Unit, Room, Floor, Building name</small>
      </UFormGroup>
      <UFormGroup label="Address Line2(Optional)" name="addressLine2">
        <UInput v-model="state.addressLine2" size="xl" />
        <small class="text-gray-400">Building number, Street name</small>
      </UFormGroup>
      <UFormGroup label="Region*" name="region">
        <UInput v-model="state.region" size="xl" />
      </UFormGroup>

      <UFormGroup label="District*" name="district">
        <UInput v-model="state.district" size="xl" />
      </UFormGroup>
      <UButton
        type="submit"
        color="black"
        class="w-full flex items-center justify-center py-4 hover:bg-white hover:text-black border-black border rounded-none"
      >
        SAVE
      </UButton>
      <UButton
        color="white"
        class="w-full flex items-center justify-center py-4 hover:bg-black hover:text-white border-black border rounded-none"
      >
        CANCEL
      </UButton>
    </UForm>
  </Card>
</template>
