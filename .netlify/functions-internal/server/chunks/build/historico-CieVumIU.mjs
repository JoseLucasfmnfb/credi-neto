import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { a as useSupabaseClient } from './server.mjs';
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
  __name: "historico",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useToast();
    const transactions = ref([]);
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl" }, _attrs))}><div><h1 class="text-2xl font-bold">Histórico Global da Loja</h1><p class="text-gray-500"> Acompanhe e audite todas as transações realizadas no sistema </p></div>`);
      if (loading.value) {
        _push(`<p class="text-gray-400 text-sm"> Carregando transações... </p>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value) {
        _push(`<div class="bg-slate-800 rounded-xl shadow-lg overflow-x-auto"><table class="w-full text-sm min-w-max"><thead class="bg-slate-700 text-white"><tr><th class="text-left px-4 py-3">Data</th><th class="text-left px-4 py-3">Cliente</th><th class="text-left px-4 py-3">Operação</th><th class="text-left px-4 py-3">Saldo Anterior</th><th class="text-left px-4 py-3">Valor Movimentado</th><th class="text-left px-4 py-3">Saldo Final</th><th class="text-left px-4 py-3">Executado por</th><th class="text-left px-4 py-3">Observação</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(transactions.value, (tx) => {
          _push(`<tr class="border-t border-slate-700 hover:bg-slate-700/50 transition text-gray-300"><td class="px-4 py-3 whitespace-nowrap">${ssrInterpolate(new Date(tx.created_at).toLocaleString())}</td><td class="px-4 py-3"><span class="text-white font-medium">${ssrInterpolate(tx.cliente?.full_name || "—")}</span></td><td class="px-4 py-3"><div class="flex flex-col"><span class="${ssrRenderClass([tx.type === "debito" ? "text-red-400" : "text-green-400", "capitalize font-semibold"])}">${ssrInterpolate(tx.type)}</span><span class="text-xs text-gray-400 uppercase tracking-widest mt-0.5">${ssrInterpolate(tx.origin)}</span></div></td><td class="px-4 py-3"> R$ ${ssrInterpolate(Number(tx.previous_balance || 0).toFixed(2).replace(".", ","))}</td><td class="${ssrRenderClass([tx.type === "debito" ? "text-red-400" : "text-green-400", "px-4 py-3 font-bold"])}">${ssrInterpolate(tx.type === "debito" ? "-" : "+")} R$ ${ssrInterpolate(Number(tx.amount).toFixed(2).replace(".", ","))}</td><td class="px-4 py-3 font-semibold text-blue-300"> R$ ${ssrInterpolate(Number(tx.new_balance || 0).toFixed(2).replace(".", ","))}</td><td class="px-4 py-3 text-xs opacity-80">${ssrInterpolate(tx.admin?.full_name || "Desconhecido")}</td><td class="px-4 py-3 text-sm max-w-xs truncate"${ssrRenderAttr("title", tx.description)}>${ssrInterpolate(tx.description)}</td></tr>`);
        });
        _push(`<!--]-->`);
        if (transactions.value.length === 0) {
          _push(`<tr><td colspan="8" class="text-center text-gray-400 py-6"> Nenhuma transação encontrada. </td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/historico.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=historico-CieVumIU.mjs.map
