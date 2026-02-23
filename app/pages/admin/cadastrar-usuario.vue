<script setup lang="ts">
// Forced HMR update

import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const authUser = useSupabaseUser()

const fullName = ref('')
const email = ref('')
const password = ref('')
const role = ref<'cliente' | 'funcionario' | 'admin' | 'super_admin'>('cliente')

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { role: meuRole, fetchRole: carregarMeuRole } = useUserRole()

/* =========================
   CADASTRAR USUÁRIO
========================= */
async function cadastrarUsuario() {
    errorMessage.value = ''
    successMessage.value = ''

    if (!fullName.value || !email.value || !password.value) {
        errorMessage.value = 'Preencha todos os campos obrigatórios.'
        return
    }

    if (password.value.length < 6) {
        errorMessage.value = 'A senha deve ter pelo menos 6 caracteres.'
        return
    }

    loading.value = true

    try {
        // 🔐 PEGAR SESSÃO
        const {
            data: { session }
        } = await supabase.auth.getSession()

        if (!session) {
            errorMessage.value = 'Usuário não autenticado.'
            loading.value = false
            return
        }

        // 🚀 CHAMAR API COM TOKEN
        await $fetch('/api/admin/criar-usuario', {
            method: 'POST',
            body: {
                fullName: fullName.value,
                email: email.value,
                password: password.value,
                role: role.value
            },
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        })

        successMessage.value = 'Usuário cadastrado com sucesso!'

        // limpar form
        fullName.value = ''
        email.value = ''
        password.value = ''
        role.value = meuRole.value === 'funcionario' ? 'cliente' : 'cliente'

    } catch (err: any) {
        console.error(err)
        errorMessage.value =
            err?.data?.statusMessage ||
            err?.message ||
            'Erro ao cadastrar usuário.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    carregarMeuRole()
})
</script>

<template>
    <div class="max-w-2xl space-y-6">

        <!-- TÍTULO -->
        <div>
            <h1 class="text-2xl font-bold">Cadastrar usuário</h1>
            <p class="text-gray-500">
                Crie um novo usuário no sistema
            </p>
        </div>

        <!-- FORMULÁRIO -->
        <div class="bg-slate-800 rounded-xl shadow-lg p-6 space-y-5">

            <div>
                <label class="block text-sm font-medium text-white mb-1">
                    Nome completo
                </label>
                <input v-model="fullName" type="text" class="form-input" />
            </div>

            <div>
                <label class="block text-sm font-medium text-white mb-1">
                    Email
                </label>
                <input v-model="email" type="email" class="form-input" />
            </div>

            <div>
                <label class="block text-sm font-medium text-white mb-1">
                    Senha inicial
                </label>
                <input v-model="password" type="password" class="form-input" />
            </div>

            <!-- ROLE -->
            <div>
                <label class="block text-sm font-medium text-white mb-1">
                    Cargo
                </label>

                <select
                    v-model="role"
                    :disabled="meuRole === 'funcionario' || meuRole === 'cliente'"
                    class="form-input disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="cliente">Cliente</option>
                    <option v-if="meuRole === 'super_admin' || meuRole === 'admin'" value="funcionario">Funcionário</option>
                    <option v-if="meuRole === 'admin' || meuRole === 'super_admin'" value="admin">Admin</option>
                    <option v-if="meuRole === 'super_admin'" value="super_admin">Super Admin</option>
                </select>
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
                @click="cadastrarUsuario"
                :disabled="loading"
                class="bg-[#D85A1A] text-white px-6 py-2 rounded
                       transition-all duration-300
                       hover:bg-[#B94814] hover:shadow-lg
                       disabled:opacity-50"
            >
                {{ loading ? 'Criando...' : 'Cadastrar usuário' }}
            </button>

        </div>
    </div>
</template>

<style scoped>
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
