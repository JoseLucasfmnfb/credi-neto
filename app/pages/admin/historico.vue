<script setup lang="ts">
// Forced HMR update

import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const toast = useToast()

const transactions = ref<any[]>([])
const loading = ref(false)

async function fetchHistorico() {
    loading.value = true

    // JOIN com profiles duas vezes (uma para o cliente dono da conta, outra para o admin que executou)
    const { data, error } = await supabase
        .from('transactions')
        .select(`
            id, type, origin, amount, description, created_at, previous_balance, new_balance,
            user_id, performed_by,
            cliente:profiles!transactions_user_id_fkey(full_name, email),
            admin:profiles!transactions_performed_by_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(100)

    loading.value = false

    if (error) {
        console.error('Erro ao buscar histórico:', error)
        toast.error('Erro ao carregar o histórico de transações.')
        return
    }

    transactions.value = data || []
}

onMounted(() => {
    fetchHistorico()
})
</script>

<template>
    <div class="space-y-6 max-w-7xl">

        <!-- TÍTULO -->
        <div>
            <h1 class="text-2xl font-bold">Histórico Global da Loja</h1>
            <p class="text-gray-500">
                Acompanhe e audite todas as transações realizadas no sistema
            </p>
        </div>

        <!-- LOADING -->
        <p v-if="loading" class="text-gray-400 text-sm">
            Carregando transações...
        </p>

        <!-- TABELA -->
        <div v-if="!loading" class="bg-slate-800 rounded-xl shadow-lg overflow-x-auto">

            <table class="w-full text-sm min-w-max">
                <thead class="bg-slate-700 text-white">
                    <tr>
                        <th class="text-left px-4 py-3">Data</th>
                        <th class="text-left px-4 py-3">Cliente</th>
                        <th class="text-left px-4 py-3">Operação</th>
                        <th class="text-left px-4 py-3">Saldo Anterior</th>
                        <th class="text-left px-4 py-3">Valor Movimentado</th>
                        <th class="text-left px-4 py-3">Saldo Final</th>
                        <th class="text-left px-4 py-3">Executado por</th>
                        <th class="text-left px-4 py-3">Observação</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="tx in transactions"
                        :key="tx.id"
                        class="border-t border-slate-700 hover:bg-slate-700/50 transition text-gray-300"
                    >
                        <!-- DATA -->
                        <td class="px-4 py-3 whitespace-nowrap">
                            {{ new Date(tx.created_at).toLocaleString() }}
                        </td>

                        <!-- CLIENTE -->
                        <td class="px-4 py-3">
                            <span class="text-white font-medium">{{ tx.cliente?.full_name || '—' }}</span>
                        </td>

                        <!-- TIPO/ORIGEM -->
                        <td class="px-4 py-3">
                            <div class="flex flex-col">
                                <span class="capitalize font-semibold" :class="tx.type === 'debito' ? 'text-red-400' : 'text-green-400'">
                                    {{ tx.type }}
                                </span>
                                <span class="text-xs text-gray-400 uppercase tracking-widest mt-0.5">{{ tx.origin }}</span>
                            </div>
                        </td>

                        <!-- SALDO ANTERIOR -->
                        <td class="px-4 py-3">
                            R$ {{ Number(tx.previous_balance || 0).toFixed(2).replace('.', ',') }}
                        </td>

                        <!-- VALOR MOVIDO -->
                        <td class="px-4 py-3 font-bold" :class="tx.type === 'debito' ? 'text-red-400' : 'text-green-400'">
                            {{ tx.type === 'debito' ? '-' : '+' }} R$ {{ Number(tx.amount).toFixed(2).replace('.', ',') }}
                        </td>

                        <!-- NOVO SALDO -->
                        <td class="px-4 py-3 font-semibold text-blue-300">
                            R$ {{ Number(tx.new_balance || 0).toFixed(2).replace('.', ',') }}
                        </td>

                        <!-- QUEM FEZ -->
                        <td class="px-4 py-3 text-xs opacity-80">
                            {{ tx.admin?.full_name || 'Desconhecido' }}
                        </td>

                        <!-- OBSERVAÇÂO -->
                        <td class="px-4 py-3 text-sm max-w-xs truncate" :title="tx.description">
                            {{ tx.description }}
                        </td>
                    </tr>

                    <tr v-if="transactions.length === 0">
                        <td colspan="8" class="text-center text-gray-400 py-6">
                            Nenhuma transação encontrada.
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
