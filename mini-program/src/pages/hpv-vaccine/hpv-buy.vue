<template>
  <view class="hpv-choose">
    <view>
      <view class="hpv-type">{{ routerValue.name }}</view>
      <view class="hpv-age">
        <text v-for="(item, index) in routerValue.describe" :key="index">{{
          item
        }}</text>
      </view>
    </view>
    <view class="hpv-price"
      >¥{{ routerValue.price[0] }}-¥{{ routerValue.price[1] }}</view
    >
  </view>

  <!-- 表单填写 -->
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input
        placeholder="请输入真实姓名"
        placeholder-class="input-style"
        v-model="submitData.name"
      />
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input
        placeholder="请输入身份证号码"
        placeholder-class="input-style"
        v-model="submitData.id_card"
      />
    </view>
    <view class="xinguan-flex">
      <text>性别</text>
      <picker
        mode="selector"
        :range="['男', '女']"
        class="flex-left"
        @change="changeSelector"
      >
        <view>
          <text>{{ gender === '' ? '请选择性别' : gender }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date" class="flex-left" @change="changeDate">
        <view>
          <text>{{ birthday === '' ? '请选择出生日期' : birthday }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>手机号</text>
      <input
        placeholder="请输入手机号"
        type="number"
        placeholder-class="input-style"
        v-model="submitData.phone"
      />
    </view>
  </view>

  <!-- 选择套餐 -->
  <view class="combo-view">
    <block v-for="(item, index) in hpvComboName" :key="index">
      <text class="combo-title">{{ item.title }}</text>
      <view class="combo-list">
        <text
          v-for="(item_a, index_a) in item.name"
          :key="index_a"
          :class="index_a === combo ? 'checkstyle' : ''"
          @click="changeCombo(index_a, item_a.combo_id, item_a.combo)"
          >{{ item_a.combo }}</text
        >
      </view>
    </block>

    <block v-for="(item, index) in hpvComboTime" :key="index">
      <text class="combo-title">{{ item.title }}</text>
      <view class="combo-list">
        <text
          v-for="(item_a, index_a) in item.name"
          :key="index_a"
          :class="index_a === time ? 'checkstyle' : ''"
          @click="changeTime(index_a, item_a.time_id, item_a.time)"
          >{{ item_a.time }}</text
        >
      </view>
    </block>
  </view>

  <view style="height: 100rpx"></view>
  <!-- 提交 -->
  <view class="Total-view">
    <text>合计：¥{{ hpvComboPrice }}</text>
    <text @click="submit">提交</text>
  </view>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, toRefs } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { requestAPI } from '@/public/request';
  import { HpvCombName, HpvCombTime } from '@/env';

  const hpvComboName = ref<HpvCombName[]>([]);
  const hpvComboTime = ref<HpvCombTime[]>([]);

  const routerValue = reactive({
    id: '',
    name: '',
    price: [''],
    describe: [''],
  });

  onLoad(async (event) => {
    console.log(event);
    const { id, name, price, describe } = JSON.parse(event.value as string);
    routerValue.id = id;
    routerValue.name = name;
    routerValue.price = price;
    routerValue.describe = describe;

    const res = await requestAPI.hpvPack();
    hpvComboName.value = [res.data.data[0]];
    hpvComboTime.value = [res.data.data[1]];
    console.log(res);
  });

  const combo = ref(-1);
  const comboId = ref('');
  const comboName = ref('');
  const time = ref(-1);
  const timeId = ref('');
  const comboTime = ref('');
  const hpvComboPrice = ref(0.0);

  const changeCombo = (index: number, id: string, name: string) => {
    combo.value = index;
    comboId.value = id;
    comboName.value = name;
  };
  const changeTime = (index: number, id: string, name: string) => {
    time.value = index;
    timeId.value = id;
    comboTime.value = name;
  };

  //"8d33255162dc5b22001ef71c302a450b"
  // 监听选中套餐名称和接种时间选择状态
  watch([comboId, timeId], (newVal, preVal) => {
    if (newVal[0] && newVal[1]) {
      uni.showLoading({
        title: '获取价格',
        mask: true,
      });
      hpvPrice();
    }
  });

  // 请求套餐价格
  const hpvPrice = async () => {
    const res = await requestAPI.hpvPrice({
      hpv_id: routerValue.id,
      combo_id: comboId.value,
      time_id: timeId.value,
    });
    hpvComboPrice.value = res.data.data[0].price;
    uni.hideLoading();
  };

  // 选择性别
  const gender = ref('');
  const changeSelector = (e: any) => {
    gender.value = e.detail.value === '0' ? '男' : '女';
  };

  // 选择出生日期
  const birthday = ref('');
  const changeDate = (e: any) => {
    birthday.value = e.detail.value;
  };

  // 提交
  const submitData = reactive({
    name: '',
    id_card: '',
    gender,
    born_date: birthday,
    phone: '',
    combo: comboName,
    ino_time: comboTime,
    price: hpvComboPrice,
    hpv_name: toRefs(routerValue).name, // 放入另外一个reactive对象中，需要先将另外一个reactive转换为ref
  });

  const submit = async () => {
    const res = await requestAPI.resHpv(submitData);
    uni.showLoading({
      title: '提交中',
      mask: true,
    });
    console.log(res);
    if (res.statusCode === 200) {
      uni.hideLoading();
      uni.redirectTo({
        url: '/pages/my-service/hpv-view/index',
      });
    }
  };
</script>

<style>
  /* 表单提交 */
  @import url('../../common-style/form.css');
  page {
    background-color: #fafafa;
  }
  .hpv-choose {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    padding: 20rpx;
    margin-bottom: 40rpx;
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
  /* 套餐 */
  .combo-view {
    background-color: #ffffff;
    padding: 20rpx;
    margin: 20rpx 0;
  }
  .combo-title {
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }
  .combo-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .combo-list text {
    padding: 20rpx 40rpx;
    background-color: #f5f5f5;
    margin: 0 20rpx 20rpx 0;
    border-radius: 10rpx;
    display: block;
  }
  /* 选中加上样式 */
  .checkstyle {
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
</style>
