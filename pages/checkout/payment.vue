<script setup lang="ts">
import type { FormError } from "#ui/types";
definePageMeta({
  layout: false,
});
const router = useRouter();
const supabase = useSupabaseClient();
const { getUserAddresses } = useAuthStore();
const { getColor } = useColorStore();
const { userData } = storeToRefs(useAuthStore());
const { userAddresses } = storeToRefs(useAuthStore());

const email = ref(userData.value?.email);
const basketData = ref();

const handleGetUserAddress = async () => {
  await getUserAddresses();
};

const getData = async () => {
  const response = await supabase
    .rpc("get_basket_with_product_details")
    .select();

  if (response.data) {
    basketData.value = response.data;
  }
};

const totalAmount = computed(() => {
  return basketData.value
    ?.map((row: any) => {
      const data = row.item_data?.price * row?.item_data?.quantity;
      return data;
    })
    .reduce((a: any, b: any) => a + b, 0);
});

onMounted(async () => {
  await handleGetUserAddress();
  await getData();
});

const paymentDetails = reactive({
  card_number: "",
  exp_date: "",
  ccv: "",
  cardholder: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.card_number)
    errors.push({ path: "card_number", message: "Required" });
  if (!state.exp_date) errors.push({ path: "exp_date", message: "Required" });
  if (!state.ccv) errors.push({ path: "ccv", message: "Required" });
  if (!state.cardholder)
    errors.push({ path: "cardholder", message: "Required" });
  return errors;
};
</script>

<template>
  <div class="bg-slate-50">
    <div class="flex flex-col gap-4">
      <UCard>
        <template #header>
          <p class="text-2xl font-bold">Payment Information</p>
        </template>

        <div class="flex flex-col gap-2">
          <UForm
            :validate="validate"
            :state="paymentDetails"
            class="space-y-4 flex flex-col"
          >
            <UFormGroup label="Card number:" name="card_number">
              <UInput
                v-model="paymentDetails.card_number"
                type="text"
                size="xl"
              />
            </UFormGroup>
            <div class="flex flex-row w-full justify-between gap-2">
              <div class="w-full">
                <UFormGroup label="Exp Date:" name="exp_date">
                  <UInput
                    v-model="paymentDetails.exp_date"
                    type="text"
                    size="xl"
                  />
                </UFormGroup>
              </div>
              <div class="w-full">
                <UFormGroup label="CCV:" name="ccv">
                  <UInput v-model="paymentDetails.ccv" type="text" size="xl" />
                </UFormGroup>
              </div>
            </div>
            <UFormGroup label="Cardholder:" name="cardholder">
              <UInput
                v-model="paymentDetails.cardholder"
                type="text"
                size="xl"
              />
            </UFormGroup>
          </UForm>
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
      <div class="flex justify-between pb-10 px-4 md:px-0 items-center">
        <NuxtLink to="/checkout" class="underline text-base hover:text-gray-500"
          >Back To Shipping</NuxtLink
        >
        <UButton
          color="red"
          label="REVIEW ORDER"
          size="xl"
          :disabled="validate(paymentDetails).length > 0"
          class="flex items-center justify-center"
          @click="() => router.push('/checkout/payment')"
        />
      </div>
    </div>
  </div>
</template>
