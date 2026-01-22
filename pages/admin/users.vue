<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Gerenciar Usuários</h2>

    <!-- Create User Form (Optional, as users can sign up) -->
    <div class="bg-white p-6 rounded-lg shadow mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Cadastrar Novo Usuário</h3>
      <form @submit.prevent="createUser" class="flex gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="newUserEmail" type="email" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
        </div>
        <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Senha</label>
            <input v-model="newUserPassword" type="password" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
        </div>
        <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input v-model="newUserName" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
        </div>
        <button type="submit" :disabled="creating" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50 h-10">
            {{ creating ? 'Criando...' : 'Cadastrar' }}
        </button>
      </form>
      <p v-if="createMsg" :class="createError ? 'text-red-600' : 'text-green-600'" class="mt-2 text-sm">{{ createMsg }}</p>
    </div>

    <!-- User List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome / Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="profile in profiles" :key="profile.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ profile.full_name || 'Sem nome' }}</div>
              <div class="text-sm text-gray-500">{{ profile.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-purple-100 text-purple-800': profile.role === 'superadmin',
                  'bg-blue-100 text-blue-800': profile.role === 'admin',
                  'bg-green-100 text-green-800': profile.role === 'user'
                }">
                {{ profile.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button v-if="profile.role === 'user'" @click="updateRole(profile.id, 'admin')" class="text-indigo-600 hover:text-indigo-900 mr-4">Promover a Admin</button>
              <button v-if="profile.role === 'admin'" @click="updateRole(profile.id, 'user')" class="text-red-600 hover:text-red-900">Remover Admin</button>
              <span v-if="profile.role === 'superadmin'" class="text-gray-400 italic">Super Admin</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const client = useSupabaseClient()
const profiles = ref([])
const loading = ref(true)

// Create User State
const newUserEmail = ref('')
const newUserPassword = ref('')
const newUserName = ref('')
const creating = ref(false)
const createMsg = ref('')
const createError = ref(false)

const fetchProfiles = async () => {
    loading.value = true
    const { data } = await client.from('profiles').select('*').order('created_at', { ascending: false })
    profiles.value = data || []
    loading.value = false
}

const updateRole = async (userId, newRole) => {
    if (!confirm(`Tem certeza que deseja alterar o papel deste usuário para ${newRole}?`)) return

    const { error } = await client.from('profiles').update({ role: newRole }).eq('id', userId)
    if (error) {
        alert('Erro ao atualizar papel: ' + error.message)
    } else {
        await fetchProfiles()
    }
}

const createUser = async () => {
    creating.value = true
    createMsg.value = ''
    createError.value = false
    
    // Admin creates user. Note: supabase.auth.signUp logs in the user by default on client side!
    // To avoid logging out the admin, we should use a secondary client or Admin API if available.
    // However, JS client 'signUp' signs in. 'admin.createUser' requires service_role key (backend).
    // WORKAROUND: We can use a simple trick - but standard client side creation signs you in.
    // OPTION: We are just creating a user that CAN login later.
    // If I use client.auth.signUp, it overwrites the session. 
    // CORRECT APPROACH for client-side admin creation without logout is tricky without Edge Function.
    // I will use a simple explanation that user should register themselves OR use a backend function.
    // BUT user asked for "Admin ... cadastrar outros usuarios".
    
    // Let's try to use the `signUp` but we need to handle session restoration? No, that's messy.
    // Actually, `signUp` doesn't sign in if email confirmation is required?
    // Let's assume for this MVP we just tell instruction or we assume we have a way.
    // Wait, if I use `admin.auth.api.createUser` it works but needs service key.
    
    // Alternative: Just fail gracefully or warn user. 
    // "O Admin pode cadastrar". I will implement it assuming we might be able to do it or simpler: 
    // Just instruct them to register or I'll implement a Mock/Explanation.
    // OR: I can use a Nuxt server route that uses the Service Key to create the user! That's the correct way.
    
    // I'll create a server api route `/api/admin/create-user` that uses SUPABASE_SERVICE_KEY if present.
    // But I strictly avoided `.env` editing properly. 
    // I'll stick to client side and warn: "Nota: Ao criar usuário aqui, você será deslogado (Limitação do Supabase Client Side). Re-login necessário." 
    // OR better: I'll skip the "Create" form here if it's too complex for this scope and just say "User self-registration" 
    // user requirement: "Admin que pode cadastrar outros usuarios". This is explicit.
    // I will add the form, and use a server API route to do it securely without logging out.
    
    try {
        const { data, error } = await useFetch('/api/admin/create-user', {
            method: 'POST',
            body: {
                email: newUserEmail.value,
                password: newUserPassword.value,
                full_name: newUserName.value
            }
        })
        if (error.value) throw new Error(error.value.message)
        createMsg.value = 'Usuário criado com sucesso!'
        newUserEmail.value = ''
        newUserPassword.value = ''
        newUserName.value = ''
        await fetchProfiles()
    } catch (e: any) {
        createError.value = true
        createMsg.value = 'Erro: ' + e.message
    } finally {
        creating.value = false
    }
}

onMounted(fetchProfiles)
</script>
