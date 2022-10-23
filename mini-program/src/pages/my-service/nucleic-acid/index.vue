<template>
  <view class="xinguan-view" v-for="(item, index) in order" :key="index">
    <text class="name">{{ item.phy_name }}</text>
    <view class="xinguan-order">
      <text>检测人：</text>
      <text>{{ item.name }}</text>
    </view>
    <view class="xinguan-order">
      <text>检测地点：</text>
      <text>{{ item.address }}</text>
    </view>
    <view class="xinguan-order">
      <text>检测时间：</text>
      <text>{{ item.phy_time }}</text>
    </view>
    <view class="xinguan-order">
      <text>订单编号</text>
      <text>{{ item.order_number }}</text>
    </view>
    <view class="reg-price">
      <text>¥ {{ item.price }}</text>
    </view>

    <view class="reg-cancel">
      <text :class="item.cancel ? '' : 'prevent_style'" @click="cancel(item._id, index)">{{ item.cancel ? '取消预约' :
      '已取消预约' }}</text>
    </view>
  </view>
  <Point :show="show" />
  <view style="height: 100rpx"></view>
</template>
<script setup lang="ts">
import Point from '@/com-components/point.vue';
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { requestAPI } from '@/public/request';
import { NuataOrder, ResponseData } from '@/env';

// 获取订单数据
const order = ref<NuataOrder[]>([]);
const show = ref(false);

onShow(async () => {
  const res = await requestAPI.nuatauserOrder() as ResponseData;
  console.log(res);
  order.value = res.data.data;
  if (res.data.data.length == 0) {
    show.value = true;
  }
});

const cancel = async (id: string, index: number) => {
  const res = await requestAPI.nuataCancel({ _id: id }) as ResponseData;
  if (res.statusCode === 200) {
    order.value[index].cancel = false;
  }
};
</script>
<style>
@import url('../../../common-style/vaccine.css');
</style>
