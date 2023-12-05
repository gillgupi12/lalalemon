<script setup lang="ts">
import Logo from "./logo.vue";

const router = useRouter();
const { userData } = storeToRefs(useAuthStore());
const toolbarItems = [
  {
    label: "Women",
    path: "/women",
  },
  {
    label: "Men",
    path: "/men",
  },
];

const supabase = useSupabaseClient();

const logout = async () => {
  const response = await supabase.auth.signOut();
  if (response.error) return;
  userData.value = null;
  router.push("/auth/login");
};

const toggleMobile = ref(false);
const openMobileNav = () => {
  toggleMobile.value = !toggleMobile.value;
};

const items = [
  {
    label: "Men",

    defaultOpen: false,
    slot: "men",
  },
  {
    label: "Women",
    defaultOpen: false,
    slot: "women",
  },
];

const menItems = [
  {
    label: "What is New",
    path: "men-new",
  },
  {
    label: "Bestsellers",
    path: "men-best-sellers",
  },
  {
    label: "Pants",
    path: "men-pants",
  },
  {
    label: "Hoodies",
    path: "men-hoodies",
  },
  {
    label: "Jackets",
    path: "men-jackets",
  },
  {
    label: "Shorts",
    path: "men-shorts",
  },
];
const womenItems = [
  {
    label: "What is New",
    path: "women-new",
  },
  {
    label: "Bestsellers",
    path: "women-best-sellers",
  },
  {
    label: "Pants",
    path: "women-pants",
  },
  {
    label: "Hoodies",
    path: "women-hoodies",
  },
  {
    label: "Jackets",
    path: "women-jackets",
  },
  {
    label: "Accessories",
    path: "women-accessories",
  },
];

const handleLink = (link: string) => {
  router.push({ name: link });
  openMobileNav();
};

const { basket } = storeToRefs(useBasketStore());
const route = useRoute();
</script>

<template>
  <div
    class="flex flex-row items-center gap-2 text-black py-3 w-full shadow-sm bg-white border-t border-b dark:!bg-[#121212] dark:text-white px-4"
  >
    <div
      class="flex max-w-8xl container justify-between flex-row mx-auto w-full"
    >
      <div
        class="md:hidden cursor-pointer hover:text-red-500"
        @click="openMobileNav"
      >
        <Icon
          v-if="route.fullPath !== '/checkout'"
          name="prime:bars"
          size="28"
        />
      </div>
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>

      <div
        v-if="route.fullPath !== '/checkout'"
        class="hidden md:flex flex-row space-x-8 text-lg px-4"
      >
        <div v-for="(toolbarItem, index) in toolbarItems" :key="index">
          <NuxtLink
            :to="toolbarItem.path"
            class="uppercase text-sm font-bold hover:underline underline-offset-4 decoration-2 decoration-red-500 mb-2"
            active-class="underline decoration-2 decoration-red-500 mb-2 underline-offset-4"
          >
            {{ toolbarItem.label }}
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-row items-center gap-4">
        <UPopover
          v-if="route.fullPath !== '/checkout'"
          mode="hover"
          :popper="{ offsetDistance: 0 }"
        >
          <NuxtLink :to="{ name: 'profile' }">
            <Icon
              name="teenyicons:user-circle-outline"
              class="hover:text-slate-500"
            />
          </NuxtLink>
          <template #panel>
            <div class="p-4">
              <div class="flex flex-col space-y-1 dark:text-white">
                <NuxtLink
                  v-if="!userData?.id"
                  :to="{ name: 'auth-login' }"
                  class="hover:underline transition-all"
                >
                  Login
                </NuxtLink>
                <NuxtLink
                  v-if="userData?.id"
                  :to="{ name: 'profile' }"
                  class="hover:underline transition-all"
                >
                  Profile
                </NuxtLink>
                <p
                  v-if="userData?.id"
                  @click="logout()"
                  class="cursor-pointer hover:underline transition-all"
                >
                  Logout
                </p>

                <!-- <div>
                  <Icon
                    name="material-symbols:shopping-cart-outline"
                    class="hover:text-slate-500"
                  />
                </div> -->
              </div>
            </div>
          </template>
        </UPopover>

        <NuxtLink :to="{ name: 'basket' }">
          <div class="relative">
            <div
              v-if="basket?.total_quantity"
              class="absolute bg-red-500 text-white rounded-full border p-2 w-3 h-3 flex items-center justify-center text-xs -top-1 -right-2"
            >
              {{ basket.total_quantity }}
            </div>
            <Icon
              name="material-symbols:shopping-cart-outline"
              class="hover:text-slate-500"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
    <USlideover
      v-if="route.fullPath !== '/checkout'"
      v-model="toggleMobile"
      side="left"
    >
      <UCard
        class="flex flex-col flex-1 dark:!bg-[#121212]"
        :ui="{
          body: { base: 'flex-1 !p-0 dark:!bg-[#121212]' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex flex-row items-cneter justify-between">
            <Logo />
            <UButton
              :padded="false"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              @click="openMobileNav"
            />
          </div>
        </template>
        <UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full ' }">
          <template #default="{ item, index, open }">
            <UButton
              color="gray"
              variant="ghost"
              class="border border-gray-200 dark:border-gray-700"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-2' } }"
            >
              <span class="truncate p-2 capitalize text-lg">{{
                item.label
              }}</span>

              <template #trailing>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>

          <template #men>
            <div v-for="(men, i) in menItems" :key="i" class="px-4 py-2">
              <NuxtLink
                @click="() => handleLink(men.path)"
                class="cursor-pointer hover:text-black hover:underline hover:underline-offset-2 hover:decoration-red-500"
                >{{ men.label }}</NuxtLink
              >
            </div>
          </template>
          <template #women>
            <div v-for="(women, i) in womenItems" :key="i" class="px-4 py-2">
              <NuxtLink
                @click="() => handleLink(women.path)"
                class="cursor-pointer hover:text-black hover:underline hover:underline-offset-2 hover:decoration-red-500"
                >{{ women.label }}</NuxtLink
              >
            </div>
          </template>
        </UAccordion>
        <div class="p-4 flex flex-col space-y-1">
          <NuxtLink
            v-if="userData?.id"
            to="/auth/login"
            class="text-sm hover:text-black hover:underline hover:underline-offset-2 hover:decoration-red-500 dark:hover:text-white"
            >Login</NuxtLink
          >
        </div>
      </UCard>
    </USlideover>
  </div>
</template>
