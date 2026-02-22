<script setup lang="ts">
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()

// Banner ativo do banco
const banner = ref<any>(null)

// Controle de Modal no Mobile
const showMobileModal = ref(true)

// Responsividade Local
const isMobile = ref(false)

/* =========================
   BUSCAR BANNER RELEVANTE
========================= */
async function fetchActiveBanner() {
    // Busca 1 banner aleatório que esteja 'ativo'.
    // orderBy limit 1 é eficiente para isso
    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('active', true)
        .limit(1)

    if (!error && data && data.length > 0) {
        banner.value = data[0]
    }
}

/* =========================
   CONTROLE DE TELA
========================= */
function checkScreenSize() {
    isMobile.value = window.innerWidth < 768
}

onMounted(() => {
    fetchActiveBanner()
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})
</script>

<template>
    <!-- SÓ RENDERIZA SE HOUVER BANNER ATIVO -->
    <div v-if="banner">
        
        <!-- =========================
             MOBILE: MODAL POPUP
             (Aparece 1 vez sobrepondo a tela)
        ========================= -->
        <div 
            v-if="isMobile && showMobileModal" 
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity"
        >
            <div class="relative w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
                
                <!-- Botão Fechar -->
                <button 
                    @click="showMobileModal = false" 
                    class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black transition z-10"
                    title="Fechar Propaganda"
                >
                    ✕
                </button>

                <!-- Banner Conteúdo -->
                <a :href="banner.redirect_url || '#'" :target="banner.redirect_url ? '_blank' : '_self'" class="block relative group">
                    <img 
                        :src="banner.mobile_image_url || banner.image_url" 
                        :alt="banner.title" 
                        class="w-full h-auto max-h-[60vh] object-contain bg-gray-900 group-hover:opacity-90 transition"
                    />
                    
                    <!-- Aviso Publicidade Escrito Inferior -->
                    <div class="flex items-center justify-between p-3 bg-gray-50 border-t border-gray-100">
                        <span class="text-xs text-gray-500 font-medium">Publicidade</span>
                        <span v-if="banner.redirect_url" class="text-xs text-blue-500 font-semibold group-hover:underline">Visitar ›</span>
                    </div>
                </a>

            </div>
        </div>

        <!-- =========================
             DESKTOP: FOOTER FIXO
             (Fica na base da tela o tempo todo)
        ========================= -->
        <div 
            v-if="!isMobile" 
            class="hidden md:flex fixed bottom-0 left-64 right-0 z-40 bg-slate-900 border-t border-slate-700 shadow-lg justify-center transition group"
            style="height: 90px;"
        >
            <a 
                :href="banner.redirect_url || '#'" 
                :target="banner.redirect_url ? '_blank' : '_self'" 
                class="block w-full h-full relative"
            >
                <!-- Selo Pequeno de Ad -->
                <div class="absolute top-0 left-0 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-br opacity-50 group-hover:opacity-100 transition z-10">
                    AD
                </div>
                
                <img 
                    :src="banner.image_url" 
                    :alt="banner.title" 
                    class="w-full h-full object-cover object-center transition duration-300"
                />
            </a>
        </div>

    </div>
</template>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.4s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>
