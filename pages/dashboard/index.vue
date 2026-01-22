<template>
  <div class="space-y-6">
    <div class="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center border-t-4 border-primary">
      <h2 class="text-lg font-medium text-gray-500">Seus Créditos</h2>
      <p class="text-5xl font-bold text-gray-900 mt-2">{{ totalCredits }}</p>
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Histórico de Transações</h3>
      <div v-if="loading" class="text-center py-4 text-gray-500">Carregando...</div>
      <div v-else-if="transactions.length === 0" class="text-center py-4 text-gray-500">Nenhuma transação encontrada.</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="t in transactions" :key="t.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(t.created_at) }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ t.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium" :class="t.amount >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ t.amount > 0 ? '+' : '' }}{{ t.amount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const client = useSupabaseClient()
const transactions = ref([])
const loading = ref(true)

const totalCredits = computed(() => {
    return transactions.value.reduce((sum, t) => sum + t.amount, 0)
})

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

onMounted(async () => {
    loading.value = true
    try {
        const { data, error } = await client
            .from('transactions')
            .select('*')
            .eq('user_id', user.value.id)
            .order('created_at', { ascending: false })
        
        if (error) throw error
        transactions.value = data
    } catch (e) {
        console.error('Error fetching transactions:', e)
    } finally {
        loading.value = false
    }
})
</script>
