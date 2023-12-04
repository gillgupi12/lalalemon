<script setup lang="ts">
import Card from "components/organisms/common/card.vue";
const router = useRouter();

const loading = ref(false);
const { getUserAddresses } = useAuthStore();
const { userAddresses } = storeToRefs(useAuthStore());
const handleGetUserAddress = async () => {
  loading.value = true;
  getUserAddresses();
  loading.value = false;
};
onMounted(async () => {
  await handleGetUserAddress();
});
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row items-center justify-between">
        <div />
        <div class="text-center">Your Saved Addresses</div>
        <NuxtLink
          class="underline font-bold text-sm cursor-pointer"
          @click="() => router.push('/profile/addresses')"
          >Edit</NuxtLink
        >
      </div>
      <div>
        <div v-if="userAddresses" class="text-sm">
          <div v-for="(address, i) in userAddresses?.slice(0, 1)" :key="i">
            <p>{{ address?.first_name }} {{ address?.last_name }}</p>
            <p>{{ address?.country_code }} {{ address?.phone }}</p>
            <p>{{ address?.address_line_1 }}</p>
            <p>{{ address?.address_line_2 }}</p>
            <p>{{ address?.district }}</p>
            <p>{{ address?.region }}</p>
            <p>{{ address?.country }}</p>
          </div>
        </div>
      </div>
      <UButton
        class="py-4 rounded-none w-full flex itmes-center justify-center border-black border hover:bg-black hover:text-white outline-none"
        color="white"
        label="ADD NEW ADDRESS"
        @click="router.push({ name: 'profile-add-address' })"
      />
    </div>
  </Card>
</template>
