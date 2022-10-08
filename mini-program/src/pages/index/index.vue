<!-- eslint-disable semi -->
<!-- eslint-disable indent -->
<template>
  <!-- 自定义的导航 -->
  <view class="navigation">
    <view class="nav-top"></view>
    <view class="nav-height">某某省第一人民医院</view>
  </view>
  <view class="yuyue">
    <image
      src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/nav-yiyu.png"
      mode="aspectFill"
    />
  </view>
  <!-- 疫苗预约 -->
  <view class="gongge">
    <view v-for="(item, index) in vaccine" :key="index">
      <image :src="item.image" mode="aspectFit" />
      <text>{{ item.title }}</text>
    </view>
  </view>
  <!-- 挂号与体检 -->
  <view class="re-me-ex">
    <view class="re-me-ex-view" v-for="(item, index) in pyhdata" :key="index">
      <text class="re-me-ex-title">{{ item.title }}</text>
      <text class="re-me-ex-lable">{{ item.describe }}</text>
      <image :src="item.image" mode="widthFix" />
    </view>
  </view>
  <!-- 热门挂号 -->
  <view class="online-title">
    <view>热门挂号</view>
    <view class="online-More">
      <text>查看更多</text>
      <image src="/static/other/gengduo.svg"></image>
    </view>
  </view>
  <view class="online-reg">
    <view
      v-for="(item, index) in registered"
      :key="index"
      :style="'background-color:' + item.background"
    >
      <text>{{ item.title }}</text>
      <image :src="item.image" mode="aspectFit" />
    </view>
  </view>

  <!-- 健康自测 -->
  <view class="online-title">
    <view>健康自测</view>
  </view>
  <view class="self-test" v-if="seltTest.length > 0">
    <view
      class="sele-test-top sele-test-flex sele-test-one sele-test-back"
      v-for="(item, index) in [seltTest[0]]"
      :key="index"
    >
      <view class="sele-test-view">
        <text class="top-title">{{ item.name }}</text>
        <text class="top-lable">{{ item.describe }}</text>
        <view class="top-people">
          <text class="top-num">{{ item.number_of_people }}</text>
          <text class="top-min top-lable"
            >人测过 / {{ item.question }}题 / {{ item.minute }}分钟</text
          >
        </view>
      </view>
      <image class="top-img" mode="widthFix" :src="item.image"></image>
    </view>
    <view
      class="sele-test-top sele-test-flex sele-test-back"
      v-for="(item, index) in seltTest.slice(1)"
      :key="index"
    >
      <view class="sele-test-view">
        <text class="top-title">{{ item.name }}</text>
        <text class="top-lable top-min"
          >{{ item.question }}题 / {{ item.minute }}分钟</text
        >
        <view class="top-people">
          <text class="top-num">{{ item.number_of_people }}</text>
          <text class="top-min top-lable">人测过</text>
        </view>
      </view>
      <image
        class="top-img bottom-img"
        mode="widthFix"
        :src="item.image"
      ></image>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { requestAPI } from '@/public/request';
  import { Popular, Reserve, SelfTest, Vaccine } from '@/env';

  let menuTop = ref<string>('');
  let menuHeight = ref<string>('');

  // 首页第一项数据：疫苗预约
  const vaccine = ref<Vaccine[]>([]);
  // 首页第二项数据：挂号与体检
  const pyhdata = ref<Reserve[]>([]);
  // 首页第三项数据：热门挂号
  const registered = ref<Popular[]>([]);
  // 首页第四项数据：健康自测
  const seltTest = ref<SelfTest[]>([]);

  // 取出胶囊按钮位置数据
  onMounted(() => {
    const menuButton = uni.getStorageSync('menuButton');
    menuTop.value = menuButton.top + 'px';
    menuHeight.value = menuButton.height + 'px';

    pageData();
  });

  // 请求首页数据
  const pageData = async () => {
    const res = await requestAPI.frontpage();
    console.log(res);
    vaccine.value = res.data.data[0].vaccine;
    pyhdata.value = res.data.data[1].reserve;
    registered.value = res.data.data[2].popular;
    seltTest.value = res.data.data[3].self_test;
  };
