<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { requestAPI } from '@/public/request';
import { ResponseData, PhyTerm, PhyData, FilterData } from '@/env';

const phyTerm = ref<PhyTerm[]>([]); // 筛选条件
const phyData = ref<PhyData[]>([]); // 套餐列表

onMounted(async () => {
  const res = await Promise.all([requestAPI.phyTerm(), requestAPI.physGet()]) as ResponseData[];
  console.log(res)
  phyTerm.value = res[0].data.data;
  phyData.value = res[1].data.data;
})

const conview = ref(false); // 控制筛选条件显示隐藏
const filterData = reactive<FilterData>({
  type: '',
  sales: '',
  price: ''
})

const selectType = (type: string) => {
  phyTerm.value[0].query_val = type;
  filterData.type = type;
  conview.value = false;
  queryResult()
}


const queryCombo = (index: number, value: string[]) => {
  if (index === 0) {
    conview.value = conview.value ? false : true;
  } else if (index === 1) {// 按销量查询
    filterData.sales = value[0]
    phyTerm.value[index].filter_val[0] = value[0] === 'desc' ? 'asc' : 'desc'
    queryResult()
  } else { // 按价格查询
    filterData.price = value[0]
    phyTerm.value[index].filter_val[0] = value[0] === 'desc' ? 'asc' : 'desc'
    queryResult()
  }
}

const queryResult = async () => {
  uni.showLoading({
    title: '加载中',
    mask: true
  })
  const res = await requestAPI.phyQuery(filterData) as ResponseData
  phyData.value = res.data.data
  if (res.statusCode === 200) {
    uni.hideLoading()
  }
}

const phyDetail = (id: string, title: string) => {
  uni.navigateTo({
    url: `/pages/phy-exam/detail?id=${id}&title=${title}`
  })
}


</script>

<template>
  <view class="Top-view">
    <view v-for="(item, index) in phyTerm" :key="index" @click="queryCombo(index,item.filter_val)">
      <text>{{item.query_val}}</text>
      <image :src="index===0?'/static/other/shaixuan-jiantou.png':'/static/other/shaixuan.png'" />
    </view>
  </view>
  <view style="height:100rpx"></view>
  <!-- 点击全部的筛选列表-->
  <view class="mask-view" v-show="conview"></view>
  <view class="con-view" v-show="conview">
    <block v-if="phyTerm.length>0">
      <text v-for="(item,index) in phyTerm[0].filter_val" :key="index" @click="selectType(item)">
        {{item}}
      </text>
    </block>
  </view>
  <!-- 体检列表 -->
  <view class="phy-exam-back" v-for="(item, index) in phyData" :key="index" @click="phyDetail(item._id,item.title)">
    <text class="phy-exam-type">{{item.title}}</text>
    <view class="phy-exam-flex">
      <image :src="item.image" mode="aspectFill" />
      <view>
        <text class="phy-exam-title">{{item.be_suit}}</text>
        <text class="phy-exam-label">{{item.describe}}</text>
      </view>
    </view>
    <view class="phy-exam-price">
      <text>已约 {{item.sales}}</text>
      <text>¥{{item.price}}</text>
    </view>
  </view>
  <view style="height:200rpx"></view>
</template>
<style>
page {
  background-color: #fafafa;
}

.Top-view {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50rpx;
  height: 100rpx;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.Top-view view {
  display: flex;
  align-items: center;
}

.Top-view image {
  width: 20rpx;
  height: 20rpx;
  display: block;
  padding-left: 10rpx;
}

/* 筛选条件 */
.mask-view {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 100rpx;
  background-color: rgba(0, 0, 0, 0.5);
}

.con-view {
  background-color: #ffffff;
  padding: 0 50rpx;
  position: fixed;
  top: 100rpx;
  left: 0;
  right: 0;
}

.con-view text {
  display: block;
  padding: 20rpx 0;
}

/* 体检套餐 */
.phy-exam-back {
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 10rpx;
}

.phy-exam-type {
  font-size: 35rpx;
  font-weight: bold;
}

.phy-exam-flex image {
  width: 200rpx;
  height: 200rpx;
  display: block;
}

.phy-exam-flex {
  display: flex;
  justify-content: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f6f6f6;
}

.phy-exam-flex view {
  flex: 1;
  padding-left: 20rpx;
}

.phy-exam-flex text {
  display: block;
}

.phy-exam-title {
  font-weight: bold;
  padding-bottom: 20rpx;
}

.phy-exam-label {
  color: #5555;
}

.phy-exam-price {
  display: flex;
  justify-content: space-between;
  padding-top: 20rpx;
  font-weight: bold;
  color: #ff5f2c;
}
</style>