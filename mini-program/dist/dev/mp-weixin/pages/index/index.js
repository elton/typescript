"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "1badc801-menuTop": common_vendor.unref(menuTop),
      "1badc801-menuHeight": common_vendor.unref(menuHeight)
    }));
    let menuTop = common_vendor.ref("");
    let menuHeight = common_vendor.ref("");
    common_vendor.onMounted(() => {
      const menuButton = common_vendor.index.getStorageSync("menuButton");
      menuTop.value = menuButton.top + "px";
      menuHeight.value = menuButton.height + "px";
      pageData();
    });
    const pageData = async () => {
      const res = await public_request.requestAPI.frontpage();
      console.log(res);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(_ctx.__cssVars()),
        b: common_vendor.s(_ctx.__cssVars()),
        c: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1badc801"], ["__file", "/Volumes/data/study/typescript/mini-program/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
