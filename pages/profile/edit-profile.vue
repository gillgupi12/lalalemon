<script setup lang="ts">
import EditProfileForm from "components/organisms/forms/edit-profile.vue";
import { routerKey } from "vue-router";

const { userData } = storeToRefs(useAuthStore());
const { updateUserData } = useAuthStore();
const supabase = useSupabaseClient();
const router = useRouter();
const toast = useToast();

const phone = ref("");
const token = ref();

const verifyPhoneNumber = ref(false);

const updateUser = async (userData: {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}) => {
  phone.value = userData.phone;
  const response = await updateUserData({
    // phone: userData.phone,
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
  } else if (response?.data) {
    toast.add({
      title: "Success",
      color: "green",
      description: "Your profile has been updated successfully!",
      timeout: 3000,
    });
    router.push("/profile");
  }
};

// const optinput = ref();
// const verifyPhone = async () => {
//   const response = await supabase.auth.verifyOtp({
//     phone: phone.value,
//     type: "phone_change",
//     token: token.value,
//   });
//   if (response.data.user?.phone) {
//     router.push("/profile");
//   }
//   console.log(response);
// };
</script>

<template>
  <UContainer class="py-10 max-w-4xl">
    <EditProfileForm
      v-if="userData"
      class="bg-white"
      :user="userData"
      @update-profile="updateUser"
    />
    <!-- <UModal v-model="verifyPhoneNumber">
      <div class="p-4">
        <label for="phone">Phone</label>
        <UInput v-model="phone" />
        <label for="phone">OTP CODE</label>
        <UInput v-model="token" />
        <UButton @click="verifyPhone" label="Verify" />
      </div>
    </UModal> -->
  </UContainer>
</template>
