<script setup lang="ts">
// Forced HMR update

import { ref, onMounted, watch } from 'vue'
import type { Profile } from '~/types'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const usuarios = ref<Profile[]>([])
const loading = ref(false)

const myRole = ref<string | null>(null)

/* =========================
   BUSCAR MINHA ROLE
========================= */
async function buscarMinhaRole() {
    if (!user.value) return

    const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.value.id)
        .single()

    myRole.value = data?.role || null
}

/* =========================
   CARREGAR USUÁRIOS
========================= */
async function carregarUsuarios() {
    if (!user.value) return

    loading.value = true

    const { data, error } = await supabase
        .from('profiles')
        .select(`
            id, full_name, email, role, created_at,
            credit_accounts(balance)
        `)
        .order('full_name')

    loading.value = false

    if (error) {
        console.error('Erro ao buscar usuários:', error)
        toast.error('Erro ao carregar usuários.')
        return
    }

    usuarios.value = data || []
}

/* =========================
   ATUALIZAR ROLE
========================= */
async function atualizarRole(userId: string, novoRole: string) {
    if (!myRole.value) return

    // FUNCIONÁRIO NÃO PODE PROMOVER
    if (
        myRole.value === 'funcionario' &&
        (novoRole === 'admin' || novoRole === 'super_admin')
    ) {
        toast.error('Você não tem permissão para promover usuários.')
        return
    }

    const { error } = await supabase
        .from('profiles')
        .update({ role: novoRole })
        .eq('id', userId)

    if (error) {
        console.error('Erro ao atualizar role:', error)
        toast.error('Erro ao atualizar cargo do usuário.')
        return
    }

    toast.success('Cargo atualizado com sucesso!')
    carregarUsuarios()
}

/* =========================
   INIT
========================= */
async function init() {
    await buscarMinhaRole()
    await carregarUsuarios()
}

watch(user, () => {
    if (user.value) init()
})

onMounted(() => {
    if (user.value) init()
})
</script>

<template>
    <div class="space-y-6 max-w-5xl">

        <!-- TÍTULO -->
        <div>
            <h1 class="text-2xl font-bold">Usuários</h1>
            <p class="text-gray-500">
                Gerencie os usuários e seus níveis de acesso
            </p>
        </div>

        <!-- LOADING -->
        <p v-if="loading" class="text-gray-400 text-sm">
            Carregando usuários...
        </p>

        <!-- TABELA -->
        <div v-if="!loading" class="bg-slate-800 rounded-xl shadow-lg overflow-hidden">

            <table class="w-full text-sm">
                <thead class="bg-slate-700 text-white">
                    <tr>
                        <th class="text-left px-4 py-3">Nome</th>
                        <th class="text-left px-4 py-3">Email</th>
                        <th class="text-left px-4 py-3">Saldo</th>
                        <th class="text-left px-4 py-3">Cargo</th>
                        <th class="text-left px-4 py-3">Criado em</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="u in usuarios"
                        :key="u.id"
                        class="border-t border-slate-700 hover:bg-slate-700/50 transition"
                    >
                        <!-- NOME -->
                        <td class="px-4 py-3 text-white">
                            {{ u.full_name || '—' }}
                        </td>

                        <!-- EMAIL -->
                        <td class="px-4 py-3 text-gray-300">
                            {{ u.email }}
                        </td>

                        <!-- BALANCE -->
                        <td class="px-4 py-3 font-medium" :class="u.credit_accounts?.[0]?.balance < 0 ? 'text-red-400' : 'text-green-400'">
                            R$ {{ u.credit_accounts?.[0]?.balance?.toFixed(2).replace('.', ',') || '0,00' }}
                        </td>

                        <!-- ROLE -->
                        <td class="px-4 py-3">
                            <select
                                :value="u.role"
                                :disabled="u.id === user?.id"
                                @change="atualizarRole(u.id, ($event.target as HTMLSelectElement).value)"
                                class="form-input-small"
                            >
                                <option value="cliente">Cliente</option>
                                <option value="funcionario">Funcionário</option>
                                <option value="admin">Admin</option>
                                <option value="super_admin">Super Admin</option>
                            </select>
                        </td>

                        <!-- DATA -->
                        <td class="px-4 py-3 text-gray-400">
                            {{ u.created_at ? new Date(u.created_at).toLocaleDateString() : '—' }}
                        </td>
                    </tr>

                    <!-- VAZIO -->
                    <tr v-if="usuarios.length === 0">
                        <td colspan="4" class="text-center text-gray-400 py-6">
                            Nenhum usuário encontrado.
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<style scoped>
.form-input-small {
    padding: 0.35rem 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #cbd5e1;
    background-color: white;
    color: #111827;
    outline: none;
    transition: box-shadow 0.2s, border-color 0.2s;
    font-size: 0.875rem;
}

.form-input-small:focus {
    border-color: #D85A1A;
    box-shadow: 0 0 0 2px rgba(216, 90, 26, 0.3);
}
</style>
