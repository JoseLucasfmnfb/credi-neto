<script setup lang="ts">
// Forced HMR update

import { ref, onMounted, watch } from 'vue'
import type { Profile } from '~/types'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const usuarios = ref<Profile[]>([])
const loading = ref(false)

const { role: myRole, fetchRole } = useUserRole()

// Estados de Edição Inline
const editingId = ref<string | null>(null)
const editData = ref({ full_name: '', role: '' })
const savingId = ref<string | null>(null)

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
   AÇÕES DE EDIÇÃO INLINE
========================= */
function startEdit(u: Profile) {
    editingId.value = u.id
    editData.value = {
        full_name: u.full_name || '',
        role: u.role || 'cliente'
    }
}

function cancelEdit() {
    editingId.value = null
}

async function saveEdit(userId: string) {
    let currentRole = myRole.value;
    if (!currentRole) {
        if (!user.value) {
            toast.error('Sessão expirada. Recarregue a página.');
            return;
        }
        
        // Extração segura do ID do administrador logado
        const adminId = user.value.id || (user.value as any).user?.id || (user.value as any).sub
        
        if (!adminId) {
            toast.error('Sessão inválida. Faça login novamente.');
            return;
        }

        const { data } = await supabase.from('profiles').select('role').eq('id', adminId).single();
        if (data && data.role) currentRole = data.role;
    }

    if (!currentRole) {
        toast.error('Cargo do usuário logado não identificado.');
        return;
    }

    // FUNCIONÁRIO NÃO PODE PROMOVER ADMIN E SUPER_ADMIN
    if (
        currentRole === 'funcionario' &&
        (editData.value.role === 'admin' || editData.value.role === 'super_admin')
    ) {
        toast.error('Você não tem permissão para promover usuários a Admin ou Super Admin.')
        return
    }

    savingId.value = userId

    try {
        const session = useSupabaseSession()
        const token = session.value?.access_token

        await $fetch('/api/admin/editar-usuario', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId: userId,
                fullName: editData.value.full_name,
                role: editData.value.role
            }
        })
        
        toast.success('Usuário atualizado com sucesso!')
        editingId.value = null
        carregarUsuarios()
    } catch (error: any) {
        console.error('Erro ao atualizar usuário:', error)
        toast.error(error.data?.statusMessage || 'Erro ao atualizar usuário. Tente novamente.')
    } finally {
        savingId.value = null
    }
}

/* =========================
   INIT
========================= */
async function init() {
    await fetchRole()
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

            <table class="w-full text-sm table-fixed">
                <thead class="bg-slate-700 text-white">
                    <tr>
                        <th class="w-[25%] text-left px-4 py-3">Nome</th>
                        <th class="w-[20%] text-left px-4 py-3">Email</th>
                        <th class="w-[15%] text-left px-4 py-3 pl-2">Saldo</th>
                        <th class="w-[15%] text-left px-4 py-3">Cargo</th>
                        <th class="w-[10%] text-left px-4 py-3">Criado em</th>
                        <th class="w-[15%] text-right px-4 py-3">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="u in usuarios"
                        :key="u.id"
                        class="border-t border-slate-700 hover:bg-slate-700/50 transition h-[60px]"
                    >
                        <!-- NOME -->
                        <td class="px-4 text-white h-[60px] align-middle">
                            <span v-if="editingId !== u.id">{{ u.full_name || '—' }}</span>
                            <input 
                                v-else 
                                v-model="editData.full_name" 
                                type="text" 
                                class="form-input-small w-full" 
                            />
                        </td>

                        <!-- EMAIL -->
                        <td class="px-4 text-gray-300 h-[60px] align-middle">
                            {{ u.email }}
                        </td>

                        <!-- BALANCE -->
                        <td class="px-4 font-medium h-[60px] align-middle" :class="(u.credit_accounts?.balance || 0) < 0 ? 'text-red-400' : 'text-green-400'">
                            R$ {{ (u.credit_accounts?.balance || 0).toFixed(2).replace('.', ',') }}
                        </td>

                        <!-- ROLE -->
                        <td class="px-4 h-[60px] align-middle">
                            <span v-if="editingId !== u.id" class="capitalize">{{ u.role.replace('_', ' ') }}</span>
                            <select
                                v-else
                                v-model="editData.role"
                                :disabled="u.id === user?.id"
                                class="form-input-small w-full"
                            >
                                <option value="cliente">Cliente</option>
                                <option value="funcionario">Funcionário</option>
                                <option v-if="myRole === 'admin' || myRole === 'super_admin'" value="admin">Admin</option>
                                <option v-if="myRole === 'super_admin'" value="super_admin">Super Admin</option>
                            </select>
                        </td>

                        <!-- DATA -->
                        <td class="px-4 text-gray-400 h-[60px] align-middle">
                            {{ u.created_at ? new Date(u.created_at).toLocaleDateString() : '—' }}
                        </td>

                        <!-- AÇÕES -->
                        <td class="px-4 text-right h-[60px] align-middle">
                            <template v-if="myRole === 'admin' || myRole === 'super_admin'">
                                <div v-if="editingId !== u.id">
                                    <button @click="startEdit(u)" class="text-[#D85A1A] hover:text-[#B94814] font-medium transition">Editar</button>
                                </div>
                                <div v-else class="flex space-x-3 justify-end items-center">
                                    <button @click="cancelEdit" class="text-gray-400 hover:text-gray-300 transition" :disabled="savingId === u.id">Cancelar</button>
                                    <button @click="saveEdit(u.id)" class="text-green-500 hover:text-green-400 font-bold transition" :disabled="savingId === u.id">
                                        {{ savingId === u.id ? 'Sal...' : 'Salvar' }}
                                    </button>
                                </div>
                            </template>
                        </td>
                    </tr>

                    <!-- VAZIO -->
                    <tr v-if="usuarios.length === 0">
                        <td colspan="6" class="text-center text-gray-400 py-6">
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
