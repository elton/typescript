<template>
  <view class="hpv-img">
    <image
      src="https://qita-1252107261.cos.ap-chengdu.myqcloud.com/yiliao/gongjinai.jpg"
      mode="aspectFill"
    />
  </view>

  <!-- 筛选导航 -->
  <view class="tab-view">
    <view
      class="tab-toggle"
      v-for="(item, index) in hpvSelect"
      :key="index"
      @click="toggle(item._id, index)"
    >
      <text>{{ item.name }}</text>
      <text :class="index === checked ? 'checked' : ''"></text>
    </view>
  </view>

  <!-- 疫苗列表 -->
  <view class="hpv-list" v-for="(item, index) in hpvList" :key="index">
    <view>
      <view class="hpv-type">{{ item.name }}</view>
      <view
        class="hpv-age"
        v-for="(item_a, index_a) in item.describe"
        :key="index_a"
      >
        <text>{{ item_a }}</text>
      </view>
      <view class="hpv-price">¥{{ item.price[0] }} - ¥{{ item.price[1] }}</view>
    </view>
    <view class="hpv-reserve">去预约</view>
  </view>

  <view style="height: 100rpx"></view>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { requestAPI } from '@/public/request';
  import { HpvSelect, HpvList } from '@/env';

  const hpvSelect = ref<HpvSelect[]>([]);
  const hpvList = ref<HpvList[]>([]);
  const hpvAll = ref<HpvList[]>([]);
  const checked = ref(0);

  onMounted(async () => {
    const res = await requestAPI.otuHpv();
    console.log(res);
    hpvSelect.value = res.data.data[0].hpv_select;
    hpvAll.value = res.data.data[0].hpv_list;
    hpvList.value = res.data.data[0].hpv_list;
  });

  const toggle = (id: string, index: number) => {
    hpvList.value = hpvAll.value.filter((item) => item.hpv_id === id);
    console.log(hpvList.value);
    checked.value = index;
  };
</script>
<style scoped>
  page {
    background-color: #fafafa;
  }
  .hpv-img {
    height: 350rpx;
  }
  .hpv-img image {
    height: 350rpx;
    width: 100%;
    display: block;
  }
  /* tab切换 */
  .tab-view {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
  }
  .tab-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100rpx;
    justify-content: center;
    position: relative;
  }
  .checked {
    width: 50rpx;
    height: 8rpx;
    background-color: #0d7cff;
    position: absolute;
    bottom: 0;
  }
  /* 疫苗列表 */
  .hpv-list {
    background-color: #ffffff;
    margin: 20rpx;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    border-radius: 20rpx;
  }
  .hpv-type {
    font-size: 35rpx;
  }
  .hpv-age {
    display: flex;
    align-items: center;
  }
  .hpv-age text {
    background-color: #f4f6fa;
    padding: 7rpx;
    font-size: 25rpx;
    margin: 10rpx 10rpx 10rpx 0;
  }
  .hpv-price {
    font-weight: bold;
    color: #ff5f2c;
  }
  .hpv-reserve {
    align-self: flex-end;
    background-color: #0d7cff;
    padding: 15rpx 30rpx;
    border-radius: 40rpx;
    color: #ffffff;
  }
</style>
