import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "meu-saldo",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useToast();
    const loading = ref(true);
    const balance = ref(null);
    const transactions = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h2 class="text-2xl font-bold"> Meu saldo </h2><p class="text-gray-500"> Consulte seu saldo atual e o histórico de movimentações </p></div>`);
      if (loading.value) {
        _push(`<div class="text-gray-500"> Carregando informações... </div>`);
      } else {
        _push(`<div class="space-y-6"><div class="${ssrRenderClass([{
          "bg-green-100 text-green-800": balance.value !== null && balance.value >= 0,
          "bg-red-100 text-red-800": balance.value !== null && balance.value < 0
        }, "p-6 rounded-lg shadow flex items-center justify-between"])}"><div><p class="text-sm opacity-70">Saldo atual</p><p class="text-3xl font-bold"> R$ ${ssrInterpolate(balance.value?.toFixed(2).replace(".", ","))}</p></div><div class="text-4xl"> 💳 </div></div><div class="bg-white rounded-lg shadow overflow-hidden"><div class="p-4 border-b"><h3 class="font-semibold"> Últimas movimentações </h3></div><table class="w-full text-sm"><thead class="bg-gray-100 text-gray-600"><tr><th class="px-4 py-2 text-left">Data</th><th class="px-4 py-2 text-left">Tipo</th><th class="px-4 py-2 text-left">Origem</th><th class="px-4 py-2 text-left">Descrição</th><th class="px-4 py-2 text-right">Valor</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(transactions.value, (tx) => {
          _push(`<tr class="border-t hover:bg-gray-50"><td class="px-4 py-2">${ssrInterpolate(new Date(tx.created_at).toLocaleDateString())}</td><td class="px-4 py-2 capitalize"><span class="${ssrRenderClass({
            "text-green-600": tx.type === "credito",
            "text-red-600": tx.type === "debito",
            "text-yellow-600": tx.type === "ajuste"
          })}">${ssrInterpolate(tx.type)}</span></td><td class="px-4 py-2 capitalize">${ssrInterpolate(tx.origin)}</td><td class="px-4 py-2">${ssrInterpolate(tx.description)}</td><td class="${ssrRenderClass([{
            "text-green-600": tx.type === "credito",
            "text-red-600": tx.type === "debito"
          }, "px-4 py-2 text-right font-medium"])}">${ssrInterpolate(tx.type === "debito" ? "-" : "+")} R$ ${ssrInterpolate(Number(tx.amount).toFixed(2).replace(".", ","))}</td></tr>`);
        });
        _push(`<!--]-->`);
        if (transactions.value.length === 0) {
          _push(`<tr><td colspan="5" class="text-center py-6 text-gray-500"> Nenhuma movimentação encontrada </td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/meu-saldo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=meu-saldo-vUMvnEFT.mjs.map
