import { defineComponent, useModel, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderDynamicModel } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PasswordInput",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    const show = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><input${ssrRenderAttr("type", show.value ? "text" : "password")}${ssrRenderDynamicModel(show.value ? "text" : "password", modelValue.value, null)} class="w-full mt-1 p-2 border rounded pr-10 focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"><button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">`);
      if (show.value) {
        _push(`<span>🙈</span>`);
      } else {
        _push(`<span>👁️</span>`);
      }
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PasswordInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "PasswordInput" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PasswordInput-DUv5umCT.mjs.map
