<template>
  <view class="progress-box">
    <text>测评进度</text>
    <progress :percent="percent" border-radius="40" stroke-width="9" color="#cce3ff" activeColor="#2d8dfe" active="true"
      active-mode="forwards" class="progress" />
    <text>{{ numberOfTopic >= total ? total : numberOfTopic + 1 }}/{{ total }}</text>
  </view>

  <view class="question">{{ topic.data.topic }}</view>
  <view class="topic-view">
    <view class="topic-Title">
      <text></text>
      <text>单选题</text>
    </view>
    <view class="totic" hover-class="hover-style" hover-stay-time="300" v-for="(item, index) in topic.data.options"
      :key="index" @click="choose(item.son_id)">{{ item.title }}</view>
  </view>
</template>
  
<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { onShow, onLoad } from '@dcloudio/uni-app';
import { requestAPI } from '@/public/request';
import { Topic } from '@/env';

// 判断请求哪个接口，‘001’为抑郁症，‘002’为早泄，‘003’为失眠
const jude_value = ref('');
const topics = ref<Topic[]>([]);
const topic = reactive<{ data: Topic }>({
  data: {
    topic: '',
    _id: '',
    options: [{
      son_id: '',
      title: '',
    }]
  }
})
const numberOfTopic = ref(0);
const total = ref(0);
const percent = ref(0);
const topicIds = reactive<{ value: string[] }>({ value: [] });

// 获取上个页面的参数
onLoad((options) => {
  console.log(options);
  const { type, name } = options as { type: string, name: string };
  jude_value.value = type;
  uni.setNavigationBarTitle({
    title: name
  });
});

onShow(async () => {
  // reset last result
  numberOfTopic.value = 0;
  percent.value = 0;
  topicIds.value = [];

  let res: any
  // 获取题目
  if (jude_value.value === '001') {
    res = await requestAPI.depressionTopics() as { data: { data: Topic[] } }
    console.log(res)
  }

  if (jude_value.value === '002') {
    res = await requestAPI.prematureTopics() as { data: { data: Topic[] } }
  }


  if (jude_value.value === '003') {
    res = await requestAPI.insomniaTopics() as { data: { data: Topic[] } }
  }

  topics.value = res.data.data
  total.value = topics.value.length
  topic.data = topics.value[0]
  percent.value = 100 / total.value * 1
});

const choose = (id: string) => {
  numberOfTopic.value++
  if (topicIds.value.length < total.value) {
    topicIds.value.push(id)
  }
  if (numberOfTopic.value >= total.value) {
    console.log("topicIds", topicIds.value);
    uni.navigateTo({
      url: `/pages/self-test/result?type=${jude_value.value}&topic_id=${topicIds.value}`
    })
  } else {
    percent.value = 100 / total.value * (numberOfTopic.value + 1)
    topic.data = topics.value[numberOfTopic.value]
  }
}
</script>
  
<style>
page {
  background: linear-gradient(to bottom, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}

.progress-box {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.progress {
  flex: 1;
  padding: 0 40rpx;
}

.question {
  padding: 30rpx 20rpx;
  margin: 40rpx 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
}

.topic-view {
  background-color: #f3f8ff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin: 20rpx;
  box-shadow: #d6e8ff 0px 0px 23rpx 5rpx;
}

.topic-Title {
  display: flex;
  align-items: center;
}

.topic-Title text:nth-child(1) {
  width: 8rpx;
  height: 27rpx;
  background-color: #0d7cff;
  display: block;
  margin-right: 10rpx;
}

.totic {
  background: #ffffff;
  margin: 20rpx 0;
  padding: 40rpx 10rpx;
  border-radius: 10rpx;
}

.hover-style {
  background-color: #ebf4ff;
  color: #298cff;
}
</style>