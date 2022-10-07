"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/registered/registered.js";
  "./pages/video/video.js";
  "./pages/mine/mine.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      const getMenu = common_vendor.index.getStorageSync("menuButton");
      if (!getMenu) {
        const res = common_vendor.index.getMenuButtonBoundingClientRect();
        common_vendor.index.setStorageSync("menuButton", res);
      }
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Volumes/data/study/typescript/mini-program/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
