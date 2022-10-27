<template>
  <view class="video-view" v-for="(item, index) in videoData" :key="index">
    <view class="video-area">
      <video :src="item.video_url" :id="item._id" :controls="item.controls" :show-center-play-btn="false"
        object-fit=" cover" :title="item.video_title" />
      <text class="video-title">{{ item.video_title }}</text>
      <image src="/static/other/video-bofang.png" mode="widthFix" v-if="item.play_but"
        @click="playVideo(index, item._id)" />
    </view>
    <view class="video-name">
      <image :src="item.avatar" mode="widthFix" />
      <text>{{ item.name }}</text>
    </view>
  </view>
  <!-- loading icon -->
  <view class="Loading" v-if="loading">
    <image src="/static/other/loading.svg" mode="widthFix" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { requestAPI } from '@/public/request'
import { VideoData } from '@/env';
import { onReachBottom, onShow } from '@dcloudio/uni-app';

const videoData = ref<VideoData[]>([])
let loading = ref(false)
let numOfPage = ref(0)
let videoId = ref('')
let videoIndex = ref(-1)

onMounted(async () => {
  console.log('onMounted')
  await fetchVideoData(numOfPage.value)
})

const fetchVideoData = async (page: number) => {
  const res = await requestAPI.videoList({ page }) as { data: { data: VideoData[] } }
  console.log(res);
  videoData.value = [...videoData.value, ...res.data.data]
}

onReachBottom(async () => {
  console.log('onReachBottom')
  if (numOfPage.value < 4) {
    numOfPage.value++
    loading.value = true
    await fetchVideoData(numOfPage.value)
    loading.value = false
  }
})

onShow(() => {
  uni.createVideoContext(videoId.value).pause()
})

const playVideo = (index: number, id: string) => {
  videoData.value[index].controls = true
  videoData.value[index].play_but = false
  play(index, id)
}

const play = (index: number, id: string) => {
  if (videoId.value === '') {
    videoId.value = id
    videoIndex.value = index
    uni.createVideoContext(videoId.value).play()
  } else {
    if (videoId.value === id) {
      uni.createVideoContext(videoId.value).play()
    } else {
      uni.createVideoContext(videoId.value).pause()
      videoData.value[videoIndex.value].play_but = true
      videoData.value[videoIndex.value].controls = false

      videoId.value = id
      videoIndex.value = index
      uni.createVideoContext(videoId.value).play()
    }
  }
}
</script>



<style>
page {
  background: #f5f5f5;
}

.video-view {
  background-color: #ffffff;
  margin-bottom: 30rpx;
}

.video-area {
  height: 400rpx;
  position: relative;
}

.video-area video {
  height: 400rpx;
  width: 100%;
  display: block;
}

.video-area image {
  width: 100rpx;
  height: 100rpx;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.video-title {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  right: 20rpx;
  z-index: 99;
  color: #ffffff;
  font-size: 35rpx;
  font-weight: bold;
}

.video-name {
  display: flex;
  align-items: center;
  padding: 20rpx;
}

.video-name image {
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin-right: 20rpx;
  border-radius: 50%;
}

/* loading */
.Loading {
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Loading image {
  display: block;
  width: 70rpx;
  height: 70rpx;
  animation: myfirst 1s infinite linear;
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>
