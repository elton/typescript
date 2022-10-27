<template>
  <view class="doctor-top filter-view">
    <view class="all-text" :class="selectIndex === -1 ? 'changeColor' : ''">全部</view>
    <scroll-view scroll-x="true" class="scroll-view_H">
      <view class="week" v-for="(item, index) in appointmentData" :key="index">
        <text>{{ item.date }}</text>
        <text :class="index === selectIndex ? 'changeColor' : ''">{{ item.week }}</text>
        <text>{{ item.nu_source === 1 ? '可约' : '无号' }}</text>
      </view>
    </scroll-view>
  </view>
  <view style="height:170rpx"></view>

  <view class="doctor-list" v-for="(item, index) in doctorList" :key="index">
    <image :src="item.avatar" mode="aspectFill" />
    <view class="doctor-name">
      <text>{{ item.name }}</text>
      <text>{{ item.post }}</text>
      <text>{{ item.good_at }}</text>
    </view>
    <view class="about-doctor">预约</view>
  </view>
  <point :show="show" title="当日没有医生排班" />
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import { requestAPI } from '@/public/request';
import { onLoad } from '@dcloudio/uni-app';
import point from "@/com-components/point.vue";
import { Appointment, DoctorList } from '@/env';

const show = ref<boolean>(false);
const appointmentData = ref<Appointment[]>([]);
const doctorList = ref<DoctorList[]>([]);
let selectIndex = ref(-1)

onLoad(async ({ id }) => {
  console.log(id);
  const res = await Promise.all([
    requestAPI.timeSele({ dep_id: id as string }),
    requestAPI.allDList({ dep_id: id as string }),
  ]);
  console.log(res);
  appointmentData.value = res[0].data.data
  doctorList.value = res[1].data.data
})
</script>
  
<style>
page {
  background-color: #f7f7f7;
}

/* 顶部 */
.doctor-top {
  background-color: #ffffff;
  height: 150rpx;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-top: 1rpx solid #f2f2f2;
}

.all-text {
  width: 150rpx;
  text-align: center;
  height: 150rpx;
  line-height: 150rpx;
  border-right: 1rpx solid #f2f2f2;
}

.scroll-view_H {
  white-space: nowrap;
  overflow: scroll;
  width: 100%;
  height: 150rpx;
  line-height: 50rpx;
}

.week {
  padding: 0 30rpx;
  display: inline-block;
  text-align: center;
}

.week text {
  display: block;
}

.week text:nth-child(3) {
  font-size: 26rpx;
}

/* 列表 */
.doctor-list {
  background-color: #ffffff;
  padding: 40rpx 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #d3d3d8;
}

.doctor-list:last-child {
  border: none !important;
}

.doctor-list image {
  width: 150rpx;
  height: 150rpx;
  display: block;
  border-radius: 50%;
}

.doctor-list text {
  display: block;
  padding: 5rpx 0;
  color: #b1b2b3;
}

.doctor-name {
  flex: 1;
  padding: 0 10rpx;
}

.doctor-name text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  color: #333 !important;
}

.doctor-name text:nth-child(3) {
  display: -webkit-box;
  overflow: hidden;
  /*超出隐藏*/
  text-overflow: ellipsis;
  /*隐藏后添加省略号*/
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.about-doctor {
  padding: 8rpx 30rpx;
  border-radius: 30rpx;
  border: 1rpx solid #0176ff;
  color: #0176ff;
}

/* 选中时间加上颜色 */
.changeColor {
  color: #0176ff;
}
</style>