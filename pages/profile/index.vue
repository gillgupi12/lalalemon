<script setup>
import Card from "components/organisms/common/card.vue";
const router = useRouter();
</script>

<template>
  <UContainer class="grid grid-cols-2 gap-4 p-10">
    <Card>
      <div class="flex flex-row items-center justify-between">
        <div />
        <div class="text-center">Your Profile</div>
        <NuxtLink class="underline font-bold text-sm">Edit</NuxtLink>
      </div>
      <div>Name</div>
      <div>Email</div>
      <div>Phone</div>
    </Card>
    <Card>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row items-center justify-between">
          <div />
          <div class="text-center font-bold text-lg">Your Order History</div>
          <div />
        </div>
        <div class="text-xs text-center">
          Don't see your order? Please note it may take 5-10 minutes to appear.
          We appreciate your patience, thank you.
        </div>
        <UButton
          label="BEGIN SHOPPING"
          color="red"
          class="rounded-none w-full text-center flex items-center justify-center py-4"
          @click="router.push('/')"
        />
      </div>
    </Card>
    <Card>
      <div class="flex flex-row items-center justify-between">
        <div />
        <div class="text-center">Your Password</div>
        <NuxtLink class="underline font-bold text-sm">Edit</NuxtLink>
      </div>
      <div>Password</div>
      <div>********</div>
    </Card>

    <Card>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row items-center justify-between">
          <div />
          <div class="text-center">Your Wishlist</div>
          <div />
        </div>
        <div class="text-center text-xs">This list is empty.</div>
      </div>
    </Card>
    <Card>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row items-center justify-between">
          <div />
          <div class="text-center">Your Saved Addresses</div>
          <div />
        </div>
        <UButton
          class="py-4 rounded-none w-full flex itmes-center justify-center border-black border hover:bg-black hover:text-white outline-none"
          color="white"
          label="ADD NEW ADDRESS"
          @click="router.push({ name: 'profile-add-address' })"
        />
      </div>
    </Card>
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
  </UContainer>
</template>
