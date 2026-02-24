import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { a as useSupabaseClient } from './server.mjs';
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
  __name: "creditos",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const users = ref([]);
    const selectedUser = ref("");
    const type = ref("credito");
    const origin = ref("manual");
    const amount = ref(null);
    const description = ref("");
    const loading = ref(false);
    const message = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-xl space-y-6" }, _attrs))}><h1 class="text-2xl font-bold">Gerenciar créditos</h1><div class="space-y-3"><select class="w-full border p-2 rounded"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedUser.value) ? ssrLooseContain(selectedUser.value, "") : ssrLooseEqual(selectedUser.value, "")) ? " selected" : ""}>Selecione um cliente</option><!--[-->`);
      ssrRenderList(users.value, (u) => {
        _push(`<option${ssrRenderAttr("value", u.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedUser.value) ? ssrLooseContain(selectedUser.value, u.id) : ssrLooseEqual(selectedUser.value, u.id)) ? " selected" : ""}>${ssrInterpolate(u.full_name)} (${ssrInterpolate(u.email)}) </option>`);
      });
      _push(`<!--]--></select><select class="w-full border p-2 rounded"><option value="credito"${ssrIncludeBooleanAttr(Array.isArray(type.value) ? ssrLooseContain(type.value, "credito") : ssrLooseEqual(type.value, "credito")) ? " selected" : ""}>Crédito</option><option value="debito"${ssrIncludeBooleanAttr(Array.isArray(type.value) ? ssrLooseContain(type.value, "debito") : ssrLooseEqual(type.value, "debito")) ? " selected" : ""}>Débito</option><option value="ajuste"${ssrIncludeBooleanAttr(Array.isArray(type.value) ? ssrLooseContain(type.value, "ajuste") : ssrLooseEqual(type.value, "ajuste")) ? " selected" : ""}>Ajuste</option></select><select class="w-full border p-2 rounded"><option value="torneio"${ssrIncludeBooleanAttr(Array.isArray(origin.value) ? ssrLooseContain(origin.value, "torneio") : ssrLooseEqual(origin.value, "torneio")) ? " selected" : ""}>Torneio</option><option value="compra"${ssrIncludeBooleanAttr(Array.isArray(origin.value) ? ssrLooseContain(origin.value, "compra") : ssrLooseEqual(origin.value, "compra")) ? " selected" : ""}>Compra</option><option value="manual"${ssrIncludeBooleanAttr(Array.isArray(origin.value) ? ssrLooseContain(origin.value, "manual") : ssrLooseEqual(origin.value, "manual")) ? " selected" : ""}>Manual</option></select><input${ssrRenderAttr("value", amount.value)} type="number" step="0.01" placeholder="Valor" class="w-full border p-2 rounded"><textarea placeholder="Observação (obrigatória)" class="w-full border p-2 rounded">${ssrInterpolate(description.value)}</textarea><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full bg-[#D85A1A] text-white py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#B94814]"> Confirmar movimentação </button><p class="${ssrRenderClass([message.value.includes("sucesso") ? "text-green-600" : "text-red-600", "text-sm"])}">${ssrInterpolate(message.value)}</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/creditos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=creditos-BXui_Df2.mjs.map
