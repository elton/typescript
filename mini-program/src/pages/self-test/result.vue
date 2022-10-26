import { aiCardURL } from '../../public/request';
<template>
  <view class="back-color">
    <view class="result-top">
      <text>结果分析</text>
      <text>本测试级结果由AI得出，仅供参考，不能作为诊断及治疗的依据</text>
    </view>
    <view class="result-desc" v-for="(item, index) in testResult" :key="index">
      <view>{{ item.scope }}:{{ item.result }}</view>
      <view>{{ item.suggest }}</view>
      <view class="bold">测评结果概述：</view>
      <view v-for="(item_a, index_a) in item.outline" :key="index_a">
        {{ index_a + 1 }}.{{ item_a }}
      </view>
      <block v-if="item.recommend.length > 0">
        <view class="bold">AI 为你推荐以下科室</view>
        <view class="recommend" v-for="(item_a, index_a) in item.recommend" :key="index_a">
          <label>
            <text class="bold">{{ item_a.dep_name }}</text>
            <text class="Hosp">{{ item_a.hospital }}</text>
          </label>
          <label class="regi">去挂号</label>
        </view>
      </block>
    </view>
  </view>

  <view class="exceed"></view>
  <view class="submit">
    <button plain="true" open-type="share">邀请朋友测一测</button>
    <button plain="true" @click="tryAgain">再测一次</button>
  </view>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import { onShow, onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import { requestAPI } from '@/public/request';
import { TestResult, ShareDataType } from '@/env';
import { ShareData } from '@/public/testing';


const topicIds = ref<string[]>([])
const typeId = ref('')

const testResult = ref<TestResult[]>([])

let shareData = ref<ShareDataType[]>([])

onLoad((options) => {
  console.log(options);
  const { type, topic_id } = options as { type: string, topic_id: string };
  topicIds.value = topic_id.split(',');
  typeId.value = type

  shareData.value = ShareData.filter(item => item.type === type)
});

onShow(async () => {
  let res: { data: { data: TestResult[] } } = { data: { data: [] } }
  if (typeId.value === '001') { // 抑郁症
    res = await requestAPI.depression({ value: topicIds.value })
  } else if (typeId.value === '002') { // 早泄
    res = await requestAPI.premature({ value: topicIds.value })
  } else if (typeId.value === '003') { // 失眠
    res = await requestAPI.insomnia({ value: topicIds.value })
  }
  testResult.value = res.data.data
})

const tryAgain = () => {
  uni.navigateBack()
}

onShareAppMessage(() => {
  return {
    title: shareData.value[0].share_title,
    path: shareData.value[0].share_path,
    imageUrl: shareData.value[0].share_url
  }
})

</script>
  
<style>
@import url('../../common-style/form.css');

page {
  background: #f0f5f9;
}

.back-color {
  background: -webkit-linear-gradient(top, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.result-top {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
}

.result-top text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  padding-bottom: 20rpx;
}

.result-desc {
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 20rpx;
  padding: 20rpx;
}

.result-desc view {
  margin-bottom: 20rpx;
  line-height: 1.5;
}

.result-desc view:nth-child(1) {
  font-size: 40rpx;
  font-weight: bold;
  color: #0d7cff;
}

.result-desc view:nth-child(2) {
  color: #0d7cff;
}

.bold {
  font-weight: bold;
  display: block;
}

.recommend {
  background-color: #f4f7fa;
  border-radius: 10rpx;
  padding: 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
}

.Hosp {
  color: #bac5cc;
}

.regi {
  align-self: center;
  background-color: #0176ff;
  color: #ffffff;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
}

.exceed {
  height: 300rpx;
  background: #f0f5f9;
}
</style>