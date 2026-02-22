<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const supabase = useSupabaseClient()
const router = useRouter()

const { role, fetchRole } = useUserRole()

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
    await router.push('/')
}
</script>

<template>
    <div class="min-h-screen flex" :class="{
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
            <nav class="flex-1 p-4 space-y-2">

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

                <NuxtLink to="/admin/banners" class="block px-3 py-2 rounded transition-all duration-300" :class="{
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


            </nav>

            <!-- LOGOUT -->
            <div class="p-4 border-t" :class="{
                'border-orange-300': theme === 'orange',
                'border-gray-700': theme === 'dark',
                'border-gray-400': theme === 'neutral'
            }">
                <button @click="logout" class="w-full py-2 rounded font-medium transition-all duration-300
                           bg-gray-600 hover:bg-gray-700 text-white">
                    Sair
                </button>
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
                    <h1 class="text-2xl font-bold">
                        CrediNeto
                    </h1>

                    <p class="text-sm opacity-90">

                        <!-- CLIENTE -->
                        <span v-if="role === 'cliente'">
                            Aqui você pode acompanhar seus créditos e histórico.
                        </span>

                        <!-- STAFF / ADMIN -->
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
            <main class="flex-1 p-6 md:pb-32" :class="{
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
