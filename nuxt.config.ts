import { fileURLToPath } from "url";
export default defineNuxtConfig({
  app: {
    head: {
      title: "E-commerical",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/supabase",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-icon",
    "@pinia/nuxt",
    "vue3-carousel-nuxt",
  ],
  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/confirm",
      exclude: ["/auth/register"],
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASEURL || "",
      supabaseKey: process.env.SUPABASEKEY || "",
    },
  },
  ui: {
    global: true,
  },
  alias: {
    assets: fileURLToPath(new URL("./assets", import.meta.url)),
    components: fileURLToPath(new URL("./components", import.meta.url)),
    layouts: fileURLToPath(new URL("./layouts", import.meta.url)),
    store: fileURLToPath(new URL("./stores", import.meta.url)),
    data: fileURLToPath(new URL("./data", import.meta.url)),
  },
  colorMode: {
    preference: "light",
  },
});
