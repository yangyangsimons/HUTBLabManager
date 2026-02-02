import { defineStore } from 'pinia'

export const useTabbarStore = defineStore('tabbar', {
  state: () => ({
    activeIndex: 0,
    tabList: [
      {
        name: '预约大厅',
        icon: 'calendar',
        iconActive: 'calendar-filled',
        pagePath: '/pages/index/index',
      },
      {
        name: '我的',
        icon: 'staff',
        iconActive: 'staff-filled',
        pagePath: '/pages/my/my',
      },
    ],
  }),
  actions: {
    setActive(index) {
      this.activeIndex = index
    },
    switchTab(index) {
      this.setActive(index)
      const targetPage = this.tabList[index]

      uni.switchTab({
        url: targetPage.pagePath,
      })
    },
  },
})
