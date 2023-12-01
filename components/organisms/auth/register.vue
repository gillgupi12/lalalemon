<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
const supabase = useSupabaseClient();
const router = useRouter();
const state = reactive({
  email: "",
  password: "",
});
const errorMessage = ref();
const successMessage = ref();
const toast = useToast();

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  errorMessage.value = "";
  try {
    const { error, data } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
    });

    if (data.user) {
      successMessage.value = "Check your email to confirm your account.";
      toast.add({
        title: "Account created",
        description: "Check your email to confirm your account!",
        timeout: 3000,
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
    if (error) throw error;
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}

const showRegisterForm = ref(false);
const openRegisterForm = () => {
  showRegisterForm.value = !showRegisterForm.value;
};
</script>

<template>
  <div
    class="flex flex-col space-y-4 px-8 py-4 dark:!text-white dark:bg-slate-700"
  >
    <div class="flex flex-col pb-4">
      <div class="text-2xl flex flex-col space-y-6">
        <p class="font-bold">Don't have a lalalemon account?</p>
        <p class="font-normal">Sign up to get these perks and more:</p>
        <div class="">
          <ul class="text-sm flex flex-col space-y-2">
            <li class="flex flex-row items-center gap-1">
              <icon name="ph:clock-countdown-light" size="20"></icon>
              <p>Check out faster</p>
            </li>
            <li class="flex flex-row items-center gap-1">
              <icon name="system-uicons:location" size="20"></icon>
              <p>Easily Track Orders</p>
            </li>
            <li class="flex flex-row items-center gap-1">
              <icon name="ph:shopping-cart" size="20"></icon>
              <p>View Order History</p>
            </li>
            <li class="flex flex-row items-center gap-1">
              <icon name="ph:heart" size="20"></icon>
              <p>Saved wishlist</p>
            </li>
          </ul>
        </div>
        <UButton
          v-if="!showRegisterForm"
          color="black"
          class="max-w-fit uppercase text-sm p-4 font-semibold"
          size="xl"
          @click="openRegisterForm"
          >Create An Account</UButton
        >
      </div>
    </div>
    <div class="border" v-if="showRegisterForm"></div>
    <div v-if="showRegisterForm">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup v-slot="{ error }" label="Email Address*" name="email">
          <UInput
            v-model="state.email"
            size="xl"
            :trailing-icon="
              error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined
            "
          />
        </UFormGroup>

        <UFormGroup v-slot="{ error }" label="Password*" name="password">
          <UInput
            v-model="state.password"
            type="password"
            size="xl"
            :trailing-icon="
              error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined
            "
          />
        </UFormGroup>
        <p class="text-red-500">{{ errorMessage }}</p>

        <UButton
          type="submit"
          size="xl"
          class="uppercase text-sm rounded-sm disabled:bg-gray-400"
          color="red"
        >
          Create Account
        </UButton>
      </UForm>
    </div>
  </div>
</template>
