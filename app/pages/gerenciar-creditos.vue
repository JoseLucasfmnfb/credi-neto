<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const supabase = useSupabaseClient()

const users = ref<any[]>([])
const selectedUser = ref<string>('')
const saldoAtual = ref<number | null>(null)

const tipo = ref<'credito' | 'debito' | 'ajuste'>('credito')
const origem = ref<'torneio' | 'compra' | 'manual'>('manual')
const valor = ref<number | null>(null)
const descricao = ref('')

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Buscar usuários (somente clientes)
async function fetchUsers() {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role')
        .eq('role', 'cliente')
        .order('full_name')

    if (!error) users.value = data || []
}

// Buscar saldo do usuário selecionado
async function fetchSaldo() {
    saldoAtual.value = null
    if (!selectedUser.value) return

    const { data, error } = await supabase
        .from('credit_accounts')
        .select('balance')
        .eq('user_id', selectedUser.value)
        .single()

    if (!error && data) saldoAtual.value = data.balance
}

// Enviar crédito / débito
async function submitMovimentacao() {
    errorMessage.value = ''
    successMessage.value = ''

    if (!selectedUser.value) {
        errorMessage.value = 'Selecione um usuário.'
        return
    }

    if (!valor.value || valor.value <= 0) {
        errorMessage.value = 'Informe um valor válido.'
        return
    }

    if (!descricao.value.trim()) {
        errorMessage.value = 'A observação é obrigatória.'
        return
    }

    if (tipo.value === 'debito' && saldoAtual.value !== null && valor.value > saldoAtual.value) {
        errorMessage.value = 'Saldo insuficiente para realizar o débito.'
        return
    }

    loading.value = true

    const user = (await supabase.auth.getUser()).data.user

    const amount = tipo.value === 'debito' ? -Math.abs(valor.value) : Math.abs(valor.value)

    // Inserir transação
    const { error: insertError } = await supabase
        .from('transactions')
        .insert({
            user_id: selectedUser.value,
            type: tipo.value,
            origin: origem.value,
            amount: Math.abs(valor.value),
            description: descricao.value,
            performed_by: user?.id
        })

    if (insertError) {
        errorMessage.value = insertError.message
        loading.value = false
        return
    }

    // Atualizar saldo
    const novoSaldo = (saldoAtual.value || 0) + amount

    const { error: updateError } = await supabase
        .from('credit_accounts')
        .update({ balance: novoSaldo })
        .eq('user_id', selectedUser.value)

    if (updateError) {
        errorMessage.value = updateError.message
        loading.value = false
        return
    }

    successMessage.value = 'Movimentação registrada com sucesso!'
    valor.value = null
    descricao.value = ''
    await fetchSaldo()

    loading.value = false
}

onMounted(() => {
    fetchUsers()
})
</script>

<template>
    <div class="space-y-6">
        <div>
            <h1 class="text-2xl font-bold">Gerenciar créditos</h1>
            <p class="text-gray-500">Adicione ou remova créditos dos clientes</p>
        </div>

        <!-- FORMULÁRIO -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4 max-w-xl">

            <div>
                <label class="block text-sm font-medium">Cliente</label>
                <select
                    v-model="selectedUser"
                    @change="fetchSaldo"
                    class="w-full mt-1 p-2 border rounded"
                >
                    <option value="">Selecione um cliente</option>
                    <option v-for="u in users" :key="u.id" :value="u.id">
                        {{ u.full_name }} ({{ u.email }})
                    </option>
                </select>
            </div>

            <div v-if="saldoAtual !== null" class="p-3 rounded bg-gray-100 dark:bg-gray-700">
                <span class="text-sm">Saldo atual:</span>
                <strong class="ml-2 text-lg">R$ {{ saldoAtual.toFixed(2) }}</strong>
            </div>

            <div class="grid grid-cols-3 gap-3">
                <div>
                    <label class="block text-sm">Tipo</label>
                    <select v-model="tipo" class="w-full mt-1 p-2 border rounded">
                        <option value="credito">Crédito</option>
                        <option value="debito">Débito</option>
                        <option value="ajuste">Ajuste</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm">Origem</label>
                    <select v-model="origem" class="w-full mt-1 p-2 border rounded">
                        <option value="manual">Manual</option>
                        <option value="torneio">Torneio</option>
                        <option value="compra">Compra</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm">Valor</label>
                    <input
                        v-model.number="valor"
                        type="number"
                        step="0.01"
                        class="w-full mt-1 p-2 border rounded"
                    />
                </div>
            </div>

            <div>
                <label class="block text-sm">Observação</label>
                <textarea
                    v-model="descricao"
                    rows="3"
                    class="w-full mt-1 p-2 border rounded"
                ></textarea>
            </div>

            <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</p>

            <button
                @click="submitMovimentacao"
                :disabled="loading"
                class="bg-[#D85A1A] hover:bg-[#B94814] text-white px-6 py-2 rounded transition"
            >
                Confirmar movimentação
            </button>
        </div>
    </div>
</template>