<script setup lang="ts">
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { fullName } = useUserRole()

const balance = ref<number | null>(null)
const loading = ref(true)

async function fetchBalance() {
    if (!user.value) return

    // Extração segura do ID (fallback)
    const userId = user.value.id || (user.value as any).user?.id || (user.value as any).sub
    if (!userId) return

    loading.value = true

    const { data, error } = await supabase
        .from('credit_accounts')
        .select('balance')
        .eq('user_id', userId)
        .single()

    if (!error && data) {
        balance.value = data.balance
    }

    loading.value = false
}

onMounted(() => {
    fetchBalance()
})
</script>

<template>
    <div class="space-y-6 max-w-5xl">
        <div>
            <h1 class="text-2xl font-bold">Resumo da Conta</h1>
            <p class="text-gray-500">
                Acompanhe o seu saldo e histórico de movimentações.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- CARD DE SALDO -->
            <div class="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 relative overflow-hidden">
                <!-- Detalhe decorativo -->
                <div
                    class="absolute top-0 right-0 w-32 h-32 bg-[#D85A1A]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none">
                </div>

                <h3 class="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Saldo Atual</h3>

                <div v-if="loading" class="animate-pulse flex space-x-4 mt-2 mb-4">
                    <div class="h-10 w-32 bg-slate-700/50 rounded"></div>
                </div>

                <div v-else class="flex items-baseline space-x-2 mt-2 mb-4">
                    <span class="text-lg font-medium text-slate-400">R$</span>
                    <span class="text-4xl font-extrabold"
                        :class="(balance || 0) < 0 ? 'text-red-400' : 'text-green-400'">
                        {{ (balance || 0).toFixed(2).replace('.', ',') }}
                    </span>
                </div>

                <p class="text-sm text-slate-500 mb-6">
                    Mantenha seu saldo positivo para continuar jogando.
                </p>

                <div class="flex space-x-3">
                    <NuxtLink to="/meu-saldo"
                        class="bg-[#D85A1A] hover:bg-[#B94814] text-white px-4 py-2 rounded font-medium transition-colors text-sm">
                        Ver histórico detalhado
                    </NuxtLink>
                </div>
            </div>

            <!-- CARD INFORMATIVO -->
            <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 class="text-slate-200 font-medium text-lg mb-3">Como funcionam os créditos?</h3>
                <ul class="space-y-3 text-slate-400 text-sm">
                    <li class="flex items-start">
                        <span class="text-[#D85A1A] mr-2 mt-0.5">•</span>
                        <span>Seu saldo é utilizado para compras de produtos e não pode ser usado para inscrições em
                            torneios.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-[#D85A1A] mr-2 mt-0.5">•</span>
                        <span>As adições e descontos são feitos diretamente no balcão da loja.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-[#D85A1A] mr-2 mt-0.5">•</span>
                        <span>Você pode visualizar o seu saldo e o historico pelo sistema.</span>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>