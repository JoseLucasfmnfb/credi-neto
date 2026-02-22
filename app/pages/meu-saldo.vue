<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Transaction } from '~/types'

const supabase = useSupabaseClient()
const toast = useToast()

const loading = ref(true)
const balance = ref<number | null>(null)
const transactions = ref<Transaction[]>([])

async function fetchSaldo() {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            toast.error('Usuário não autenticado.')
            return
        }

        console.log('USER LOGADO:', user.id)

        // Buscar saldo
        const { data: account, error: accountError } = await supabase
            .from('credit_accounts')
            .select('balance')
            .eq('user_id', user.id)
            .maybeSingle()

        if (accountError) {
            console.error('ERRO AO BUSCAR SALDO:', accountError)
            toast.error('Erro ao buscar saldo.')
        } else {
            balance.value = account?.balance ?? 0
        }

        // Buscar últimas transações
        const { data: txs, error: txError } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10)

        if (txError) {
            console.error('ERRO AO BUSCAR TRANSAÇÕES:', txError)
        } else {
            transactions.value = txs || []
        }

    } catch (err) {
        console.error('ERRO GERAL:', err)
        toast.error('Erro inesperado ao carregar dados.')
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSaldo()
})
</script>

<template>
    <div class="space-y-6">

        <!-- TÍTULO DA PÁGINA -->
        <div>
            <h2 class="text-2xl font-bold">
                Meu saldo
            </h2>
            <p class="text-gray-500">
                Consulte seu saldo atual e o histórico de movimentações
            </p>
        </div>

        <!-- LOADING -->
        <div v-if="loading" class="text-gray-500">
            Carregando informações...
        </div>

        <!-- CONTEÚDO PRINCIPAL -->
        <div v-else class="space-y-6">

            <!-- CARD SALDO -->
            <div
                class="p-6 rounded-lg shadow flex items-center justify-between"
                :class="{
                    'bg-green-100 text-green-800': balance !== null && balance >= 0,
                    'bg-red-100 text-red-800': balance !== null && balance < 0
                }"
            >
                <div>
                    <p class="text-sm opacity-70">Saldo atual</p>
                    <p class="text-3xl font-bold">
                        R$ {{ balance?.toFixed(2).replace('.', ',') }}
                    </p>
                </div>

                <div class="text-4xl">
                    💳
                </div>
            </div>

            <!-- HISTÓRICO -->
            <div class="bg-white rounded-lg shadow overflow-hidden">

                <div class="p-4 border-b">
                    <h3 class="font-semibold">
                        Últimas movimentações
                    </h3>
                </div>

                <table class="w-full text-sm">
                    <thead class="bg-gray-100 text-gray-600">
                        <tr>
                            <th class="px-4 py-2 text-left">Data</th>
                            <th class="px-4 py-2 text-left">Tipo</th>
                            <th class="px-4 py-2 text-left">Origem</th>
                            <th class="px-4 py-2 text-left">Descrição</th>
                            <th class="px-4 py-2 text-right">Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="tx in transactions"
                            :key="tx.id"
                            class="border-t hover:bg-gray-50"
                        >
                            <td class="px-4 py-2">
                                {{ new Date(tx.created_at).toLocaleDateString() }}
                            </td>

                            <td class="px-4 py-2 capitalize">
                                <span
                                    :class="{
                                        'text-green-600': tx.type === 'credito',
                                        'text-red-600': tx.type === 'debito',
                                        'text-yellow-600': tx.type === 'ajuste'
                                    }"
                                >
                                    {{ tx.type }}
                                </span>
                            </td>

                            <td class="px-4 py-2 capitalize">
                                {{ tx.origin }}
                            </td>

                            <td class="px-4 py-2">
                                {{ tx.description }}
                            </td>

                            <td class="px-4 py-2 text-right font-medium"
                                :class="{
                                    'text-green-600': tx.type === 'credito',
                                    'text-red-600': tx.type === 'debito'
                                }"
                            >
                                {{ tx.type === 'debito' ? '-' : '+' }} R$ {{ Number(tx.amount).toFixed(2).replace('.', ',') }}
                            </td>
                        </tr>

                        <tr v-if="transactions.length === 0">
                            <td colspan="5" class="text-center py-6 text-gray-500">
                                Nenhuma movimentação encontrada
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>

        </div>

    </div>
</template>
