import { config } from 'dotenv'
config({ path: '.env' })   // 👈 força carregar o arquivo .env

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  hooks: {
    'ready'() {
      console.log('TESTE SUPABASE_URL:', process.env.SUPABASE_URL)
      console.log('TESTE SUPABASE_KEY:', process.env.SUPABASE_KEY)
    }
  },

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss'
  ],

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/register']
    }
  }
})
