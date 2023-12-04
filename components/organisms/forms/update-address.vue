<script setup lang="ts">
import Card from "components/organisms/common/card.vue";
import type { FormError, FormSubmitEvent } from "#ui/types";
import countries from "data/countries.json";

const props = defineProps({
  errorMessage: { type: String, required: false, default: "" },
  address: { type: Object as PropType<Address>, required: true },
});
interface FromState {
  address_title: string;
  first_name: string;
  last_name: string;
  country: string;
  country_code: number;
  phone: number;
  address_line_1: string;
  address_line_2: string;
  region: string;
  district: string;
}

const emits = defineEmits(["updateAddress"]);
const state = reactive({
  id: props.address?.id ?? undefined,
  address_title: props.address?.address_title ?? undefined,
  country: props.address?.country ?? undefined,
  first_name: props.address?.first_name ?? undefined,
  last_name: props.address?.last_name ?? undefined,
  country_code: props.address?.country_code ?? undefined,
  phone: props.address?.phone ?? undefined,
  address_line_1: props.address?.address_line_1 ?? undefined,
  address_line_2: props.address?.address_line_2 ?? undefined,
  region: props.address?.region ?? undefined,
  district: props.address?.district ?? undefined,
});

const validate = (state: FromState): FormError[] => {
  const errors = [];
  if (!state.address_title)
    errors.push({ path: "address_title", message: "Required" });
  if (!state.country) errors.push({ path: "country", message: "Required" });
  if (!state.first_name)
    errors.push({ path: "first_name", message: "Required" });
  if (!state.last_name) errors.push({ path: "last_name", message: "Required" });
  if (!state.country_code)
    errors.push({ path: "country_code", message: "Required" });
  if (!state.phone) errors.push({ path: "phone", message: "Required" });
  if (!state.address_line_1)
    errors.push({ path: "address_line_1", message: "Required" });
  if (!state.region) errors.push({ path: "region", message: "Required" });
  if (!state.district) errors.push({ path: "district", message: "Required" });

  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  emits("updateAddress", state);
}
</script>

<template>
  <Card class="flex flex-col gap-8">
    <div>
      <div class="font-bold text-2xl">UPDATE ADDRESS</div>
      <small>* indicates the field is required</small>
    </div>
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Address Title*" name="address_title">
        <UInput v-model="state.address_title" size="xl" />
      </UFormGroup>

      <UFormGroup label="Country*" name="country">
        <USelect
          :options="countries"
          :popper="{ placement: 'bottom-start' }"
          v-model="state.country"
          size="xl"
        />
      </UFormGroup>
      <UFormGroup label="First Name*" name="first_name">
        <UInput v-model="state.first_name" size="xl" />
      </UFormGroup>
      <UFormGroup label="Last Name*" name="last_name">
        <UInput v-model="state.last_name" size="xl" />
      </UFormGroup>
      <div class="flex flex-row gap-4">
        <UFormGroup label="Country Code*" name="country_code">
          <UInput v-model="state.country_code" size="xl" />
          <small class="text-gray-400">852</small>
        </UFormGroup>
        <UFormGroup label="Phone*" name="phone" class="w-full">
          <UInput v-model="state.phone" size="xl" />
          <small class="text-gray-400">22345678</small>
        </UFormGroup>
      </div>
      <UFormGroup label="Address Line1*" name="address_line_1">
        <UInput v-model="state.address_line_1" size="xl" />
        <small class="text-gray-400">Unit, Room, Floor, Building name</small>
      </UFormGroup>
      <UFormGroup label="Address Line2(Optional)" name="address_line_2">
        <UInput v-model="state.address_line_2" size="xl" />
        <small class="text-gray-400">Building number, Street name</small>
      </UFormGroup>
      <UFormGroup label="Region*" name="region">
        <UInput v-model="state.region" size="xl" />
      </UFormGroup>

      <UFormGroup label="District*" name="district">
        <UInput v-model="state.district" size="xl" />
      </UFormGroup>
      <small class="text-red-500"> {{ errorMessage }}</small>
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
