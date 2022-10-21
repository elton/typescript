<template>
  <view class="patient-infor" v-for="(item,index) in patients" :key="index">
    <view class="patient-flex">
      <text class="patient-name">{{item.name}}</text>
      <text class="patient-text">{{item.relation}}</text>
    </view>
    <view class="patient-flex patient-sex">
      <text>{{item.sex}}</text>
      <text>{{item.age}} 岁</text>
      <text>{{item.phone}}</text>
    </view>
  </view>
  <view class="submit">
    <text @click="cancel">取消</text>
    <text @click="addPatient">添加就诊人</text>
  </view>
  <point :show="show" title="暂无就诊人数据" />
  <view style="height:200rpx"></view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import point from '@/com-components/point.vue'
import { requestAPI } from "@/public/request";
import { onShow } from "@dcloudio/uni-app"
import { Patient } from "@/env"

const show = ref(false)
const patients = ref<Patient[]>([])

onShow(async () => {
  const res = await requestAPI.getPatient()
  patients.value = res.data.data
  console.log(res.data.data)
  if (res.data.data.length === 0) {
    show.value = true
  }
})

const cancel = () => {
  uni.navigateBack()
}

const addPatient = () => {
  uni.navigateTo({
    url: '/pages/my-service/my-patient/add-patient'
  })
}

</script>
<style>
@import url('../../../common-style/form.css');

page {
  background-color: #f6f6f6;
}

.patient-infor {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 15rpx;
  font-size: 28rpx;
}

.patient-flex {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.patient-name {
  font-size: 35rpx;
  font-weight: bold;
}

.patient-flex text {
  margin-right: 15rpx;
}

.patient-text {
  background-color: #d6f3ff;
  color: #78beff;
  padding: 2rpx 15rpx;
}

.patient-sex {
  color: #7c96af;
}
</style>