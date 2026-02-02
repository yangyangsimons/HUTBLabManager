"use strict";
const common_vendor = require("../common/vendor.js");
const useTabbarStore = common_vendor.defineStore("tabbar", {
  state: () => ({
    activeIndex: 0,
    tabList: [
      {
        name: "预约大厅",
        icon: "calendar",
        iconActive: "calendar-filled",
        pagePath: "/pages/index/index"
      },
      {
        name: "我的",
        icon: "staff",
        iconActive: "staff-filled",
        pagePath: "/pages/my/my"
      }
    ]
  }),
  actions: {
    setActive(index) {
      this.activeIndex = index;
    },
    switchTab(index) {
      this.setActive(index);
      const targetPage = this.tabList[index];
      common_vendor.index.switchTab({
        url: targetPage.pagePath
      });
    }
  }
});
exports.useTabbarStore = useTabbarStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/tabbar.js.map
