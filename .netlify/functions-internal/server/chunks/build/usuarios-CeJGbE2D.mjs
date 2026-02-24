import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc, a as useSupabaseClient, b as useSupabaseUser } from './server.mjs';
import { u as useToast } from './useToast-BbXKn71r.mjs';
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
  __name: "usuarios",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const toast = useToast();
    const usuarios2 = ref([]);
    const loading = ref(false);
    const { role: myRole, fetchRole } = useUserRole();
    const editingId = ref(null);
    const editData = ref({ full_name: "", role: "" });
    const savingId = ref(null);
    async function carregarUsuarios() {
      if (!user.value) return;
      loading.value = true;
      const { data, error } = await supabase.from("profiles").select(`
            id, full_name, email, role, created_at,
            credit_accounts(balance)
        `).order("full_name");
      loading.value = false;
      if (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao carregar usuários.");
        return;
      }
      usuarios2.value = data || [];
    }
    async function init() {
      await fetchRole();
      await carregarUsuarios();
    }
    watch(user, () => {
      if (user.value) init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-5xl" }, _attrs))} data-v-6054bee0><div data-v-6054bee0><h1 class="text-2xl font-bold" data-v-6054bee0>Usuários</h1><p class="text-gray-500" data-v-6054bee0> Gerencie os usuários e seus níveis de acesso </p></div>`);
      if (loading.value) {
        _push(`<p class="text-gray-400 text-sm" data-v-6054bee0> Carregando usuários... </p>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value) {
        _push(`<div class="bg-slate-800 rounded-xl shadow-lg overflow-hidden" data-v-6054bee0><table class="w-full text-sm table-fixed" data-v-6054bee0><thead class="bg-slate-700 text-white" data-v-6054bee0><tr data-v-6054bee0><th class="w-[25%] text-left px-4 py-3" data-v-6054bee0>Nome</th><th class="w-[20%] text-left px-4 py-3" data-v-6054bee0>Email</th><th class="w-[15%] text-left px-4 py-3 pl-2" data-v-6054bee0>Saldo</th><th class="w-[15%] text-left px-4 py-3" data-v-6054bee0>Cargo</th><th class="w-[10%] text-left px-4 py-3" data-v-6054bee0>Criado em</th><th class="w-[15%] text-right px-4 py-3" data-v-6054bee0>Ações</th></tr></thead><tbody data-v-6054bee0><!--[-->`);
        ssrRenderList(usuarios2.value, (u) => {
          _push(`<tr class="border-t border-slate-700 hover:bg-slate-700/50 transition h-[60px]" data-v-6054bee0><td class="px-4 text-white h-[60px] align-middle" data-v-6054bee0>`);
          if (editingId.value !== u.id) {
            _push(`<span data-v-6054bee0>${ssrInterpolate(u.full_name || "—")}</span>`);
          } else {
            _push(`<input${ssrRenderAttr("value", editData.value.full_name)} type="text" class="form-input-small w-full" data-v-6054bee0>`);
          }
          _push(`</td><td class="px-4 text-gray-300 h-[60px] align-middle" data-v-6054bee0>${ssrInterpolate(u.email)}</td><td class="${ssrRenderClass([(u.credit_accounts?.balance || 0) < 0 ? "text-red-400" : "text-green-400", "px-4 font-medium h-[60px] align-middle"])}" data-v-6054bee0> R$ ${ssrInterpolate((u.credit_accounts?.balance || 0).toFixed(2).replace(".", ","))}</td><td class="px-4 h-[60px] align-middle" data-v-6054bee0>`);
          if (editingId.value !== u.id) {
            _push(`<span class="capitalize" data-v-6054bee0>${ssrInterpolate(u.role.replace("_", " "))}</span>`);
          } else {
            _push(`<select${ssrIncludeBooleanAttr(u.id === unref(user)?.id) ? " disabled" : ""} class="form-input-small w-full" data-v-6054bee0><option value="cliente" data-v-6054bee0${ssrIncludeBooleanAttr(Array.isArray(editData.value.role) ? ssrLooseContain(editData.value.role, "cliente") : ssrLooseEqual(editData.value.role, "cliente")) ? " selected" : ""}>Cliente</option><option value="funcionario" data-v-6054bee0${ssrIncludeBooleanAttr(Array.isArray(editData.value.role) ? ssrLooseContain(editData.value.role, "funcionario") : ssrLooseEqual(editData.value.role, "funcionario")) ? " selected" : ""}>Funcionário</option>`);
            if (unref(myRole) === "admin" || unref(myRole) === "super_admin") {
              _push(`<option value="admin" data-v-6054bee0${ssrIncludeBooleanAttr(Array.isArray(editData.value.role) ? ssrLooseContain(editData.value.role, "admin") : ssrLooseEqual(editData.value.role, "admin")) ? " selected" : ""}>Admin</option>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(myRole) === "super_admin") {
              _push(`<option value="super_admin" data-v-6054bee0${ssrIncludeBooleanAttr(Array.isArray(editData.value.role) ? ssrLooseContain(editData.value.role, "super_admin") : ssrLooseEqual(editData.value.role, "super_admin")) ? " selected" : ""}>Super Admin</option>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</select>`);
          }
          _push(`</td><td class="px-4 text-gray-400 h-[60px] align-middle" data-v-6054bee0>${ssrInterpolate(u.created_at ? new Date(u.created_at).toLocaleDateString() : "—")}</td><td class="px-4 text-right h-[60px] align-middle" data-v-6054bee0>`);
          if (unref(myRole) === "admin" || unref(myRole) === "super_admin") {
            _push(`<!--[-->`);
            if (editingId.value !== u.id) {
              _push(`<div data-v-6054bee0><button class="text-[#D85A1A] hover:text-[#B94814] font-medium transition" data-v-6054bee0>Editar</button></div>`);
            } else {
              _push(`<div class="flex space-x-3 justify-end items-center" data-v-6054bee0><button class="text-gray-400 hover:text-gray-300 transition"${ssrIncludeBooleanAttr(savingId.value === u.id) ? " disabled" : ""} data-v-6054bee0>Cancelar</button><button class="text-green-500 hover:text-green-400 font-bold transition"${ssrIncludeBooleanAttr(savingId.value === u.id) ? " disabled" : ""} data-v-6054bee0>${ssrInterpolate(savingId.value === u.id ? "Sal..." : "Salvar")}</button></div>`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]-->`);
        if (usuarios2.value.length === 0) {
          _push(`<tr data-v-6054bee0><td colspan="6" class="text-center text-gray-400 py-6" data-v-6054bee0> Nenhum usuário encontrado. </td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/usuarios.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const usuarios = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6054bee0"]]);

export { usuarios as default };
//# sourceMappingURL=usuarios-CeJGbE2D.mjs.map
