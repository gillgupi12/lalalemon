<script setup lang="ts">
import LoginComponent from "components/organisms/auth/login.vue";
import RegisterComponent from "components/organisms/auth/register.vue";
import FooterCTA from "components/organisms/footer/cta.vue";

useHead({
  title: "Lalalemon | Login",
});

const items = [
  {
    key: "login",
    label: "Login",
    description: "Login and start shopping!",
  },
  {
    key: "create",
    label: "Create An Account",
    description: "Create An Account",
  },
];
</script>

<template>
  <div>
    <div class="py-20">
      <div
        class="md:grid md:grid-cols-2 md:p-8 bg-white shadow rounded container max-w-5xl mx-auto dark:bg-slate-700"
      >
        <div class="hidden md:flex md:border-r">
          <LoginComponent />
        </div>
        <div class="dark:text-white hidden md:flex">
          <RegisterComponent />
        </div>
        <UTabs :items="items" class="md:hidden">
          <template #item="{ item }">
            <div v-if="item.key === 'login'">
              <LoginComponent />
            </div>
            <div v-if="item.key === 'create'">
              <RegisterComponent />
            </div>
          </template>
        </UTabs>
      </div>
    </div>
    <div>
      <FooterCTA />
    </div>
  </div>
</template>
