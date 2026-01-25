<script setup lang="ts">
definePageMeta({
    //middleware: 'auth'
})

import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const usuarios = ref<any[]>([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

/* =========================
   CARREGAR USUÁRIOS
========================= */
async function carregarUsuarios() {
    if (!user.value) return

    loading.value = true
    errorMessage.value = ''

    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, created_at')
        .order('full_name')

    loading.value = false

    if (error) {
        console.error('Erro ao buscar usuários:', error)
        errorMessage.value = 'Erro ao carregar usuários.'
        return
    }

    usuarios.value = data || []
}

/* =========================
   ATUALIZAR ROLE
========================= */
async function atualizarRole(userId: string, novoRole: string) {
    successMessage.value = ''
    errorMessage.value = ''

    const { error } = await supabase
        .from('profiles')
        .update({ role: novoRole })
        .eq('id', userId)

    if (error) {
        console.error('Erro ao atualizar role:', error)
        errorMessage.value = 'Erro ao atualizar cargo do usuário.'
        return
    }

    successMessage.value = 'Cargo atualizado com sucesso!'
    carregarUsuarios()
}

/* =========================
   ON MOUNT
========================= */
onMounted(() => {
    carregarUsuarios()
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

        <!-- MENSAGENS -->
        <p v-if="errorMessage" class="text-red-400 text-sm">
            {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="text-green-400 text-sm">
            {{ successMessage }}
        </p>

        <!-- TABELA -->
        <div class="bg-slate-800 rounded-xl shadow-lg overflow-hidden">

            <table class="w-full text-sm">
                <thead class="bg-slate-700 text-white">
                    <tr>
                        <th class="text-left px-4 py-3">Nome</th>
                        <th class="text-left px-4 py-3">Email</th>
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

                        <!-- ROLE -->
                        <td class="px-4 py-3">
                            <select
                                :value="u.role"
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
                            {{ new Date(u.created_at).toLocaleDateString() }}
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
/* =========================
   INPUT PADRÃO (BRANCO)
========================= */
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
