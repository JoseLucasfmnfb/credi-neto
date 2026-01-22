<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <header class="bg-white shadow">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-primary">Credi Neto</NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="user">
            <span class="text-gray-700">Olá, {{ user.email }}</span>
             <NuxtLink v-if="profile?.role === 'admin' || profile?.role === 'superadmin'" to="/admin/users" class="text-gray-600 hover:text-primary transition-colors">Admin Panel</NuxtLink>
            <button @click="logout" class="text-gray-600 hover:text-primary transition-colors">Sair</button>
          </template>
          <template v-else>
            <NuxtLink to="/" class="text-gray-600 hover:text-primary transition-colors">Login</NuxtLink>
            <NuxtLink to="/register" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Cadastrar</NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
        &copy; {{ new Date().getFullYear() }} Credi Neto. Todos os direitos reservados.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter() // Use router for redirection
const profile = ref(null)

// Function to fetch profile
const fetchProfile = async () => {
    if (!user.value) {
        profile.value = null
        return
    }
    const { data } = await client.from('profiles').select('role').eq('id', user.value.id).single()
    profile.value = data
}

// Watch user to re-fetch profile
watch(user, fetchProfile, { immediate: true })

const logout = async () => {
    await client.auth.signOut()
    router.push('/')
}
</script>
