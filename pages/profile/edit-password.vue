<script setup lang="ts">
import EditPasswordForm from "components/organisms/forms/edit-password.vue";

const { userData } = storeToRefs(useAuthStore());
const { updateUserPassword } = useAuthStore();
const supabase = useSupabaseClient();
const router = useRouter();
const toast = useToast();

const phone = ref("");
const token = ref();

const verifyPhoneNumber = ref(false);

const updatePassword = async (userData: { password: string }) => {
  const response = await updateUserPassword(userData.password);
  if (response?.error) {
    toast.add({
      title: "Error Occured",
      color: "red",
      description: "An error occured when updating!",
      timeout: 3000,
    });
  } else if (response?.data) {
    toast.add({
      title: "Success",
      color: "green",
      description: "Your password has been updated successfully!",
      timeout: 3000,
    });
    router.push("/profile");
  }
};
</script>

<template>
  <UContainer class="py-10 max-w-4xl">
    <EditPasswordForm
      v-if="userData"
      class="bg-white"
      :user="userData"
      @update-password="updatePassword"
    />
  </UContainer>
</template>
