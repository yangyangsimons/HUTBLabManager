"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  (_easycom_uni_nav_bar2 + _easycom_uni_calendar2)();
}
const _easycom_uni_nav_bar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_calendar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_calendar + Rooms + Tabbar)();
}
const Tabbar = () => "../../components/tabbar/tabbar.js";
const Rooms = () => "../../components/rooms/rooms.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const calendar = common_vendor.ref(null);
    const openCalendar = () => {
      calendar.value.open();
    };
    const confirm = (e) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:30", e);
      calendar.value.close();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(openCalendar),
        b: common_vendor.p({
          fixed: true,
          ["status-bar"]: "false",
          border: false,
          title: "新能材实验室管理系统",
          ["left-icon"]: "calendar",
          backgroundColor: "#2563eb"
        }),
        c: common_vendor.sr(calendar, "1cf27b2a-1", {
          "k": "calendar"
        }),
        d: common_vendor.o(confirm),
        e: common_vendor.p({
          insert: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
