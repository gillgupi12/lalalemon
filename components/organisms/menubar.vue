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
  {
    label: "Accessories",
    path: "/accessories",
  },
  // {
  //   label: "Community",
  //   path: "/community",
  // },
  // {
  //   label: "Find your Wellbeing",
  //   path: "/wellbeing",
  // },
];

const supabase = useSupabaseClient();
const logout = async () => {
  console.log("ok");
  const response = await supabase.auth.signOut();
  if (response.error) return;
  userData.value = null;
  router.push("/auth/login");
};
</script>

<template>
  <div
    class="md:flex flex-row text-black py-3 w-full shadow-sm hidden bg-white border-t border-b dark:bg-gray-50 dark:text-black px-4"
  >
    <div class="flex max-w-8xl container justify-between flex-row mx-auto">
      <div class="flex flex-row items-center space-x-8">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
        <div class="flex flex-row space-x-8 text-lg px-4">
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
      </div>
      <div class="flex flex-row items-center gap-4">
        <UPopover mode="hover" :popper="{ offsetDistance: 0 }">
          <NuxtLink :to="{ name: 'profile' }">
            <Icon
              name="teenyicons:user-circle-outline"
              class="hover:text-slate-500"
            />
          </NuxtLink>
          <template #panel>
            <div class="p-4">
              <div class="flex flex-col space-y-1">
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
                <NuxtLink
                  v-if="userData?.id"
                  :to="{ name: 'profile-wishlist' }"
                  class="hover:underline transition-all"
                >
                  Wishlist
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
          <Icon
            name="material-symbols:shopping-cart-outline"
            class="hover:text-slate-500"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
