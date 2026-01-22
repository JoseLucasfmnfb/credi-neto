<template>
  <div class="flex items-center justify-center min-h-[80vh]">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-primary">
      <h1 class="text-3xl font-bold text-gray-900 mb-6 text-center">Cadastro</h1>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input v-model="fullName" type="text" id="name" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 border" placeholder="Seu Nome">
        </div>
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
        <div v-if="successMsg" class="text-green-600 text-sm text-center bg-green-50 p-2 rounded">
            {{ successMsg }}
        </div>

        <button type="submit" :disabled="loading" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
          <span v-if="loading">Cadastrando...</span>
          <span v-else>Cadastrar</span>
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Já tem uma conta? <NuxtLink to="/" class="font-medium text-primary hover:text-opacity-80">Entrar</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

// Redirect if already logged in
watchEffect(() => {
  if (user.value) {
    router.push('/dashboard')
  }
})

const handleRegister = async () => {
    loading.value = true
    errorMsg.value = ''
    successMsg.value = ''
    try {
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    full_name: fullName.value
                }
            }
        })
        if (error) throw error
        successMsg.value = 'Cadastro realizado com sucesso! Verifique seu email ou faça login.'
        
        // Optional: Auto login if email confirmation is disabled or immediate
        // But usually requires email verification.
        
        // If session exists immediately (email confirm disabled), router will handle redirect
    } catch (e: any) {
        errorMsg.value = e.message
    } finally {
        loading.value = false
    }
}
</script>
