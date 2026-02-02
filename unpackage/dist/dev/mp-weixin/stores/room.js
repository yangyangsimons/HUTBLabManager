"use strict";
const common_vendor = require("../common/vendor.js");
const useRoomStore = common_vendor.defineStore("room", {
  state: () => ({
    roomList: [
      { id: 1, name: "会议室 A (10人)", type: "meeting", capacity: 10 },
      { id: 2, name: "会议室 B (6人)", type: "meeting", capacity: 6 },
      { id: 3, name: "实验室 101 (化学)", type: "lab", capacity: 4 },
      { id: 4, name: "实验室 102 (物理)", type: "lab", capacity: 4 }
    ]
  }),
  actions: {
    setRoomList(rooms) {
      this.roomList = rooms;
    }
  }
});
exports.useRoomStore = useRoomStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/room.js.map
