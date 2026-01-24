<script setup lang="ts">
const supabase = useSupabaseClient()

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        await navigateTo('/home')
    } else {
        await navigateTo('/')
    }
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <p>Confirmando login...</p>
    </div>
</template>
