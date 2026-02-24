import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, a as useSupabaseClient, b as useSupabaseUser } from './server.mjs';
import { u as useToast } from './useToast-BbXKn71r.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "banners",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useSupabaseUser();
    useToast();
    const banners2 = ref([]);
    const loading = ref(false);
    const title = ref("");
    const redirectUrl = ref("");
    ref(null);
    ref(null);
    const uploading = ref(false);
    const isEditing = ref(false);
    ref(null);
    ref("");
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 max-w-5xl" }, _attrs))} data-v-e755ddf1><div data-v-e755ddf1><h1 class="text-2xl font-bold" data-v-e755ddf1>Gestão de Banners (Propagandas)</h1><p class="text-gray-500" data-v-e755ddf1> Cadastre e ative banners de patrocinadores para o rodapé do App </p></div><div class="bg-slate-800 rounded-xl shadow-lg p-6 space-y-5" data-v-e755ddf1><h2 class="text-lg font-semibold text-white border-b border-slate-700 pb-2" data-v-e755ddf1>${ssrInterpolate(isEditing.value ? "Editando Propaganda" : "Nova Propaganda")}</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-e755ddf1><div data-v-e755ddf1><label class="block text-sm font-medium text-white mb-1" data-v-e755ddf1>Título de Controle</label><input${ssrRenderAttr("value", title.value)} type="text" placeholder="Ex: Patrocínio Editora X" class="form-input" data-v-e755ddf1></div><div data-v-e755ddf1><label class="block text-sm font-medium text-white mb-1" data-v-e755ddf1>Link de Redirecionamento (Opcional)</label><input${ssrRenderAttr("value", redirectUrl.value)} type="url" placeholder="https://..." class="form-input" data-v-e755ddf1></div><div data-v-e755ddf1><label class="block text-sm font-medium text-white mb-1" data-v-e755ddf1> Imagem para o Rodapé (Computador) <span class="block text-[10px] text-gray-400 mt-0.5" data-v-e755ddf1>`);
      if (isEditing.value) {
        _push(`<!--[-->Deixe em branco para manter a imagem atual<!--]-->`);
      } else {
        _push(`<!--[-->Tamanho Ideal: 1920x200 ou 1200x150 (Retângulo Bem Esticado)<!--]-->`);
      }
      _push(`</span></label><input id="desktopInput" type="file" accept="image/*" class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#D85A1A] file:text-white hover:file:bg-[#B94814] file:cursor-pointer file:transition bg-white/5 border border-slate-600 rounded mt-1" data-v-e755ddf1></div><div data-v-e755ddf1><label class="block text-sm font-medium text-white mb-1" data-v-e755ddf1> Imagem para o Pop-Up (Celular) <span class="block text-[10px] text-gray-400 mt-0.5" data-v-e755ddf1>`);
      if (isEditing.value) {
        _push(`<!--[-->Deixe em branco para manter a imagem atual<!--]-->`);
      } else {
        _push(`<!--[-->Tamanho Ideal: 1080x1080 (Quadrado) ou 1080x1350 (Retrato)<!--]-->`);
      }
      _push(`</span></label><input id="mobileInput" type="file" accept="image/*" class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#D85A1A] file:text-white hover:file:bg-[#B94814] file:cursor-pointer file:transition bg-white/5 border border-slate-600 rounded mt-1" data-v-e755ddf1></div></div><div class="flex space-x-3" data-v-e755ddf1><button${ssrIncludeBooleanAttr(uploading.value) ? " disabled" : ""} class="bg-[#D85A1A] text-white px-6 py-2 rounded transition-all duration-300 hover:bg-[#B94814] disabled:opacity-50" data-v-e755ddf1>${ssrInterpolate(uploading.value ? "Salvando..." : isEditing.value ? "Salvar Alterações" : "Salvar Propaganda")}</button>`);
      if (isEditing.value) {
        _push(`<button${ssrIncludeBooleanAttr(uploading.value) ? " disabled" : ""} class="bg-gray-600 text-white px-6 py-2 rounded transition-all duration-300 hover:bg-gray-500 disabled:opacity-50" data-v-e755ddf1> Cancelar Edição </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-slate-800 rounded-xl shadow-lg overflow-hidden" data-v-e755ddf1><div class="p-6 border-b border-slate-700" data-v-e755ddf1><h2 class="text-lg font-semibold text-white" data-v-e755ddf1>Banners Cadastrados</h2></div>`);
      if (loading.value) {
        _push(`<div class="p-4" data-v-e755ddf1><p class="text-gray-400" data-v-e755ddf1>Carregando catalogação...</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" data-v-e755ddf1><!--[-->`);
        ssrRenderList(banners2.value, (banner) => {
          _push(`<div class="bg-slate-700 rounded-lg overflow-hidden flex flex-col shadow-md" data-v-e755ddf1><div class="h-32 w-full bg-slate-900 group relative" data-v-e755ddf1><img${ssrRenderAttr("src", banner.image_url)} alt="Banner" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" data-v-e755ddf1><span class="${ssrRenderClass([banner.active ? "bg-green-500 text-white" : "bg-gray-500 text-white", "absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full shadow"])}" data-v-e755ddf1>${ssrInterpolate(banner.active ? "Ativo na Tela" : "Pausado")}</span></div><div class="p-4 flex-1 flex flex-col" data-v-e755ddf1><h3 class="text-white font-semibold truncate"${ssrRenderAttr("title", banner.title)} data-v-e755ddf1>${ssrInterpolate(banner.title)}</h3>`);
          if (banner.redirect_url) {
            _push(`<a${ssrRenderAttr("href", banner.redirect_url)} target="_blank" class="text-xs text-blue-400 hover:underline mt-1 truncate" data-v-e755ddf1>${ssrInterpolate(banner.redirect_url)}</a>`);
          } else {
            _push(`<p class="text-xs text-gray-400 mt-1" data-v-e755ddf1>Sem link</p>`);
          }
          _push(`<div class="mt-auto pt-4 flex space-x-2" data-v-e755ddf1><button class="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 rounded text-sm transition" title="Editar Propaganda" data-v-e755ddf1> ✏️ </button><button class="${ssrRenderClass([banner.active ? "bg-slate-600 text-gray-300 hover:bg-slate-500" : "bg-green-600 text-white hover:bg-green-500", "flex-1 py-1.5 rounded text-sm font-medium transition"])}" data-v-e755ddf1>${ssrInterpolate(banner.active ? "Pausar" : "Reativar")}</button><button class="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-3 rounded text-sm transition" title="Apagar Definitivamente" data-v-e755ddf1> 🗑️ </button></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (banners2.value.length === 0) {
          _push(`<div class="col-span-full text-center text-gray-400 py-6" data-v-e755ddf1> Nenhum banner cadastrado. O rodapé do cliente não exibirá nada. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/banners.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const banners = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e755ddf1"]]);

export { banners as default };
//# sourceMappingURL=banners-BoWujbN6.mjs.map
