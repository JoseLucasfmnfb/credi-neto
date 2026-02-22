<script setup lang="ts">
// Forced HMR update

import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const banners = ref<any[]>([])
const loading = ref(false)

// Formulário de Cadastro
const title = ref('')
const redirectUrl = ref('')
const desktopFile = ref<File | null>(null)
const mobileFile = ref<File | null>(null)
const uploading = ref(false)

/* =========================
   CARREGAR BANNERS
========================= */
async function carregarBanners() {
    loading.value = true
    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false })

    loading.value = false

    if (error) {
        console.error(error)
        toast.error('Erro ao carregar os banners.')
        return
    }

    banners.value = data || []
}

/* =========================
   UPLOAD E SALVAMENTO
========================= */
function onDesktopFileChange(e: Event) {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        desktopFile.value = target.files[0]
    }
}

function onMobileFileChange(e: Event) {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        mobileFile.value = target.files[0]
    }
}

async function cadastrarBanner() {
    if (!title.value || !desktopFile.value || !mobileFile.value) {
        toast.error('Preencha o Título e selecione as duas Imagens (Desktop e Mobile).')
        return
    }

    uploading.value = true

    try {
        // --- UPLOAD DESKTOP ---
        const desktopExt = desktopFile.value.name.split('.').pop()
        const desktopFileName = `desktop_${Math.random()}.${desktopExt}`

        const { error: error1 } = await supabase.storage
            .from('banners')
            .upload(desktopFileName, desktopFile.value)

        if (error1) throw error1

        const { data: { publicUrl: desktopUrl } } = supabase.storage
            .from('banners')
            .getPublicUrl(desktopFileName)

        // --- UPLOAD MOBILE ---
        const mobileExt = mobileFile.value.name.split('.').pop()
        const mobileFileName = `mobile_${Math.random()}.${mobileExt}`

        const { error: error2 } = await supabase.storage
            .from('banners')
            .upload(mobileFileName, mobileFile.value)

        if (error2) throw error2

        const { data: { publicUrl: mobileUrl } } = supabase.storage
            .from('banners')
            .getPublicUrl(mobileFileName)

        // 3. Salvar no Banco (Tabela banners)
        const { error: dbError } = await supabase
            .from('banners')
            .insert({
                title: title.value,
                image_url: desktopUrl,           // Guarda Desktop
                mobile_image_url: mobileUrl,     // Guarda Mobile
                redirect_url: redirectUrl.value || null,
                active: true // Por padrão já cadastra ativo
            })

        if (dbError) throw dbError

        toast.success('Propaganda dupla criada com sucesso!')
        
        // Limpar Formulário
        title.value = ''
        redirectUrl.value = ''
        desktopFile.value = null
        mobileFile.value = null
        ;(document.getElementById('desktopInput') as HTMLInputElement).value = ''
        ;(document.getElementById('mobileInput') as HTMLInputElement).value = ''

        carregarBanners()

    } catch (err: any) {
        console.error(err)
        toast.error('Ocorreu um erro no upload. Verifique as permissões de storage.')
    } finally {
        uploading.value = false
    }
}

/* =========================
   AÇÕES DO BANNER (Ativar/Apagar)
========================= */
async function toggleActive(id: string, currentStatus: boolean) {
    const { error } = await supabase
        .from('banners')
        .update({ active: !currentStatus })
        .eq('id', id)

    if (error) {
        toast.error('Erro ao mudar o status do banner.')
        return
    }

    toast.success(!currentStatus ? 'Banner ativado!' : 'Banner pausado.')
    carregarBanners()
}

async function deleteBanner(id: string, desktopUrl: string, mobileUrl: string | null) {
    if (!confirm('Deseja realmente apagar esta propaganda? (As duas imagens serão excluídas)')) return

    try {
        const hashesToApagar = []
        
        // Extrai Desktop Mome
        if (desktopUrl) {
            const partesD = desktopUrl.split('/')
            hashesToApagar.push(partesD[partesD.length - 1])
        }

        // Extrai Mobile Nome
        if (mobileUrl) {
            const partesM = mobileUrl.split('/')
            hashesToApagar.push(partesM[partesM.length - 1])
        }

        if (hashesToApagar.length > 0) {
            await supabase.storage.from('banners').remove(hashesToApagar)
        }

        // Apagar linha do banco
        const { error } = await supabase.from('banners').delete().eq('id', id)
        if (error) throw error

        toast.success('Propaganda excluída definitivamente.')
        carregarBanners()

    } catch (err) {
        console.error(err)
        toast.error('Erro ao deletar o banner.')
    }
}

onMounted(() => {
    carregarBanners()
})
</script>

