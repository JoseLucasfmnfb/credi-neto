import { _ as __nuxt_component_0 } from './nuxt-link-CaZuA1SM.mjs';
import { a as useSupabaseClient, d as useRouter, c as __nuxt_component_1, _ as _export_sfc } from './server.mjs';
import { u as useToast, _ as __nuxt_component_0$1 } from './useToast-BbXKn71r.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-CEu87jeG.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppToast",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppToast.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$2, { __name: "AppToast" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdsBanner",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const banner = ref(null);
    const showMobileModal = ref(true);
    const isMobile = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (banner.value) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-5375c847>`);
        if (isMobile.value && showMobileModal.value) {
          _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity" data-v-5375c847><div class="relative w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden animate-fade-in-up" data-v-5375c847><button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black transition z-10" title="Fechar Propaganda" data-v-5375c847> ✕ </button>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(banner.value.redirect_url ? "a" : "div"), {
            href: banner.value.redirect_url || void 0,
            target: banner.value.redirect_url ? "_blank" : void 0,
            class: "block relative group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", banner.value.mobile_image_url || banner.value.image_url)}${ssrRenderAttr("alt", banner.value.title)} class="w-full h-auto max-h-[60vh] object-contain bg-gray-900 group-hover:opacity-90 transition" data-v-5375c847${_scopeId}><div class="flex items-center justify-between p-3 bg-gray-50 border-t border-gray-100" data-v-5375c847${_scopeId}><span class="text-xs text-gray-500 font-medium" data-v-5375c847${_scopeId}>Publicidade</span>`);
                if (banner.value.redirect_url) {
                  _push2(`<span class="text-xs text-blue-500 font-semibold group-hover:underline" data-v-5375c847${_scopeId}>Visitar ›</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("img", {
                    src: banner.value.mobile_image_url || banner.value.image_url,
                    alt: banner.value.title,
                    class: "w-full h-auto max-h-[60vh] object-contain bg-gray-900 group-hover:opacity-90 transition"
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "flex items-center justify-between p-3 bg-gray-50 border-t border-gray-100" }, [
                    createVNode("span", { class: "text-xs text-gray-500 font-medium" }, "Publicidade"),
                    banner.value.redirect_url ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-xs text-blue-500 font-semibold group-hover:underline"
                    }, "Visitar ›")) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 1
          }), _parent);
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!isMobile.value) {
          _push(`<div class="hidden md:flex fixed bottom-0 left-64 right-0 z-40 bg-slate-900 border-t border-slate-700 shadow-lg justify-center transition group h-[90px]" data-v-5375c847>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(banner.value.redirect_url ? "a" : "div"), {
            href: banner.value.redirect_url || void 0,
            target: banner.value.redirect_url ? "_blank" : void 0,
            class: "block w-full h-full relative"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="absolute top-0 left-0 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-br opacity-50 group-hover:opacity-100 transition z-10" data-v-5375c847${_scopeId}> AD </div><img${ssrRenderAttr("src", banner.value.image_url)}${ssrRenderAttr("alt", banner.value.title)} class="w-full h-full object-cover object-center transition duration-300" data-v-5375c847${_scopeId}>`);
              } else {
                return [
                  createVNode("div", { class: "absolute top-0 left-0 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-br opacity-50 group-hover:opacity-100 transition z-10" }, " AD "),
                  createVNode("img", {
                    src: banner.value.image_url,
                    alt: banner.value.title,
                    class: "w-full h-full object-cover object-center transition duration-300"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 1
          }), _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdsBanner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-5375c847"]]), { __name: "AdsBanner" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useRouter();
    const { role, fullName } = useUserRole();
    const theme = ref("orange");
    const showThemeMenu = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      const _component_AppToast = __nuxt_component_2;
      const _component_AdsBanner = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["h-screen flex overflow-hidden lg:overflow-hidden", {
          "bg-gray-100": theme.value === "orange" || theme.value === "neutral",
          "bg-gray-900": theme.value === "dark"
        }]
      }, _attrs))}><aside class="${ssrRenderClass([{
        "bg-[#D85A1A] text-white": theme.value === "orange",
        "bg-gray-800 text-white": theme.value === "dark",
        "bg-gray-300 text-gray-900": theme.value === "neutral"
      }, "w-64 flex flex-col"])}"><div class="${ssrRenderClass([{
        "border-orange-300": theme.value === "orange",
        "border-gray-700": theme.value === "dark",
        "border-gray-400": theme.value === "neutral"
      }, "h-20 flex items-center justify-center border-b"])}"><div class="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="w-full h-full object-contain"></div></div><nav class="flex-1 overflow-y-auto p-4 space-y-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: ["block px-3 py-2 rounded transition-all duration-300", {
          "hover:bg-[#B94814]": theme.value === "orange",
          "hover:bg-gray-700": theme.value === "dark",
          "hover:bg-gray-400": theme.value === "neutral"
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 🏠 Home `);
          } else {
            return [
              createTextVNode(" 🏠 Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/meu-saldo",
        class: ["block px-3 py-2 rounded transition-all duration-300", {
          "hover:bg-[#B94814]": theme.value === "orange",
          "hover:bg-gray-700": theme.value === "dark",
          "hover:bg-gray-400": theme.value === "neutral"
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 💰 Meu saldo `);
          } else {
            return [
              createTextVNode(" 💰 Meu saldo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(role) !== "cliente") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/gerenciar-creditos",
          class: ["block px-3 py-2 rounded transition-all duration-300", {
            "hover:bg-[#B94814]": theme.value === "orange",
            "hover:bg-gray-700": theme.value === "dark",
            "hover:bg-gray-400": theme.value === "neutral"
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ➕ Gerenciar créditos `);
            } else {
              return [
                createTextVNode(" ➕ Gerenciar créditos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/usuarios",
          class: ["block px-3 py-2 rounded transition-all duration-300", {
            "hover:bg-[#B94814]": theme.value === "orange",
            "hover:bg-gray-700": theme.value === "dark",
            "hover:bg-gray-400": theme.value === "neutral"
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 👥 Usuários `);
            } else {
              return [
                createTextVNode(" 👥 Usuários ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/historico",
          class: ["block px-3 py-2 rounded transition-all duration-300", {
            "hover:bg-[#B94814]": theme.value === "orange",
            "hover:bg-gray-700": theme.value === "dark",
            "hover:bg-gray-400": theme.value === "neutral"
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📜 Histórico da Loja `);
            } else {
              return [
                createTextVNode(" 📜 Histórico da Loja ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(role) === "super_admin") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/banners",
            class: ["block px-3 py-2 rounded transition-all duration-300", {
              "hover:bg-[#B94814]": theme.value === "orange",
              "hover:bg-gray-700": theme.value === "dark",
              "hover:bg-gray-400": theme.value === "neutral"
            }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 📢 Gestão de Banners `);
              } else {
                return [
                  createTextVNode(" 📢 Gestão de Banners ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/cadastrar-usuario",
          class: ["block px-3 py-2 rounded transition-all duration-300", {
            "hover:bg-[#B94814]": theme.value === "orange",
            "hover:bg-gray-700": theme.value === "dark",
            "hover:bg-gray-400": theme.value === "neutral"
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ➕ Cadastrar usuário `);
            } else {
              return [
                createTextVNode(" ➕ Cadastrar usuário ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="${ssrRenderClass([{
        "border-orange-300": theme.value === "orange",
        "border-gray-700": theme.value === "dark",
        "border-gray-400": theme.value === "neutral"
      }, "p-4 border-t"])}"><button class="w-full py-2 rounded font-medium transition-all duration-300 bg-gray-600 hover:bg-gray-700 text-white mb-3 shadow-md"> Sair da Conta </button><div class="text-[10px] text-center opacity-60 flex flex-col items-center"><span>Desenvolvido por</span><a href="https://github.com/JoseLucasfmnfb" target="_blank" class="font-bold hover:underline">José Lucas</a></div></div></aside><div class="flex-1 flex flex-col"><header class="${ssrRenderClass([{
        "bg-[#D85A1A] text-white border-orange-300": theme.value === "orange",
        "bg-gray-800 text-white border-gray-700": theme.value === "dark",
        "bg-white text-gray-800 border-gray-300": theme.value === "neutral"
      }, "h-20 flex items-center justify-between px-6 border-b"])}"><div class="flex flex-col"><h1 class="text-2xl font-bold flex flex-col md:flex-row md:items-baseline md:space-x-3"><span>CrediNeto</span>`);
      if (unref(fullName)) {
        _push(`<span class="text-base md:text-lg font-medium tracking-wide hidden md:block px-3 py-1 rounded shadow-sm inset-0 bg-white/10 border border-white/20"> 👋 Olá, <strong>${ssrInterpolate(unref(fullName))}</strong> <span class="text-sm font-normal opacity-75 capitalize">(${ssrInterpolate(unref(role)?.replace("_", " "))})</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="text-sm opacity-90">`);
      if (unref(role) === "cliente") {
        _push(`<span> Aqui você pode acompanhar seus créditos e histórico. </span>`);
      } else {
        _push(`<span> Aqui você pode gerenciar os créditos dos seus jogadores. </span>`);
      }
      _push(`</p></div><div class="relative"><button class="${ssrRenderClass([{
        "bg-white text-[#D85A1A] border-white": theme.value === "orange",
        "bg-gray-700 text-white border-gray-500": theme.value === "dark",
        "bg-gray-200 text-gray-800 border-gray-400": theme.value === "neutral"
      }, "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300"])}" title="Trocar tema"> 🎨 </button>`);
      if (showThemeMenu.value) {
        _push(`<div class="${ssrRenderClass([{
          "bg-white text-gray-800 border-gray-300": theme.value === "orange" || theme.value === "neutral",
          "bg-gray-800 text-white border-gray-700": theme.value === "dark"
        }, "absolute right-0 mt-2 w-44 rounded shadow border z-50 overflow-hidden"])}"><button class="${ssrRenderClass([{
          "hover:bg-gray-100": theme.value !== "dark",
          "hover:bg-gray-700": theme.value === "dark"
        }, "w-full text-left px-4 py-2 transition-all"])}"> 🟠 Tema padrão </button><button class="${ssrRenderClass([{
          "hover:bg-gray-100": theme.value !== "dark",
          "hover:bg-gray-700": theme.value === "dark"
        }, "w-full text-left px-4 py-2 transition-all"])}"> ⚪ Tema neutro </button><button class="${ssrRenderClass([{
          "hover:bg-gray-100": theme.value !== "dark",
          "hover:bg-gray-700": theme.value === "dark"
        }, "w-full text-left px-4 py-2 transition-all"])}"> 🌙 Tema noturno </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><main class="${ssrRenderClass([{
        "bg-gray-100": theme.value === "orange" || theme.value === "neutral",
        "bg-gray-900 text-white": theme.value === "dark"
      }, "flex-1 flex flex-col overflow-y-auto p-6 md:pb-32"])}">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</main></div>`);
      _push(ssrRenderComponent(_component_AppToast, null, null, _parent));
      _push(ssrRenderComponent(_component_AdsBanner, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-lSqKU6Y1.mjs.map
