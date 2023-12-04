<script setup lang="ts">
import Card from "components/organisms/common/card.vue";
import type { FormError, FormSubmitEvent } from "#ui/types";

defineProps({
  loading: { type: Boolean, required: true, default: false },
  errorMessage: { type: String, required: false, default: "" },
});
const router = useRouter();
const emits = defineEmits(["updatePassword"]);
const state = reactive({
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.password) errors.push({ path: "password", message: "Required" });

  return errors;
};

const onSubmit = async (event: FormSubmitEvent<any>) => {
  emits("updatePassword", state);
};
</script>

<template>
  <Card class="flex flex-col gap-8">
    <div>
      <div class="font-bold text-2xl">Edit Your Profile</div>
      <small>* indicates the field is required</small>
    </div>
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Password*" name="password">
        <UInput v-model="state.password" size="xl" type="password" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </UFormGroup>

      <UButton
        type="submit"
        color="black"
        :loading="loading"
        :disabled="loading"
        class="w-full flex items-center justify-center py-4 hover:bg-white hover:text-black border-black border rounded-none"
      >
        UPDATE
      </UButton>
      <UButton
        color="white"
        :disabled="loading"
        class="w-full flex items-center justify-center py-4 hover:bg-black hover:text-white border-black border rounded-none"
        @click="() => router.push('/profile')"
      >
        CANCEL
      </UButton>
    </UForm>
  </Card>
</template>
