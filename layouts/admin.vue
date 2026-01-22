<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div class="p-6 border-b border-gray-800">
        <h1 class="text-2xl font-bold text-primary">Admin Panel</h1>
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink to="/admin/users" class="block px-4 py-2 rounded hover:bg-gray-800 transition-colors" :class="{ 'bg-gray-800 text-primary': $route.path === '/admin/users' }">
          Gerenciar Usuários
        </NuxtLink>
        <NuxtLink to="/admin/credits" class="block px-4 py-2 rounded hover:bg-gray-800 transition-colors" :class="{ 'bg-gray-800 text-primary': $route.path === '/admin/credits' }">
          Gerenciar Créditos
        </NuxtLink>
        <NuxtLink to="/dashboard" class="block px-4 py-2 rounded hover:bg-gray-800 transition-colors mt-8 border-t border-gray-800 pt-4">
          Voltar para Dashboard
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-800">
        <button @click="logout" class="w-full text-left px-4 py-2 text-gray-400 hover:text-white transition-colors">
          Sair
        </button>
      </div>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  await client.auth.signOut()
  router.push('/')
}
</script>
