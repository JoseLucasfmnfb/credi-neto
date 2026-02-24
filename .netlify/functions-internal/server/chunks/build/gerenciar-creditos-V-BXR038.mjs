import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "gerenciar-creditos",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useSupabaseUser();
    useToast();
    const clientes = ref([]);
    const clienteSelecionado = ref("");
    const tipo = ref("credito");
    const origem = ref("manual");
    const valor = ref("");
    const observacao = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl space-y-6" }, _attrs))} data-v-fff3ac85><div data-v-fff3ac85><h1 class="text-2xl font-bold" data-v-fff3ac85>Gerenciar créditos</h1><p class="text-gray-500" data-v-fff3ac85> Adicione ou remova créditos dos clientes </p></div><div class="bg-slate-800 rounded-xl shadow-lg p-6 space-y-5" data-v-fff3ac85><div data-v-fff3ac85><label class="block text-sm font-medium text-white mb-1" data-v-fff3ac85> Cliente </label><select class="form-input" data-v-fff3ac85><option value="" disabled data-v-fff3ac85${ssrIncludeBooleanAttr(Array.isArray(clienteSelecionado.value) ? ssrLooseContain(clienteSelecionado.value, "") : ssrLooseEqual(clienteSelecionado.value, "")) ? " selected" : ""}>Selecione um cliente</option><!--[-->`);
      ssrRenderList(clientes.value, (cliente) => {
        _push(`<option${ssrRenderAttr("value", cliente.id)} data-v-fff3ac85${ssrIncludeBooleanAttr(Array.isArray(clienteSelecionado.value) ? ssrLooseContain(clienteSelecionado.value, cliente.id) : ssrLooseEqual(clienteSelecionado.value, cliente.id)) ? " selected" : ""}>${ssrInterpolate(cliente.full_name)} (${ssrInterpolate(cliente.email)}) </option>`);
      });
      _push(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-fff3ac85><div data-v-fff3ac85><label class="block text-sm font-medium text-white mb-1" data-v-fff3ac85> Tipo </label><select class="form-input" data-v-fff3ac85><option value="credito" data-v-fff3ac85${ssrIncludeBooleanAttr(Array.isArray(tipo.value) ? ssrLooseContain(tipo.value, "credito") : ssrLooseEqual(tipo.value, "credito")) ? " selected" : ""}>Crédito</option><option value="debito" data-v-fff3ac85${ssrIncludeBooleanAttr(Array.isArray(tipo.value) ? ssrLooseContain(tipo.value, "debito") : ssrLooseEqual(tipo.value, "debito")) ? " selected" : ""}>Débito</option></select></div><div data-v-fff3ac85><label class="block text-sm font-medium text-white mb-1" data-v-fff3ac85> Origem </label><select class="form-input" data-v-fff3ac85><option value="manual" data-v-fff3ac85${ssrIncludeBooleanAttr(Array.isArray(origem.value) ? ssrLooseContain(origem.value, "manual") : ssrLooseEqual(origem.value, "manual")) ? " selected" : ""}>Manual</option><option value="compra" data-v-fff3ac85${ssrIncludeBooleanAttr(Array.isArray(origem.value) ? ssrLooseContain(origem.value, "compra") : ssrLooseEqual(origem.value, "compra")) ? " selected" : ""}>Compra</option><option value="torneio" data-v-fff3ac85${ssrIncludeBooleanAttr(Array.isArray(origem.value) ? ssrLooseContain(origem.value, "torneio") : ssrLooseEqual(origem.value, "torneio")) ? " selected" : ""}>Torneio</option></select></div><div data-v-fff3ac85><label class="block text-sm font-medium text-white mb-1" data-v-fff3ac85> Valor </label><input${ssrRenderAttr("value", valor.value)} type="number" step="0.01" placeholder="0.00" class="form-input" data-v-fff3ac85></div></div><div data-v-fff3ac85><label class="block text-sm font-medium text-white mb-1" data-v-fff3ac85> Observação </label><textarea rows="4" placeholder="Descrição da movimentação..." class="form-input" data-v-fff3ac85>${ssrInterpolate(observacao.value)}</textarea></div><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="bg-[#D85A1A] text-white px-6 py-2 rounded transition-all duration-300 hover:bg-[#B94814] hover:shadow-lg disabled:opacity-50" data-v-fff3ac85>${ssrInterpolate(loading.value ? "Processando..." : "Confirmar movimentação")}</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/gerenciar-creditos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gerenciarCreditos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fff3ac85"]]);

export { gerenciarCreditos as default };
//# sourceMappingURL=gerenciar-creditos-V-BXR038.mjs.map
