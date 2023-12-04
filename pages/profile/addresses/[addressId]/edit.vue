<script setup lang="ts">
import UpdateAddress from "components/organisms/forms/update-address.vue";
import type { Address } from "store/auth.store";

const route = useRoute();
const addressId = route.params.addressId.toString();

useHead({
  title: "Add Address | Lalalemon",
});
const toast = useToast();
const router = useRouter();
const errorMessage = ref();
const loading = ref(false);

const { userAddresses } = storeToRefs(useAuthStore());

const supabase = useSupabaseClient();
const { updateAddress } = useAuthStore();
const handleUpdateAddress = async (address: Address) => {
  loading.value = true;
  errorMessage.value = "";
  const response = await updateAddress(address);
  if (response?.error) {
    toast.add({
      title: "Error Occured",
      color: "red",
      description: "An error occured when updating address!",
      timeout: 3000,
    });
    errorMessage.value = response.error.message;
  } else if (response?.data) {
    toast.add({
      title: "Success",
      color: "green",
      description: "Address has been successfully updated!",
      timeout: 3000,
    });
    router.push("/profile");
  }
  loading.value = false;
};

const loadingAddress = ref(true);
const { getUserAddresses } = useAuthStore();
const handleGetUserAddress = async () => {
  loadingAddress.value = true;
  await getUserAddresses();
  loadingAddress.value = false;
};
onMounted(async () => {
  loadingAddress.value = true;
  await handleGetUserAddress();
  loadingAddress.value = false;
});
</script>

<template>
  <UContainer class="py-10 max-w-4xl">
    <UpdateAddress
      v-if="userAddresses && userAddresses[0]"
      class="bg-white"
      :loading="loading"
      :address="userAddresses.find((address) => address.id === addressId)!"
      :error-message="errorMessage"
      @update-address="handleUpdateAddress"
    />
  </UContainer>
</template>
