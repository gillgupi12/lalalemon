<script setup>
import Card from "components/organisms/common/card.vue";
import AddressCard from "components/organisms/profile/address-card.vue";
import OrdersCard from "components/organisms/profile/orders-card.vue";
const router = useRouter();
useHead({
  title: "Profile | Lalalemon",
});

const { userData } = storeToRefs(useAuthStore());
</script>

<template>
  <UContainer class="flex pt-4 flex-col md:grid grid-cols-2 gap-4 md:p-10">
    <div class="flex flex-col gap-4">
      <Card>
        <div class="flex flex-row items-center justify-between">
          <div />
          <div class="text-center">Your Profile</div>
          <NuxtLink
            class="underline font-bold text-sm cursor-pointer"
            @click="() => router.push('/profile/edit-profile')"
            >Edit</NuxtLink
          >
        </div>
        <div class="font-light text-sm">
          Name
          <p class="font-semibold">
            {{ userData.user_metadata?.firstName }}
            {{ userData.user_metadata?.lastName }}
          </p>
        </div>
        <div class="font-light text-sm">
          Email
          <p class="font-semibold">{{ userData.email }}</p>
        </div>
        <div class="font-light text-sm">
          Phone
          <p class="font-semibold" v-if="userData.phone">
            +{{ userData.phone }}
          </p>
        </div>
      </Card>
      <Card>
        <div class="flex flex-row items-center justify-between">
          <div />
          <div class="text-center">Your Password</div>
          <NuxtLink
            class="underline font-bold text-sm cursor-pointer"
            @click="() => router.push('/profile/edit-password')"
            >Edit</NuxtLink
          >
        </div>
        <div>Password</div>
        <div>********</div>
      </Card>

      <AddressCard />
      <div />
      <Card>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row items-center justify-between">
            <div />
            <div class="text-center">Your Payment Methods</div>

            <div />
          </div>
          <UButton
            color="white"
            class="py-4 rounded-none w-full flex itmes-center justify-center border-black border hover:bg-black hover:text-white outline-none"
            label="ADD PAYMENT METHOD"
          />
        </div>
      </Card>
    </div>

    <div class="flex flex-col gap-4">
      <OrdersCard />
    </div>
  </UContainer>
</template>
