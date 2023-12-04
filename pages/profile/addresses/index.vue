<script setup lang="ts">
import Card from "components/organisms/common/card.vue";

const router = useRouter();
const loading = ref(true);
const toast = useToast();

const { getUserAddresses, deleteAddress } = useAuthStore();
const { userAddresses } = storeToRefs(useAuthStore());
const handleGetUserAddress = async () => {
  loading.value = true;
  await getUserAddresses();
  loading.value = false;
};
onMounted(async () => {
  loading.value = true;
  await handleGetUserAddress();
  loading.value = false;
});

const handleDeleteAddress = async (addressId: string) => {
  const response = await deleteAddress(addressId);

  if (response?.error) {
    toast.add({
      title: "Error Occured",
      color: "red",
      description: "An error occured when deleting address!",
      timeout: 3000,
    });
  } else if (response?.status === 204) {
    toast.add({
      title: "Success",
      color: "green",
      description: "Address has been successfully deleted!",
      timeout: 3000,
    });
    router.push("/profile");
  }
};
const isOpen = ref(false);
const toggleModal = () => {
  isOpen.value = !isOpen.value;
};
</script>
<template>
  <div class="max-w-4xl mx-auto">
    <UContainer v-if="!loading" class="py-10">
      <Card>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row items-center justify-between">
            <div />
            <div class="text-center">{{ userAddresses[0]?.address_title }}</div>
            <NuxtLink
              v-if="userAddresses && userAddresses[0]"
              class="underline font-bold text-sm cursor-pointer"
              @click="
                () =>
                  router.push({
                    name: 'profile-addresses-addressId-edit',
                    params: { addressId: userAddresses[0]?.id },
                  })
              "
              >Edit</NuxtLink
            >
          </div>
          <div v-if="userAddresses && userAddresses[0]">
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
          <div></div>
          <UButton
            v-if="userAddresses && userAddresses[0]"
            class="py-4 rounded-none w-full flex itmes-center justify-center border-black border hover:bg-black hover:text-white outline-none"
            color="white"
            label="DELETE"
            @click="toggleModal"
          />
          <UButton
            class="py-4 rounded-none w-full flex itmes-center justify-center border-black border outline-none"
            color="red"
            label="ADD A NEW ADDRESS"
            @click="router.push({ name: 'profile-add-address' })"
          />
        </div>
      </Card>
    </UContainer>
    <div
      v-else
      class="py-40 flex items-center justify-center text-2xl font-bold"
    >
      LOADING...
    </div>

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800 ',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Remove Address
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="pb-4 font-bold text-center">
          Are you sure you want to remove this address?
        </div>
        <div class="flex flex-col gap-2">
          <UButton
            @click="handleDeleteAddress(userAddresses[0].id)"
            class="w-full flex items-center justify-center py-3 text-lg"
            label="Remove"
            color="red"
          />
          <UButton
            @click="toggleModal"
            label="Cancel"
            color="gray"
            variant="ghost"
            class="text-center flex items-center justify-center text-lg py-3"
          />
        </div>
      </UCard>
    </UModal>
  </div>
</template>
