<script setup lang="ts">
definePageMeta({ layout: 'auth' })

import { ref } from 'vue'

const supabase = useSupabaseClient()
const password = ref('')
const message = ref('')
const errorMessage = ref('')

async function updatePassword() {
    const { error } = await supabase.auth.updateUser({
        password: password.value
    })

    if (error) {
        errorMessage.value = error.message
    } else {
        message.value = 'Senha atualizada com sucesso!'
        setTimeout(() => navigateTo('/'), 2000)
    }
}
</script>

<template>
    <div class="space-y-6">
        <h1 class="text-2xl font-bold">Nova senha</h1>

        <PasswordInput v-model="password" />

        <button
            @click="updatePassword"
            class="w-full bg-[#D85A1A] text-white py-2 rounded
                   transition-all hover:bg-[#B94814]"
        >
            Atualizar senha
        </button>

        <p v-if="message" class="text-green-600 text-sm">{{ message }}</p>
        <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>
    </div>
</template>
