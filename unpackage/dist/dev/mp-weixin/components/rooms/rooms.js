"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_room = require("../../stores/room.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "rooms",
  setup(__props) {
    const roomStore = stores_room.useRoomStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(roomStore).roomList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "51dde3cd-0-" + i0,
            c: common_vendor.t(item.capacity),
            d: index
          };
        }),
        b: common_vendor.p({
          type: "staff",
          size: "24"
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/rooms/rooms.js.map
