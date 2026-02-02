<template>
  <view class="index-page">
    <uni-nav-bar
      :fixed="true"
      status-bar="false"
      :border="false"
      title="新能材实验室管理系统"
      left-icon="calendar"
      @clickLeft="openCalendar"
      backgroundColor="#2563eb"
    />
    <view class="content">
      <view class="welcome-text">欢迎使用新能材实验室管理系统</view>
      <uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
      <Rooms />
    </view>
    <Tabbar />
  </view>
</template>

<script setup>
  import { ref, nextTick } from 'vue'
  import Tabbar from '@/components/tabbar/tabbar.vue'
  import Rooms from '@/components/rooms/rooms.vue'
  const calendar = ref(null)
  const openCalendar = () => {
    calendar.value.open()
  }
  const confirm = (e) => {
    console.log(e)
    calendar.value.close()
  }
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
