<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const supabase = useSupabaseClient()
const router = useRouter()

const { role, fullName, fetchRole } = useUserRole()

/* =========================
   CONTROLE DE TEMA
========================= */

type Theme = 'orange' | 'dark' | 'neutral'

const theme = ref<Theme>('orange')
const showThemeMenu = ref(false)
const themeMenuRef = ref<HTMLElement | null>(null)

function applyTheme(value: Theme) {
    theme.value = value
    localStorage.setItem('credi-neto-theme', value)
    showThemeMenu.value = false
}

function handleClickOutside(event: MouseEvent) {
    if (themeMenuRef.value && !themeMenuRef.value.contains(event.target as Node)) {
        showThemeMenu.value = false
    }
}

onMounted(async () => {
    await fetchRole()

    const savedTheme = localStorage.getItem('credi-neto-theme') as Theme | null
    if (savedTheme) {
        theme.value = savedTheme
    }

    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

/* =========================
   LOGOUT
========================= */

async function logout() {
    await supabase.auth.signOut()
    await navigateTo('/')
}
</script>

<template>
    <div class="h-screen flex overflow-hidden lg:overflow-hidden" :class="{
        'bg-gray-100': theme === 'orange' || theme === 'neutral',
        'bg-gray-900': theme === 'dark'
    }">

        <!-- SIDEBAR -->
        <aside class="w-64 flex flex-col" :class="{
            'bg-[#D85A1A] text-white': theme === 'orange',
            'bg-gray-800 text-white': theme === 'dark',
            'bg-gray-300 text-gray-900': theme === 'neutral'
        }">

            <!-- LOGO -->
            <div class="h-20 flex items-center justify-center border-b" :class="{
                'border-orange-300': theme === 'orange',
                'border-gray-700': theme === 'dark',
                'border-gray-400': theme === 'neutral'
            }">
                <div class="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                    <img src="/logo.jpg" alt="Logo" class="w-full h-full object-contain" />
                </div>
            </div>

            <!-- MENU -->
            <nav class="flex-1 overflow-y-auto p-4 space-y-2">

                <NuxtLink to="/home" class="block px-3 py-2 rounded transition-all duration-300" :class="{
                    'hover:bg-[#B94814]': theme === 'orange',
                    'hover:bg-gray-700': theme === 'dark',
                    'hover:bg-gray-400': theme === 'neutral'
                }">
                    🏠 Home
                </NuxtLink>

                <NuxtLink to="/meu-saldo" class="block px-3 py-2 rounded transition-all duration-300" :class="{
                    'hover:bg-[#B94814]': theme === 'orange',
                    'hover:bg-gray-700': theme === 'dark',
                    'hover:bg-gray-400': theme === 'neutral'
                }">
                    💰 Meu saldo
                </NuxtLink>

                <template v-if="role !== 'cliente'">
                    <NuxtLink to="/admin/gerenciar-creditos" class="block px-3 py-2 rounded transition-all duration-300"
                        :class="{
                            'hover:bg-[#B94814]': theme === 'orange',
                            'hover:bg-gray-700': theme === 'dark',
                            'hover:bg-gray-400': theme === 'neutral'
                        }">
                        ➕ Gerenciar créditos
                    </NuxtLink>

                    <NuxtLink to="/admin/usuarios" class="block px-3 py-2 rounded transition-all duration-300" :class="{
                        'hover:bg-[#B94814]': theme === 'orange',
                        'hover:bg-gray-700': theme === 'dark',
                        'hover:bg-gray-400': theme === 'neutral'
                    }">
                        👥 Usuários
                    </NuxtLink>

                    <NuxtLink to="/admin/historico" class="block px-3 py-2 rounded transition-all duration-300" :class="{
                        'hover:bg-[#B94814]': theme === 'orange',
                        'hover:bg-gray-700': theme === 'dark',
                        'hover:bg-gray-400': theme === 'neutral'
                    }">
                        📜 Histórico da Loja
                    </NuxtLink>

                    <NuxtLink v-if="role === 'super_admin'" to="/admin/banners"
                        class="block px-3 py-2 rounded transition-all duration-300" :class="{
                            'hover:bg-[#B94814]': theme === 'orange',
                            'hover:bg-gray-700': theme === 'dark',
                            'hover:bg-gray-400': theme === 'neutral'
                        }">
                        📢 Gestão de Banners
                    </NuxtLink>

                    <NuxtLink to="/admin/cadastrar-usuario" class="block px-3 py-2 rounded transition-all duration-300"
                        :class="{
                            'hover:bg-[#B94814]': theme === 'orange',
                            'hover:bg-gray-700': theme === 'dark',
                            'hover:bg-gray-400': theme === 'neutral'
                        }">
                        ➕ Cadastrar usuário
                    </NuxtLink>
                </template>


            </nav>

            <!-- LOGOUT & CREDITS -->
            <div class="p-4 border-t" :class="{
                'border-orange-300': theme === 'orange',
                'border-gray-700': theme === 'dark',
                'border-gray-400': theme === 'neutral'
            }">
                <button @click="logout" class="w-full py-2 rounded font-medium transition-all duration-300
                           bg-gray-600 hover:bg-gray-700 text-white mb-3 shadow-md">
                    Sair da Conta
                </button>

                <div class="text-[11px] text-center opacity-80 flex flex-col items-center space-y-1">
                    <span>Desenvolvido por</span>
                    <span class="font-bold">José Lucas</span>
                    <div class="flex items-center space-x-3 mt-1">
                        <a href="https://github.com/JoseLucasfmnfb" target="_blank" class="hover:opacity-75 transition-opacity" title="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/jose-oliveira-741563171/" target="_blank" class="hover:opacity-75 transition-opacity" title="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

        </aside>

        <!-- ÁREA PRINCIPAL -->
        <div class="flex-1 flex flex-col">

            <!-- HEADER -->
            <header class="h-20 flex items-center justify-between px-6 border-b" :class="{
                'bg-[#D85A1A] text-white border-orange-300': theme === 'orange',
                'bg-gray-800 text-white border-gray-700': theme === 'dark',
                'bg-white text-gray-800 border-gray-300': theme === 'neutral'
            }">

                <!-- TÍTULO + MENSAGEM -->
                <div class="flex flex-col">
                    <h1 class="text-2xl font-bold flex flex-col md:flex-row md:items-baseline md:space-x-3">
                        <span>CrediNeto</span>
                        <span v-if="fullName"
                            class="text-base md:text-lg font-medium tracking-wide hidden md:block px-3 py-1 rounded shadow-sm inset-0 bg-white/10 border border-white/20">
                            👋 Olá, <strong>{{ fullName }}</strong> <span
                                class="text-sm font-normal opacity-75 capitalize">({{
                                role?.replace('_', ' ') }})</span>
                        </span>
                    </h1>

                    <p class="text-sm opacity-90">

                        <!-- CLIENTE -->
                        <span v-if="role === 'cliente'">
                            Aqui você pode acompanhar seus créditos e histórico.
                        </span>

                        <!-- OTHERS -->
                        <span v-else>
                            Aqui você pode gerenciar os créditos dos seus jogadores.
                        </span>

                    </p>
                </div>

                <!-- BOTÃO DE TEMA COM DROPDOWN -->
                <div class="relative" ref="themeMenuRef">

                    <!-- BOTÃO PRINCIPAL -->
                    <button @click.stop="showThemeMenu = !showThemeMenu" class="w-10 h-10 rounded-full flex items-center justify-center
                               border transition-all duration-300" :class="{
                                'bg-white text-[#D85A1A] border-white': theme === 'orange',
                                'bg-gray-700 text-white border-gray-500': theme === 'dark',
                                'bg-gray-200 text-gray-800 border-gray-400': theme === 'neutral'
                            }" title="Trocar tema">
                        🎨
                    </button>

                    <!-- DROPDOWN -->
                    <div v-if="showThemeMenu"
                        class="absolute right-0 mt-2 w-44 rounded shadow border z-50 overflow-hidden" :class="{
                            'bg-white text-gray-800 border-gray-300': theme === 'orange' || theme === 'neutral',
                            'bg-gray-800 text-white border-gray-700': theme === 'dark'
                        }">

                        <button @click="applyTheme('orange')" class="w-full text-left px-4 py-2 transition-all" :class="{
                            'hover:bg-gray-100': theme !== 'dark',
                            'hover:bg-gray-700': theme === 'dark'
                        }">
                            🟠 Tema padrão
                        </button>

                        <button @click="applyTheme('neutral')" class="w-full text-left px-4 py-2 transition-all" :class="{
                            'hover:bg-gray-100': theme !== 'dark',
                            'hover:bg-gray-700': theme === 'dark'
                        }">
                            ⚪ Tema neutro
                        </button>

                        <button @click="applyTheme('dark')" class="w-full text-left px-4 py-2 transition-all" :class="{
                            'hover:bg-gray-100': theme !== 'dark',
                            'hover:bg-gray-700': theme === 'dark'
                        }">
                            🌙 Tema noturno
                        </button>

                    </div>

                </div>

            </header>

            <!-- CONTEÚDO -->
            <main class="flex-1 flex flex-col overflow-y-auto p-6 md:pb-32" :class="{
                'bg-gray-100': theme === 'orange' || theme === 'neutral',
                'bg-gray-900 text-white': theme === 'dark'
            }">
                <NuxtPage />
            </main>

        </div>

        <AppToast />
        <AdsBanner />
    </div>
</template>
