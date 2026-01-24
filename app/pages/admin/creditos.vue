<script setup lang="ts">
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()

const users = ref<any[]>([])
const selectedUser = ref<string>('')
const type = ref('credito')
const origin = ref('manual')
const amount = ref<number | null>(null)
const description = ref('')
const loading = ref(false)
const message = ref('')

async function fetchUsers() {
    const { data } = await supabase
        .from('profiles')
        .select('id, full_name, email, role')
        .eq('role', 'cliente')

    users.value = data || []
}

async function submit() {
    if (!selectedUser.value || !amount.value || !description.value) {
        message.value = 'Preencha todos os campos obrigatórios'
        return
    }

    loading.value = true
    message.value = ''

    const { error } = await supabase.rpc('move_credit', {
        p_user_id: selectedUser.value,
        p_type: type.value,
        p_origin: origin.value,
        p_amount: amount.value,
        p_description: description.value,
        p_performed_by: (await supabase.auth.getUser()).data.user?.id
    })

    loading.value = false

    if (error) {
        message.value = error.message
    } else {
        message.value = 'Movimentação realizada com sucesso!'
        amount.value = null
        description.value = ''
    }
}

onMounted(fetchUsers)
</script>

<template>
    <div class="max-w-xl space-y-6">
        <h1 class="text-2xl font-bold">Gerenciar créditos</h1>

        <div class="space-y-3">
            <select v-model="selectedUser" class="w-full border p-2 rounded">
                <option value="">Selecione um cliente</option>
                <option v-for="u in users" :key="u.id" :value="u.id">
                    {{ u.full_name }} ({{ u.email }})
                </option>
            </select>

            <select v-model="type" class="w-full border p-2 rounded">
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
                <option value="ajuste">Ajuste</option>
            </select>

            <select v-model="origin" class="w-full border p-2 rounded">
                <option value="torneio">Torneio</option>
                <option value="compra">Compra</option>
                <option value="manual">Manual</option>
            </select>

            <input
                v-model.number="amount"
                type="number"
                step="0.01"
                placeholder="Valor"
                class="w-full border p-2 rounded"
            />

            <textarea
                v-model="description"
                placeholder="Observação (obrigatória)"
                class="w-full border p-2 rounded"
            ></textarea>

            <button
                @click="submit"
                :disabled="loading"
                class="w-full bg-[#D85A1A] text-white py-2 rounded
                       transition-all duration-300 ease-in-out
                       hover:bg-[#B94814]"
            >
                Confirmar movimentação
            </button>

            <p class="text-sm" :class="message.includes('sucesso') ? 'text-green-600' : 'text-red-600'">
                {{ message }}
            </p>
        </div>
    </div>
</template>