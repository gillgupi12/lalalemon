<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
const supabase = useSupabaseClient();
const router = useRouter();
const state = reactive({
  email: "",
  password: "",
});
const errorMessage = ref();
const toast = useToast();
const { userData } = storeToRefs(useAuthStore());
const { getAllColors } = useColorStore();
const { getAllCategories } = useCategoryStore();
const { fetchBasket } = useBasketStore();
const loading = ref(false);

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  loading.value = true;
  errorMessage.value = "";
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });
    if (data.user) {
      userData.value = data.user;
      toast.add({
        title: "Login success",
        description: "Welcome back!",
        timeout: 3000,
        color: "green",
      });

      await getAllColors();
      await getAllCategories();
      await fetchBasket();
      router.push("/");
    }
    if (error) throw error;
  } catch (error: any) {
    errorMessage.value = error.message;
    toast.add({
      title: "Login failed",
      description: errorMessage.value,
      timeout: 3000,
      color: "red",
    });
  }
  loading.value = false;
}
</script>

<template>
  <div class="px-8 py-4 space-y-4">
    <div class="text-2xl font-bold">Log into your lalalemon account</div>
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4 flex flex-col"
      @submit="onSubmit"
    >
      <UFormGroup label="Email Address*" name="email">
        <UInput v-model="state.email" size="xl" :disabled="loading" />
      </UFormGroup>

      <UFormGroup label="Password*" name="password">
        <UInput
          v-model="state.password"
          type="password"
          size="xl"
          :disabled="loading"
        />
      </UFormGroup>

      <p class="text-red-500">{{ errorMessage }}</p>
      <UButton
        type="submit"
        size="xl"
        color="black"
        :loading="loading"
        class="uppercase text-sm rounded py-2 disabled:bg-gray-400 max-w-fit"
      >
        Login
      </UButton>
    </UForm>
  </div>
</template>
