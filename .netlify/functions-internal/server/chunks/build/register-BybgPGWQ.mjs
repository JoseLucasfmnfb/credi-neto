import { _ as __nuxt_component_0 } from './PasswordInput-DUv5umCT.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CaZuA1SM.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-CEu87jeG.mjs';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const email = ref("");
    const password = ref("");
    const fullName = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PasswordInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col items-center space-y-3"><div class="w-24 h-24 rounded-full bg-white shadow flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="w-full h-full object-contain"></div><h1 class="text-3xl font-extrabold text-[#D85A1A]">CrediNeto</h1><p class="text-sm text-gray-500">Criar nova conta</p></div><form class="space-y-4"><div><label class="block text-sm font-medium">Nome completo</label><input${ssrRenderAttr("value", fullName.value)} type="text" required class="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"></div><div><label class="block text-sm font-medium">Email</label><input${ssrRenderAttr("value", email.value)} type="email" required class="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"></div><div><label class="block text-sm font-medium">Senha</label>`);
      _push(ssrRenderComponent(_component_PasswordInput, {
        modelValue: password.value,
        "onUpdate:modelValue": ($event) => password.value = $event
      }, null, _parent));
      _push(`</div>`);
      if (errorMessage.value) {
        _push(`<p class="text-red-600 text-sm">${ssrInterpolate(errorMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<p class="text-green-600 text-sm">${ssrInterpolate(successMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full bg-[#D85A1A] text-white py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#B94814] hover:shadow-lg disabled:opacity-50"> Criar conta </button></form><p class="text-sm text-center"> Já tem conta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-[#D85A1A] font-medium hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Entrar `);
          } else {
            return [
              createTextVNode(" Entrar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-BybgPGWQ.mjs.map
