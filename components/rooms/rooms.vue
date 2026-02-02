<template>
  <view class="rooms-container">
    <view
      class="room-item"
      v-for="(item, index) in roomStore.roomList"
      :key="index"
    >
      <view class="name">{{ item.name }}</view>
      <view class="capacity-wrap">
        <uni-icons type="staff" size="24" />
        <view class="capacity">容量: {{ item.capacity }} 人</view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRoomStore } from '@/stores/room'
  const roomStore = useRoomStore()
</script>

<style lang="scss" scoped></style>
