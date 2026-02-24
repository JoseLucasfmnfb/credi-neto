import { _ as __nuxt_component_0 } from './nuxt-link-CaZuA1SM.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useSupabaseClient, b as useSupabaseUser } from './server.mjs';
import { u as useUserRole } from './useUserRole-CKEAOnSG.mjs';
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
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useSupabaseUser();
    useUserRole();
    const balance = ref(null);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-5xl" }, _attrs))}><div><h1 class="text-2xl font-bold">Resumo da Conta</h1><p class="text-gray-500"> Acompanhe o seu saldo e histórico de movimentações. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 relative overflow-hidden"><div class="absolute top-0 right-0 w-32 h-32 bg-[#D85A1A]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div><h3 class="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Saldo Atual</h3>`);
      if (loading.value) {
        _push(`<div class="animate-pulse flex space-x-4 mt-2 mb-4"><div class="h-10 w-32 bg-slate-700/50 rounded"></div></div>`);
      } else {
        _push(`<div class="flex items-baseline space-x-2 mt-2 mb-4"><span class="text-lg font-medium text-slate-400">R$</span><span class="${ssrRenderClass([(balance.value || 0) < 0 ? "text-red-400" : "text-green-400", "text-4xl font-extrabold"])}">${ssrInterpolate((balance.value || 0).toFixed(2).replace(".", ","))}</span></div>`);
      }
      _push(`<p class="text-sm text-slate-500 mb-6"> Mantenha seu saldo positivo para continuar jogando. </p><div class="flex space-x-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/meu-saldo",
        class: "bg-[#D85A1A] hover:bg-[#B94814] text-white px-4 py-2 rounded font-medium transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver histórico detalhado `);
          } else {
            return [
              createTextVNode(" Ver histórico detalhado ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700"><h3 class="text-slate-200 font-medium text-lg mb-3">Como funcionam os créditos?</h3><ul class="space-y-3 text-slate-400 text-sm"><li class="flex items-start"><span class="text-[#D85A1A] mr-2 mt-0.5">•</span><span>Seu saldo é utilizado para inscrições em torneios e compra de produtos.</span></li><li class="flex items-start"><span class="text-[#D85A1A] mr-2 mt-0.5">•</span><span>As adições e descontos são feitos diretamente no balcão da loja.</span></li><li class="flex items-start"><span class="text-[#D85A1A] mr-2 mt-0.5">•</span><span>Você pode visualizar o seu comprovante no link ao lado.</span></li></ul></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home-CsMrLGU6.mjs.map