<template>
    <div class="space-y-8 max-w-5xl">

        <!-- HEADER DA PÁGINA -->
        <div>
            <h1 class="text-2xl font-bold">Gestão de Banners (Propagandas)</h1>
            <p class="text-gray-500">
                Cadastre e ative banners de patrocinadores para o rodapé do App
            </p>
        </div>

        <!-- FORMULÁRIO CREATE -->
        <div class="bg-slate-800 rounded-xl shadow-lg p-6 space-y-5">
            <h2 class="text-lg font-semibold text-white border-b border-slate-700 pb-2">Novo Banner</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <!-- TÍTULO -->
                <div>
                    <label class="block text-sm font-medium text-white mb-1">Título de Controle</label>
                    <input v-model="title" type="text" placeholder="Ex: Patrocínio Editora X" class="form-input" />
                </div>

                <!-- LINK DESTINO -->
                <div>
                    <label class="block text-sm font-medium text-white mb-1">Link de Redirecionamento (Opcional)</label>
                    <input v-model="redirectUrl" type="url" placeholder="https://..." class="form-input" />
                </div>

                <!-- IMAGEM DESKTOP -->
                <div>
                    <label class="block text-sm font-medium text-white mb-1">
                        Imagem para o Rodapé (Computador)
                        <span class="block text-[10px] text-gray-400 mt-0.5">Tamanho Ideal: 1920x200 ou 1200x150 (Retagulo Bem Esticado)</span>
                    </label>
                    <input 
                        id="desktopInput"
                        type="file" 
                        accept="image/*" 
                        @change="onDesktopFileChange" 
                        class="block w-full text-sm text-gray-300
                               file:mr-4 file:py-2 file:px-4
                               file:rounded file:border-0
                               file:text-sm file:font-semibold
                               file:bg-[#D85A1A] file:text-white
                               hover:file:bg-[#B94814] file:cursor-pointer file:transition
                               bg-white/5 border border-slate-600 rounded mt-1" 
                    />
                </div>

                <!-- IMAGEM MOBILE -->
                <div>
                    <label class="block text-sm font-medium text-white mb-1">
                        Imagem para o Pop-Up (Celular)
                        <span class="block text-[10px] text-gray-400 mt-0.5">Tamanho Ideal: 1080x1080 (Quadrado) ou 1080x1350 (Retrato)</span>
                    </label>
                    <input 
                        id="mobileInput"
                        type="file" 
                        accept="image/*" 
                        @change="onMobileFileChange" 
                        class="block w-full text-sm text-gray-300
                               file:mr-4 file:py-2 file:px-4
                               file:rounded file:border-0
                               file:text-sm file:font-semibold
                               file:bg-[#D85A1A] file:text-white
                               hover:file:bg-[#B94814] file:cursor-pointer file:transition
                               bg-white/5 border border-slate-600 rounded mt-1" 
                    />
                </div>
            </div>

            <!-- BOTÃO SALVAR -->
            <button
                @click="cadastrarBanner"
                :disabled="uploading"
                class="bg-[#D85A1A] text-white px-6 py-2 rounded transition-all duration-300 hover:bg-[#B94814] disabled:opacity-50"
            >
                {{ uploading ? 'Fazendo Upload...' : 'Salvar Propaganda' }}
            </button>
        </div>

        <!-- LISTAGEM DOS BANNERS -->
        <div class="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <div class="p-6 border-b border-slate-700">
                <h2 class="text-lg font-semibold text-white">Banners Cadastrados</h2>
            </div>
            
            <div class="p-4" v-if="loading">
                <p class="text-gray-400">Carregando catalogação...</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                
                <!-- CARD INDIVIDUAL -->
                <div 
                    v-for="banner in banners" :key="banner.id"
                    class="bg-slate-700 rounded-lg overflow-hidden flex flex-col shadow-md"
                >
                    <!-- IMAGEM (Aspect Ratio de Banner Horizontal) -->
                    <div class="h-32 w-full bg-slate-900 group relative">
                        <img :src="banner.image_url" alt="Banner" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
                        
                        <!-- Selo Status -->
                        <span 
                            class="absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full shadow"
                            :class="banner.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'"
                        >
                            {{ banner.active ? 'Ativo na Tela' : 'Pausado' }}
                        </span>
                    </div>

                    <!-- INFOS -->
                    <div class="p-4 flex-1 flex flex-col">
                        <h3 class="text-white font-semibold truncate" :title="banner.title">{{ banner.title }}</h3>
                        
                        <a v-if="banner.redirect_url" :href="banner.redirect_url" target="_blank" class="text-xs text-blue-400 hover:underline mt-1 truncate">
                            {{ banner.redirect_url }}
                        </a>
                        <p v-else class="text-xs text-gray-400 mt-1">Sem link</p>

                        <!-- AÇÕES -->
                        <div class="mt-auto pt-4 flex space-x-2">
                            <button 
                                @click="toggleActive(banner.id, banner.active)"
                                class="flex-1 py-1.5 rounded text-sm font-medium transition"
                                :class="banner.active ? 'bg-slate-600 text-gray-300 hover:bg-slate-500' : 'bg-green-600 text-white hover:bg-green-500'"
                            >
                                {{ banner.active ? 'Pausar' : 'Reativar' }}
                            </button>
                            
                            <button 
                                @click="deleteBanner(banner.id, banner.image_url, banner.mobile_image_url)"
                                class="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-3 rounded text-sm transition"
                                title="Apagar Definitivamente"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="banners.length === 0" class="col-span-full text-center text-gray-400 py-6">
                    Nenhum banner cadastrado. O rodapé do cliente não exibirá nada.
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped>
.form-input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #4a5568;
    background-color: #f8fafc;
    color: #111827;
    outline: none;
    transition: box-shadow 0.2s, border-color 0.2s;
}

.form-input:focus {
    border-color: #D85A1A;
    box-shadow: 0 0 0 2px rgba(216, 90, 26, 0.3);
}
</style>