</script>

<style scoped>
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    height: var(--status-bar-height);
    width: 100%;
  }
  .nav-top {
    height: v-bind('menuTop');
  }
  .nav-height {
    height: v-bind('menuHeight');
    line-height: v-bind('menuHeight');
    padding-left: 20rpx;
    color: #fff;
    font-weight: bold;
    font-size: 35rpx;
  }
  .yuyue image {
    width: 100%;
    display: block;
    height: 550rpx;
  }
  .gongge {
    display: flex;
    justify-content: space-between;
    margin: 40rpx 30rpx;
  }
  .gongge image {
    width: 50rpx;
    height: 50rpx;
    display: block;
    padding-bottom: 20rpx;
  }
  .gongge view {
    /* width: calc(20% - 10rpx*2); */
    /* margin: 10rpx; */
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 28rpx;
  }
  .re-me-ex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx;
  }
  .re-me-ex-view {
    position: relative;
    height: 200rpx;
    width: 48%;
  }
  .re-me-ex-view image {
    width: 150rpx;
    display: block;
    position: absolute;
    bottom: 0;
    right: 20rpx;
  }
  .re-me-ex view:nth-child(1) text:nth-child(1) {
    color: #0042ff;
  }
  .re-me-ex view:nth-child(2) text:nth-child(1) {
    color: #dc6200;
  }
  .re-me-ex view:nth-child(1) {
    background-image: linear-gradient(to right, #d7dfff 10%, #5a9fff 100%);
    border-radius: 20rpx;
  }
  .re-me-ex view:nth-child(2) {
    background-image: linear-gradient(to right, #ffdbb4 10%, #ffc56b 100%);
    border-radius: 20rpx;
  }
  .re-me-ex-title {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    font-size: 40rpx;
  }
  .re-me-ex-lable {
    font-size: 30rpx;
    color: #ffffff;
    position: absolute;
    top: 90rpx;
    left: 20rpx;
  }
  /* 在线挂号 */
  .online-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40rpx 10rpx 10rpx 10rpx;
    font-weight: bold;
  }
  .online-title view:nth-child(1) {
    font-size: 35rpx;
  }
  .online-More {
    display: flex;
    align-items: center;
  }
  .online-More image {
    width: 40rpx;
    height: 40rpx;
    display: block;
    margin-left: 10rpx;
  }
  .online-reg {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 10rpx 0;
  }
  .online-reg image {
    width: 50rpx;
    height: 70rpx;
  }
  .online-reg view {
    width: calc(33% - 30rpx * 2);
    margin: 10rpx;
    padding: 20rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    justify-content: space-between;
    border-radius: 10rpx;
  }
  /* 健康自测 */
  .self-test {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .sele-test-top {
    display: flex;
    justify-content: space-between;
  }
  .sele-test-flex {
    width: calc(50% - 10rpx * 2);
    margin: 10rpx;
    border-radius: 20rpx;
    overflow: hidden;
    position: relative;
    height: 250rpx;
  }
  .sele-test-one {
    width: 100%;
  }
  .sele-test-back {
    background-color: #ffffff;
    box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
  }
  .top-lable {
    color: #a6abb0;
  }
  .top-img {
    width: 250rpx;
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .bottom-img {
    width: 170rpx !important;
  }
  .self-test text {
    display: block;
  }
  .sele-test-view {
    position: absolute;
    left: 20rpx;
    top: 35rpx;
  }
  .top-people {
    display: flex;
    align-items: baseline;
    padding-top: 30rpx;
  }
  .top-title {
    padding-bottom: 10rpx;
    font-size: 35rpx;
  }
  .top-num {
    font-size: 35rpx;
    padding-right: 10rpx;
  }
  .top-min {
    font-size: 25rpx;
  }
</style>
