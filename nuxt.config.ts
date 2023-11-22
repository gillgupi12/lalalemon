// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'E-commerical',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  devtools: { enabled: false },
  modules: ['@nuxtjs/supabase', '@nuxt/ui', 'nuxt-icon', '@pinia/nuxt'],
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/confirm',
      exclude: ['/auth/register'],
    }
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASEURL || '',
      supabaseKey: process.env.SUPABASEKEY || ''
    }
  },
  ui: {
    global: true,
  }
})
