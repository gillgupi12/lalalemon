<script setup lang="ts">
import Card from "components/organisms/common/card.vue";
import type { FormError, FormSubmitEvent } from "#ui/types";

const router = useRouter();
const props = defineProps({
  user: { type: Object as PropType<User>, required: true },
});

const emits = defineEmits(["updateProfile"]);
const state = reactive({
  email: props.user.email,
  firstName: props.user.user_metadata?.firstName ?? undefined,
  lastName: props.user.user_metadata?.lastName ?? undefined,
  //   phone: props.user.phone,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });

  return errors;
};

const onSubmit = async (event: FormSubmitEvent<any>) => {
  emits("updateProfile", state);
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
      <UFormGroup label="Email*" name="email">
        <UInput v-model="state.email" size="xl" />
      </UFormGroup>

      <UFormGroup label="First Name" name="firstName">
        <UInput v-model="state.firstName" size="xl" />
      </UFormGroup>
      <UFormGroup label="Last Name" name="lastName">
        <UInput v-model="state.lastName" size="xl" />
      </UFormGroup>
      <!-- <UFormGroup label="Phone" name="phone" class="w-full">
        <UInput v-model="state.phone" size="xl" />
        <small class="text-gray-400">22345678</small>
      </UFormGroup> -->

      <UButton
        type="submit"
        color="black"
        class="w-full flex items-center justify-center py-4 hover:bg-white hover:text-black border-black border rounded-none"
      >
        SAVE
      </UButton>
      <UButton
        color="white"
        class="w-full flex items-center justify-center py-4 hover:bg-black hover:text-white border-black border rounded-none"
        @click="() => router.push('/profile')"
      >
        CANCEL
      </UButton>
    </UForm>
  </Card>
</template>
