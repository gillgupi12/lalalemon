<script setup lang="ts">
import AddNewAddress from "components/organisms/forms/add-new-address.vue";

interface AddAddress {
  address_title: string;
  first_name: string;
  last_name: string;
  country_code: number;
  country: string;
  phone: number;
  address_line_1: string;
  address_line_2: string;
  region: string;
  district: string;
}
useHead({
  title: "Add Address | Lalalemon",
});
const toast = useToast();
const router = useRouter();
const errorMessage = ref();
const loading = ref(false);

const supabase = useSupabaseClient();
const { addNewAddress } = useAuthStore();
const handleAddAddress = async (address: AddAddress) => {
  loading.value = true;
  errorMessage.value = "";
  const response = await addNewAddress(address);
  if (response?.error) {
    toast.add({
      title: "Error Occured",
      color: "red",
      description: "An error occured when adding new address!",
      timeout: 3000,
    });
    errorMessage.value = response.error.message;
  } else if (response?.data) {
    toast.add({
      title: "Success",
      color: "green",
      description: "New Address has been successfully added!",
      timeout: 3000,
    });
    router.push("/profile");
  }
  loading.value = false;
};
</script>

<template>
  <UContainer class="py-10 max-w-4xl">
    <AddNewAddress
      class="bg-white"
      :loading="loading"
      :error-message="errorMessage"
      @add-address="handleAddAddress"
    />
  </UContainer>
</template>
