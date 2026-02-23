<script setup lang="ts">
definePageMeta({ layout: 'auth' })

import { ref } from 'vue'

const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function loginWithEmail() {
    loading.value = true
    errorMessage.value = ''

    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    loading.value = false

    if (error) {
        errorMessage.value = error.message
        return
    }

    await navigateTo('/home')
}

// Redireciona usuários já logados que caiam na home por e-mail confirmation (Magic Links/Signups)
const user = useSupabaseUser()
import { watchEffect } from 'vue'

watchEffect(() => {
    if (user.value) {
        navigateTo('/home')
    }
})
</script>

<template>
    <div class="space-y-6">

    <!-- LOGO + TÍTULO -->
        <div class="flex flex-col items-center space-y-3">
            <div class="w-24 h-24 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                <img src="/logo.jpg" alt="Logo" class="w-full h-full object-contain" />
            </div>

            <h1 class="text-3xl font-extrabold text-[#D85A1A]">CrediNeto</h1>
        </div>

        <form class="space-y-4" @submit.prevent="loginWithEmail">
            <div>
                <label class="block text-sm font-medium">Email</label>
                <input
                    v-model="email"
                    type="email"
                    required
                    class="w-full mt-1 p-2 border rounded
                           focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"
                />
            </div>

            <div>
                <label class="block text-sm font-medium">Senha</label>
                <PasswordInput v-model="password" />
            </div>

            <p v-if="errorMessage" class="text-red-600 text-sm">
                {{ errorMessage }}
            </p>

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-[#D85A1A] text-white py-2 rounded
                       transition-all duration-300 ease-in-out
                       hover:bg-[#B94814] disabled:opacity-50"
            >
                Entrar
            </button>
        </form>

        <!-- RECUPERAR SENHA -->
        <div class="text-center text-sm">
            <NuxtLink
                to="/forgot-password"
                class="text-[#D85A1A] hover:underline"
            >
                Esqueci minha senha
            </NuxtLink>
        </div>

        <!-- CADASTRO -->
        <div class="text-center text-sm">
            Ainda não tem conta?
            <NuxtLink to="/register" class="text-[#D85A1A] font-medium hover:underline">
                Criar conta
            </NuxtLink>
        </div>
    </div>
</template>
