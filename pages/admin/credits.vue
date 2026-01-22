<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Gerenciar Créditos</h2>

    <div class="bg-white p-6 rounded-lg shadow max-w-2xl">
      <form @submit.prevent="addTransaction" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Selecione o Usuário</label>
          <select v-model="selectedUser" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 border">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.full_name }} ({{ user.email }})
            </option>
          </select>
        </div>

        <div>
           <label class="block text-sm font-medium text-gray-700">Tipo de Operação</label>
           <div class="mt-2 flex space-x-4">
               <label class="inline-flex items-center">
                   <input type="radio" v-model="operationType" value="add" class="form-radio text-primary focus:ring-primary h-4 w-4">
                   <span class="ml-2">Adicionar Créditos</span>
               </label>
               <label class="inline-flex items-center">
                   <input type="radio" v-model="operationType" value="remove" class="form-radio text-red-600 focus:ring-red-600 h-4 w-4">
                   <span class="ml-2">Remover Créditos</span>
               </label>
           </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Valor</label>
          <input v-model.number="amount" type="number" min="1" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 border">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Descrição / Observação</label>
          <textarea v-model="description" required rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 border"></textarea>
        </div>

        <div v-if="msg" :class="isError ? 'text-red-600' : 'text-green-600'" class="text-sm text-center bg-gray-50 p-2 rounded">
            {{ msg }}
        </div>

        <button type="submit" :disabled="submitting" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
          <span v-if="submitting">Processando...</span>
          <span v-else>Confirmar Transação</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const users = ref([])
const selectedUser = ref('')
const amount = ref(0)
const description = ref('')
const operationType = ref('add') // 'add' or 'remove'
const submitting = ref(false)
const msg = ref('')
const isError = ref(false)

onMounted(async () => {
    // Fetch all users to populate select
    const { data } = await client.from('profiles').select('id, full_name, email')
    users.value = data || []
})

const addTransaction = async () => {
    submitting.value = true
    msg.value = ''
    isError.value = false

    try {
        const finalAmount = operationType.value === 'add' ? amount.value : -Math.abs(amount.value)
        
        const { error } = await client.from('transactions').insert({
            user_id: selectedUser.value,
            amount: finalAmount,
            description: description.value,
            performed_by: user.value.id
        })

        if (error) throw error

        msg.value = 'Transação realizada com sucesso!'
        amount.value = 0
        description.value = ''
        selectedUser.value = ''
    } catch (e: any) {
        isError.value = true
        msg.value = 'Erro: ' + e.message
    } finally {
        submitting.value = false
    }
}
</script>
