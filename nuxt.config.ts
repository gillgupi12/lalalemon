// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'E-commerical',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  devtools: { enabled: false },
  modules: ['@nuxtjs/supabase', '@nuxt/image', '@nuxt/ui', 'nuxt-icon', '@pinia/nuxt'],
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
  },
})
