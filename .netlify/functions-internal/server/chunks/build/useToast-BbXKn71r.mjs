import { defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock } from 'vue';
import { g as useState } from './server.mjs';

defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useToast = () => {
  const toasts = useState("app-toasts", () => []);
  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts.value.push({ ...toast, id });
    setTimeout(() => {
      removeToast(id);
    }, 5e3);
  };
  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };
  return {
    toasts,
    addToast,
    removeToast,
    success: (message) => addToast({ type: "success", message }),
    error: (message) => addToast({ type: "error", message }),
    info: (message) => addToast({ type: "info", message }),
    warning: (message) => addToast({ type: "warning", message })
  };
};

export { __nuxt_component_0 as _, useToast as u };
//# sourceMappingURL=useToast-BbXKn71r.mjs.map
