<template>
  <view class="custom-tabbar">
    <view
      v-for="(item, index) in tabbarStore.tabList"
      :key="index"
      :class="['tab-item', { active: tabbarStore.activeIndex === index }]"
      @click="handleTabClick(index)"
    >
      <uni-icons
        :type="tabbarStore.activeIndex === index ? item.iconActive : item.icon"
        size="32"
        color="#007aff"
      />
      <text
        :class="[
          'tab-text',
          { 'tab-text-active': tabbarStore.activeIndex === index },
        ]"
      >
        {{ item.name }}
      </text>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { useTabbarStore } from '@/stores/tabbar'

  const tabbarStore = useTabbarStore()

  const handleTabClick = (index) => {
    if (index !== tabbarStore.activeIndex) {
      tabbarStore.switchTab(index)
    }
  }
</script>

<style scoped>
  .custom-tabbar {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    height: 140rpx;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20rpx 0;
    position: relative; /* 为提示气泡定位 */
  }

  .tab-text {
    font-size: 20rpx;
    color: rgba(185, 187, 188, 1);
    font-weight: 400;
    transition: color 0.5s;
  }
  .tab-text-active {
    color: rgba(43, 57, 58, 1);
    font-weight: 400;
  }
</style>
