<script setup lang="ts">
import { ref, reactive } from 'vue';
import { PatientData } from '@/env';
import { myStore } from "@/store/index"
import { requestAPI } from '@/public/request'
import { ResponseData } from '../env';

const onEnter = () => {
  console.log('onEnter')
}

const submitData = reactive<PatientData>({
  phy_name: '',
  phy_time: '',
  show: false,
  patient_id: '',
})

// 父组件调用传值
const trigger = (props: PatientData) => {
  submitData.phy_name = props.phy_name
  submitData.phy_time = props.phy_time
  submitData.show = props.show
}

defineExpose({ trigger })

const choosePatient = () => {
  uni.navigateTo({
    url: '/pages/my-service/my-patient/my-patient'
  })
}

// 监听选择的就诊人信息变更
const name = ref('')
myStore().$subscribe((mutation, state) => {
  console.log(state)
  name.value = state.patientInfo.name
  submitData.patient_id = state.patientInfo._id
})

const submit = async () => {
  uni.showLoading({ title: "提交中", mask: true })
  const res = await requestAPI.resPhy(submitData) as ResponseData
  if (res.statusCode === 200) {
    uni.hideLoading()
    uni.redirectTo({
      url: '/pages/my-service/phy-exam/index'
    })
  }
}
</script>

<template>
  <page-container :show="submitData.show" @enter="onEnter" @clickoverlay="submitData.show=false">
    <view class="popups">
      <text class="popups-title">选择成员</text>
      <view class="member-view">
        <image src="/static/other/touxiang.svg" mode="widthFix" />
        <text>{{name}}</text>
        <text @click="choosePatient">{{name===''?'选择就诊人':'重新选择就诊人'}}</text>
      </view>
      <view class="select-submit" @click="submit">提交预约</view>
    </view>
  </page-container>
</template>

<style>
@import url('../common-style/nucleic-time.css');

.popups {
  height: 400rpx;
  width: 100%;
}
</style>