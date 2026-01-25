<script setup lang="ts">
definePageMeta({ layout: 'auth' })

import { ref } from 'vue'

const supabase = useSupabaseClient()
const email = ref('')
const message = ref('')
const errorMessage = ref('')

async function sendReset() {
    message.value = ''
    errorMessage.value = ''

    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
        redirectTo: 'http://localhost:3000/reset-password'
    })

    if (error) {
        errorMessage.value = error.message
    } else {
        message.value = 'Email de recuperação enviado!'
    }
}
</script>

<template>
    <div class="space-y-6">
        <h1 class="text-2xl font-bold">Recuperar senha</h1>

        <input
            v-model="email"
            type="email"
            placeholder="Seu email"
            class="w-full p-2 border rounded"
        />

        <button
            @click="sendReset"
            class="w-full bg-[#D85A1A] text-white py-2 rounded
                   transition-all hover:bg-[#B94814]"
        >
            Enviar link
        </button>

        <p v-if="message" class="text-green-600 text-sm">{{ message }}</p>
        <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>
    </div>
</template>
