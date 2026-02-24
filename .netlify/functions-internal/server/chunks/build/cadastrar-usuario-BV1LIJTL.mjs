import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, a as useSupabaseClient, b as useSupabaseUser } from './server.mjs';
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
  __name: "cadastrar-usuario",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useSupabaseUser();
    const fullName = ref("");
    const email = ref("");
    const password = ref("");
    const role = ref("cliente");
    const loading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    const { role: meuRole } = useUserRole();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl space-y-6" }, _attrs))} data-v-9a97e890><div data-v-9a97e890><h1 class="text-2xl font-bold" data-v-9a97e890>Cadastrar usuário</h1><p class="text-gray-500" data-v-9a97e890> Crie um novo usuário no sistema </p></div><div class="bg-slate-800 rounded-xl shadow-lg p-6 space-y-5" data-v-9a97e890><div data-v-9a97e890><label class="block text-sm font-medium text-white mb-1" data-v-9a97e890> Nome completo </label><input${ssrRenderAttr("value", fullName.value)} type="text" class="form-input" data-v-9a97e890></div><div data-v-9a97e890><label class="block text-sm font-medium text-white mb-1" data-v-9a97e890> Email </label><input${ssrRenderAttr("value", email.value)} type="email" class="form-input" data-v-9a97e890></div><div data-v-9a97e890><label class="block text-sm font-medium text-white mb-1" data-v-9a97e890> Senha inicial </label><input${ssrRenderAttr("value", password.value)} type="password" class="form-input" data-v-9a97e890></div><div data-v-9a97e890><label class="block text-sm font-medium text-white mb-1" data-v-9a97e890> Cargo </label><select${ssrIncludeBooleanAttr(unref(meuRole) === "funcionario" || unref(meuRole) === "cliente") ? " disabled" : ""} class="form-input disabled:opacity-50 disabled:cursor-not-allowed" data-v-9a97e890><option value="cliente" data-v-9a97e890${ssrIncludeBooleanAttr(Array.isArray(role.value) ? ssrLooseContain(role.value, "cliente") : ssrLooseEqual(role.value, "cliente")) ? " selected" : ""}>Cliente</option>`);
      if (unref(meuRole) === "super_admin" || unref(meuRole) === "admin") {
        _push(`<option value="funcionario" data-v-9a97e890${ssrIncludeBooleanAttr(Array.isArray(role.value) ? ssrLooseContain(role.value, "funcionario") : ssrLooseEqual(role.value, "funcionario")) ? " selected" : ""}>Funcionário</option>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(meuRole) === "admin" || unref(meuRole) === "super_admin") {
        _push(`<option value="admin" data-v-9a97e890${ssrIncludeBooleanAttr(Array.isArray(role.value) ? ssrLooseContain(role.value, "admin") : ssrLooseEqual(role.value, "admin")) ? " selected" : ""}>Admin</option>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(meuRole) === "super_admin") {
        _push(`<option value="super_admin" data-v-9a97e890${ssrIncludeBooleanAttr(Array.isArray(role.value) ? ssrLooseContain(role.value, "super_admin") : ssrLooseEqual(role.value, "super_admin")) ? " selected" : ""}>Super Admin</option>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</select></div>`);
      if (errorMessage.value) {
        _push(`<p class="text-red-400 text-sm" data-v-9a97e890>${ssrInterpolate(errorMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<p class="text-green-400 text-sm" data-v-9a97e890>${ssrInterpolate(successMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="bg-[#D85A1A] text-white px-6 py-2 rounded transition-all duration-300 hover:bg-[#B94814] hover:shadow-lg disabled:opacity-50" data-v-9a97e890>${ssrInterpolate(loading.value ? "Criando..." : "Cadastrar usuário")}</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/cadastrar-usuario.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cadastrarUsuario = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a97e890"]]);

export { cadastrarUsuario as default };
//# sourceMappingURL=cadastrar-usuario-BV1LIJTL.mjs.map
