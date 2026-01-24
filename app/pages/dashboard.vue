<script setup lang="ts">
const supabase = useSupabaseClient()

async function logout() {
    await supabase.auth.signOut()
    await navigateTo('/')
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p>Você está logado com sucesso 🎉</p>

        <button
            @click="logout"
            class="bg-red-600 text-white px-4 py-2 rounded"
        >
            Sair
        </button>
    </div>
</template>