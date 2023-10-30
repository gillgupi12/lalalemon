// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'E-commerical',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue', 'nuxt-icon'],
  css: [
    '@/assets/tailwind/main.css',
    'primeicons/primeicons.css',
  ],
  primevue: {
    usePrimeVue: true,
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    options: {
      ripple: true,
      unstyled: true,
    },
    components: {
      include: '*',
    },
    directives: {
      include: '*',
    },
    composables: {
      include: '*',
    },
  },
})
