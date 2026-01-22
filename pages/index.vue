<template>
  <div class="flex items-center justify-center min-h-[80vh]">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-primary">
      <h1 class="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" id="email" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 border" placeholder="seu@email.com">
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input v-model="password" type="password" id="password" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 border" placeholder="********">
        </div>
        
        <div v-if="errorMsg" class="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
            {{ errorMsg }}
        </div>

        <button type="submit" :disabled="loading" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
          <span v-if="loading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Não tem uma conta? <NuxtLink to="/register" class="font-medium text-primary hover:text-opacity-80">Cadastre-se</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// Redirect if already logged in
watchEffect(() => {
  if (user.value) {
    router.push('/dashboard')
  }
})

const handleLogin = async () => {
    loading.value = true
    errorMsg.value = ''
    try {
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        if (error) throw error
        // Redirect handled by watchEffect
    } catch (e: any) {
        errorMsg.value = e.message
    } finally {
        loading.value = false
    }
}
</script>
