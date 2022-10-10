<template>
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>姓名</text>
      <input
        type="text"
        placeholder="请输入姓名"
        placeholder-class="input-style"
      />
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input
        type="text"
        placeholder="请输入身份证"
        placeholder-class="input-style"
      />
    </view>
    <view class="xinguan-flex">
      <text>手机号</text>
      <input
        type="number"
        placeholder="请输入手机号"
        placeholder-class="input-style"
      />
    </view>
    <view class="xinguan-flex">
      <text>现居住地址</text>
      <picker mode="region" class="flex-left">
        <view>
          <text>请选择现居住地址</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>现居详细地址</text>
      <input
        type="text"
        placeholder="请输入现居详细地址"
        placeholder-class="input-style"
      />
    </view>
    <view class="xinguan-flex">
      <text>疫苗人群分类</text>
      <picker mode="selector" class="flex-left" :range="[1, 2, 3, 4]">
        <view>
          <text>请选择疫苗人群分类</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>

    <view>
      <view class="reserve-address">
        <text class="reserve-name">{{ timeData.data.Hospital }}</text>
        <text class="reserve-road">{{ timeData.data.address }}</text>
        <view class="reserve-title">
          <text v-for="(item, index) in timeData.data.company" :key="index">{{
            item
          }}</text>
        </view>
      </view>
    </view>

    <view class="Week" v-for="(item, index) in timeData.data.week" :key="index">
      <view class="Week-flex">
        <view class="Week-style Week-sup">
          <text>{{ item.day }}</text>
          <text>{{ item.date }}</text>
          <text>{{ item.Have }}</text>
        </view>
      </view>
    </view>

    <view
      class="period-view"
      v-for="(item, index) in timeData.data.lasting"
      :key="index"
    >
      <text class="period-title">{{ item.period }}</text>
      <view
        class="Week-flex"
        v-for="(item_a, index_a) in item.time"
        :key="index_a"
      >
        <view class="Week-style Week-Down">
          <text>{{ item_a.start_time }} - {{ item_a.end_time }} </text>
          <text>剩余 {{ item_a.over }}</text>
        </view>
      </view>
    </view>

    <view style="height: 100px"></view>
    <view class="submit">
      <text>取消</text>
      <text>提交预约</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import { requestAPI } from '@/public/request';
  import { NewAppTime } from '@/env';

  const timeData = reactive<{ data: NewAppTime }>({
    data: {
      Hospital: '',
      address: '',
      company: [],
      lasting: [],
      week: [],
    },
  });
  onMounted(async () => {
    const res = await requestAPI.newAppTime();
    console.log(res);
    timeData.data = res.data.data[0];
  });
</script>

<style>
  /* 表单提交 */
  @import url('../../common-style/form.css');
  page {
    background-color: #f7f7f7;
  }
  /* 预约地址 */
  .reserve-address {
    background-color: #ffffff;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 10rpx;
  }
  .reserve-address text {
    display: block;
  }
  .reserve-name {
    font-weight: bold;
  }
  .reserve-road {
    padding: 20rpx 0;
  }
  .reserve-title {
    display: flex;
    align-items: center;
  }
  .reserve-title text {
    background-color: #f7f7f7;
    padding: 5rpx 20rpx;
    font-size: 25rpx;
    margin-right: 10rpx;
  }
  .Week {
    background-color: #ffffff;
    padding: 20rpx;
    border-radius: 10rpx;
    margin: 20rpx;
    display: flex;
    align-items: center;
  }
  .Week-flex {
    display: flex;
  }
  .Week-style {
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
    text-align: center;
    padding: 20rpx 0;
    border-radius: 10rpx;
    margin-right: 20rpx;
  }
  .Week-style text {
    padding: 3rpx;
  }
  .Week-sup {
    width: 150rpx;
  }
  .period-view {
    background-color: #ffffff;
    padding: 20rpx;
    border-radius: 10rpx;
    margin: 20rpx;
  }
  .period-title {
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }
  .Week-Down {
    width: 200rpx;
  }
  /* 选中加上样式 */
  .checkstyle {
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
</style>
