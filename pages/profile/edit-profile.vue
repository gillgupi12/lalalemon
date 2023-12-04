<script setup lang="ts">
import EditProfileForm from "components/organisms/forms/edit-profile.vue";

const { userData } = storeToRefs(useAuthStore());
const { updateUserData } = useAuthStore();
const router = useRouter();
const toast = useToast();
const loading = ref(false);
const errorMessage = ref();

const updateUser = async (userData: {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}) => {
  loading.value = true;
  errorMessage.value = "";
  const response = await updateUserData({
    email: userData.email,
    lastName: userData.lastName,
    firstName: userData.firstName,
  });
  if (response?.error) {
    toast.add({
      title: "Error Occured",
      color: "red",
      description: "An error occured when updating!",
      timeout: 3000,
    });
    errorMessage.value = response.error.message;
  } else if (response?.data) {
    toast.add({
      title: "Success",
      color: "green",
      description: "Your profile has been updated successfully!",
      timeout: 3000,
    });
    router.push("/profile");
  }
  loading.value = false;
};
</script>

<template>
  <UContainer class="py-10 max-w-4xl">
    <EditProfileForm
      v-if="userData"
      class="bg-white"
      :user="userData"
      :loading="loading"
      :error-message="errorMessage"
      @update-profile="updateUser"
    />
  </UContainer>
</template>
