<template>
  <view class="xinguan-view" v-for="(item, index) in order" :key="index">
    <text class="name">{{ item.name }}</text>
    <view class="xinguan-order">
      <text>接种地点</text>
      <text>{{ item.address }}</text>
    </view>
    <view class="xinguan-order">
      <text>疫苗厂商</text>
      <text>{{ item.company }}</text>
    </view>
    <view class="xinguan-order">
      <text>接种时间</text>
      <text>{{ item.date }} {{ item.period }}</text>
    </view>

    <view class="reg-cancel">
      <text
        :class="item.cancel ? '' : 'prevent_style'"
        @click="cancel(item._id, index)"
        >{{ item.cancel ? '取消预约' : '已取消预约' }}</text
      >
    </view>

    <!-- 提示组件 -->
    <point :show="show" />
    <view style="height: 200rpx"></view>
  </view>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { onShow } from '@dcloudio/uni-app';
  import { requestAPI } from '@/public/request';
  import { CovidTestOrder } from '@/env';
  import point from '@/com-components/point.vue'; // 引入提示组件

  // 获取订单数据
  const order = ref<CovidTestOrder[]>([]);
  let show = ref(false);

  onShow(async () => {
    const res = await requestAPI.covidOrder();
    order.value = res.data.data;
    if (order.value.length === 0) {
      show.value = true;
    }
  });

  // 取消订单
  const cancel = async (id: string, index: number) => {
    const res = await requestAPI.covidCancel({ _id: id });
    if (res.statusCode === 200) {
      order.value[index].cancel = false;
    }
  };
</script>
<style scoped>
  @import url('../../../common-style/vaccine.css');
</style>
