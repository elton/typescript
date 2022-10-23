<template>
  <view class="AI-card" @click="upload">
    <image src="/static/other/AI-shibie.svg" mode="widthFix"></image>
    <text>身份证智能识别</text>
  </view>
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input type="text" placeholder="请输入真实姓名" placeholder-class="input-style" v-model="submitData.name" />
    </view>
    <view class="xinguan-flex">
      <text>性别</text>
      <picker mode="selector" :range="['男','女']" class="flex-left" @change="changeSex">
        <view>
          <text>{{submitData.sex ===''?'请选择性别':submitData.sex}}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date" class="flex-left" @change="changeBirth">
        <view>
          <text>{{submitData.born ===''?'请选择出生日期':submitData.born}}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>成员关系</text>
      <picker mode="selector" :range="['自己','父母','其他']" class="flex-left" @change="changeRelation">
        <view>
          <text>{{submitData.relation ===''?'请选择成员关系':submitData.relation}}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>

    <view class="xinguan-flex">
      <text>身份证</text>
      <input type="text" placeholder="请输入身份证" placeholder-class="input-style" v-model="submitData.id_card" />
    </view>

    <view class="xinguan-flex">
      <text>手机号</text>
      <input type="number" placeholder="请输入手机号" placeholder-class="input-style" v-model="submitData.phone" />
    </view>
  </view>
  <view style="height:200rpx"></view>
  <view class="submit">
    <text @click="cancel">取消</text>
    <text @click="add">确认添加</text>
  </view>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { uploadImage } from "@/public/misc";
import { aiCardURL, requestAPI } from "@/public/request";
import { ResponseData } from "@/env";

const upload = async () => {
  const res: any = await uploadImage(aiCardURL, '识别中', '识别失败')
  console.log(res)
  const data = JSON.parse(res.data)
  if (res.statusCode === 200) {
    submitData.name = data.data.name
    submitData.id_card = data.data.id_card
    submitData.born = data.data.born
    submitData.sex = data.data.sex
  }
  else {
    uni.showToast({
      title: data.data,
      icon: 'none',
      duration: 1000
    })
  }
}


const changeSex = (event: { detail: { value: string } }) => {
  submitData.sex = event.detail.value === '0' ? '男' : '女'
}

const changeBirth = (event: { detail: { value: string } }) => {
  submitData.born = event.detail.value
}

const changeRelation = (event: { detail: { value: string } }) => {
  submitData.relation = event.detail.value === '0' ? '自己' : event.detail.value === '1' ? '父母' : '其他'
}

const submitData = reactive({
  name: '',
  sex: '',
  born: '',
  relation: '',
  id_card: '',
  phone: ''
})


const cancel = () => {
  uni.navigateBack()
}
const add = async () => {
  const res = await requestAPI.patientRes(submitData) as ResponseData
  if (res.statusCode === 200) {
    uni.navigateBack()
  }
}
</script>
<style>
@import url('../../../common-style/form.css');

page {
  background-color: #f6f6f6;
}

.AI-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  font-size: 35rpx;
  border-radius: 15rpx;
  padding: 30rpx 20rpx;
  margin: 20rpx 20rpx 50rpx 20rpx;
}

.AI-card image {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
  display: block;
}
</style>