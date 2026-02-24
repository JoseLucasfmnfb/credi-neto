// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },

    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase'
    ],

    // Fallback vazio no build, será preenchido pelo NUXT_PUBLIC_SUPABASE_URL e afins em runtime
    runtimeConfig: {
        supabase: {
            serviceKey: '',
        },
        public: {
            supabase: {
                url: '',
                key: '',
            }
        }
    },

    supabase: {
        redirect: false
    },

    typescript: {
        strict: true
    },
})
