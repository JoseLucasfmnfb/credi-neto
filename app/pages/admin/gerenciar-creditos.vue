<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const clientes = ref<any[]>([])
const clienteSelecionado = ref('')
const tipo = ref('credito')
const origem = ref('manual')
const valor = ref('')
const observacao = ref('')

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

/* =========================
   CARREGAR CLIENTES
========================= */
async function carregarClientes() {
    if (!user.value) return

    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'cliente')
        .order('full_name')

    if (error) {
        console.error('Erro ao buscar clientes:', error)
        errorMessage.value = 'Erro ao carregar clientes.'
        return
    }

    clientes.value = data || []
}

/* =========================
   CONFIRMAR MOVIMENTAÇÃO
========================= */
async function confirmarMovimentacao() {
    errorMessage.value = ''
    successMessage.value = ''

    if (!clienteSelecionado.value || !valor.value) {
        errorMessage.value = 'Selecione um cliente e informe um valor.'
        return
    }

    const valorNumerico = Number(valor.value)

    if (valorNumerico <= 0) {
        errorMessage.value = 'O valor deve ser maior que zero.'
        return
    }

    if (!user.value) {
        errorMessage.value = 'Usuário não autenticado.'
        return
    }

    loading.value = true

    try {
        /* Inserir transação */
        const { error: erroTransacao } = await supabase
            .from('transactions')
            .insert({
                user_id: clienteSelecionado.value,
                type: tipo.value,
                origin: origem.value,
                amount: valorNumerico,
                description: observacao.value || 'Movimentação manual',
                performed_by: user.value.id
            })

        if (erroTransacao) throw erroTransacao

        /* Atualizar saldo */
        const { data: conta, error: erroConta } = await supabase
            .from('credit_accounts')
            .select('balance')
            .eq('user_id', clienteSelecionado.value)
            .single()

        if (erroConta) throw erroConta

        let novoSaldo = conta.balance

        if (tipo.value === 'credito') {
            novoSaldo += valorNumerico
        } else {
            novoSaldo -= valorNumerico
        }

        const { error: erroUpdate } = await supabase
            .from('credit_accounts')
            .update({ balance: novoSaldo })
            .eq('user_id', clienteSelecionado.value)

        if (erroUpdate) throw erroUpdate

        successMessage.value = 'Movimentação realizada com sucesso!'

        // Limpar formulário
        clienteSelecionado.value = ''
        valor.value = ''
        observacao.value = ''
        tipo.value = 'credito'
        origem.value = 'manual'
    } catch (err: any) {
        console.error(err)
        errorMessage.value = 'Erro ao realizar movimentação.'
    } finally {
        loading.value = false
    }
}

/* =========================
   ON MOUNT
========================= */
onMounted(() => {
    carregarClientes()
})
</script>

<template>
    <div class="max-w-3xl space-y-6">

        <!-- TÍTULO -->
        <div>
            <h1 class="text-2xl font-bold">Gerenciar créditos</h1>
            <p class="text-gray-500">
                Adicione ou remova créditos dos clientes
            </p>
        </div>

        <!-- CARD FORMULÁRIO -->
        <div class="bg-slate-800 rounded-xl shadow-lg p-6 space-y-5">

            <!-- CLIENTE -->
            <div>
                <label class="block text-sm font-medium text-white mb-1">
                    Cliente
                </label>

                <select
                    v-model="clienteSelecionado"
                    class="form-input"
                >
                    <option value="" disabled>Selecione um cliente</option>
                    <option
                        v-for="cliente in clientes"
                        :key="cliente.id"
                        :value="cliente.id"
                    >
                        {{ cliente.full_name }} ({{ cliente.email }})
                    </option>
                </select>
            </div>

            <!-- LINHA TIPO / ORIGEM / VALOR -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                <!-- TIPO -->
                <div>
                    <label class="block text-sm font-medium text-white mb-1">
                        Tipo
                    </label>

                    <select v-model="tipo" class="form-input">
                        <option value="credito">Crédito</option>
                        <option value="debito">Débito</option>
                    </select>
                </div>

                <!-- ORIGEM -->
                <div>
                    <label class="block text-sm font-medium text-white mb-1">
                        Origem
                    </label>

                    <select v-model="origem" class="form-input">
                        <option value="manual">Manual</option>
                        <option value="compra">Compra</option>
                        <option value="torneio">Torneio</option>
                    </select>
                </div>

                <!-- VALOR -->
                <div>
                    <label class="block text-sm font-medium text-white mb-1">
                        Valor
                    </label>

                    <input
                        v-model="valor"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        class="form-input"
                    />
                </div>
            </div>

            <!-- OBSERVAÇÃO -->
            <div>
                <label class="block text-sm font-medium text-white mb-1">
                    Observação
                </label>

                <textarea
                    v-model="observacao"
                    rows="4"
                    placeholder="Descrição da movimentação..."
                    class="form-input"
                ></textarea>
            </div>

            <!-- MENSAGENS -->
            <p v-if="errorMessage" class="text-red-400 text-sm">
                {{ errorMessage }}
            </p>

            <p v-if="successMessage" class="text-green-400 text-sm">
                {{ successMessage }}
            </p>

            <!-- BOTÃO -->
            <button
                @click="confirmarMovimentacao"
                :disabled="loading"
                class="
                    bg-[#D85A1A] text-white px-6 py-2 rounded
                    transition-all duration-300
                    hover:bg-[#B94814] hover:shadow-lg
                    disabled:opacity-50
                "
            >
                {{ loading ? 'Processando...' : 'Confirmar movimentação' }}
            </button>

        </div>
    </div>
</template>

<style scoped>
/* =========================
   PADRÃO GLOBAL DE INPUTS
   (independente do tema)
========================= */
.form-input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;

    background-color: white;
    color: #111827;

    outline: none;
    transition: box-shadow 0.2s, border-color 0.2s;
}

.form-input::placeholder {
    color: #9ca3af;
}

.form-input:focus {
    border-color: #D85A1A;
    box-shadow: 0 0 0 2px rgba(216, 90, 26, 0.3);
}
</style>
