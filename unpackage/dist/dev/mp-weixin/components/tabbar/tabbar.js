"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_tabbar = require("../../stores/tabbar.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "tabbar",
  setup(__props) {
    const tabbarStore = stores_tabbar.useTabbarStore();
    const handleTabClick = (index) => {
      if (index !== tabbarStore.activeIndex) {
        tabbarStore.switchTab(index);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(tabbarStore).tabList, (item, index, i0) => {
          return {
            a: "e9b92a61-0-" + i0,
            b: common_vendor.p({
              type: common_vendor.unref(tabbarStore).activeIndex === index ? item.iconActive : item.icon,
              size: "32",
              color: "#007aff"
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.n({
              "tab-text-active": common_vendor.unref(tabbarStore).activeIndex === index
            }),
            e: index,
            f: common_vendor.n({
              active: common_vendor.unref(tabbarStore).activeIndex === index
            }),
            g: common_vendor.o(($event) => handleTabClick(index), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e9b92a61"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/tabbar/tabbar.js.map
