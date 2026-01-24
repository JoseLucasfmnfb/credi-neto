<script setup lang="ts">
definePageMeta({
    layout: 'auth'
})

import { ref } from 'vue'

const supabase = useSupabaseClient()


const email = ref('')
const password = ref('')
const fullName = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function register() {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            data: {
                full_name: fullName.value
            }
        }
    })

    loading.value = false

    if (error) {
        errorMessage.value = error.message
        return
    }

    successMessage.value = 'Cadastro realizado! Verifique seu email para confirmar a conta.'
}
</script>

<template>
    <div class="space-y-6">

        <!-- LOGO + TÍTULO -->
        <div class="flex flex-col items-center space-y-3">
            <div class="w-24 h-24 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                <img src="/logo.jpg" alt="Logo" class="w-full h-full object-contain" />
            </div>

            <h1 class="text-3xl font-extrabold text-[#D85A1A]">CrediNeto</h1>
            <p class="text-sm text-gray-500">Criar nova conta</p>
        </div>

        <!-- FORM CADASTRO -->
        <form class="space-y-4" @submit.prevent="register">
            <div>
                <label class="block text-sm font-medium">Nome completo</label>
                <input
                    v-model="fullName"
                    type="text"
                    required
                    class="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"
                />
            </div>

            <div>
                <label class="block text-sm font-medium">Email</label>
                <input
                    v-model="email"
                    type="email"
                    required
                    class="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"
                />
            </div>

            <div>
                <label class="block text-sm font-medium">Senha</label>
                <input
                    v-model="password"
                    type="password"
                    required
                    class="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"
                />
            </div>

            <p v-if="errorMessage" class="text-red-600 text-sm">
                {{ errorMessage }}
            </p>

            <p v-if="successMessage" class="text-green-600 text-sm">
                {{ successMessage }}
            </p>

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-[#D85A1A] text-white py-2 rounded
                       transition-all duration-300 ease-in-out
                       hover:bg-[#B94814] hover:shadow-lg disabled:opacity-50"
            >
                Criar conta
            </button>
        </form>

        <p class="text-sm text-center">
            Já tem conta?
            <NuxtLink to="/" class="text-[#D85A1A] font-medium hover:underline">
                Entrar
            </NuxtLink>
        </p>
    </div>
</template>