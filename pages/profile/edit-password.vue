<script setup lang="ts">
import EditPasswordForm from "components/organisms/forms/edit-password.vue";

const { userData } = storeToRefs(useAuthStore());
const { updateUserPassword } = useAuthStore();

const router = useRouter();
const toast = useToast();
const loading = ref(false);
const errorMessage = ref();

const updatePassword = async (userData: { password: string }) => {
  loading.value = true;
  errorMessage.value = "";
  const response = await updateUserPassword(userData.password);
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
      description: "Your password has been updated successfully!",
      timeout: 3000,
    });
    router.push("/profile");
  }
  loading.value = false;
};
</script>

<template>
  <UContainer class="py-10 max-w-4xl">
    <EditPasswordForm
      class="bg-white"
      :loading="loading"
      :error-message="errorMessage"
      @update-password="updatePassword"
    />
  </UContainer>
</template>
