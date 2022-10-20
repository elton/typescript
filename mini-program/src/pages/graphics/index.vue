<template>
  <view>
    <text>请详细描述您的病情</text>
    <textarea placeholder="为了更好获得医生帮助，请尽可能描述病情" maxlength="300" placeholder-class="textarea-color" :auto-focus="true" />
  </view>
</template>
<script setup lang="ts"></script>
<style scoped>
/* 表单提交 */
@import url('../../common-style/form.css');

page {
  background-color: #fafafa;
}

.graphics-back {
  background-color: #ffffff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
}

.graphics-Title {
  font-size: 35rpx;
  font-weight: bold;
  display: block;
  padding-bottom: 20rpx;
}

textarea {
  width: 100%;
  height: 250rpx;
}

.textarea-color {
  color: #00c8c8;
}

/* 上传图片 */
.pat-image {
  display: flex;
  flex-wrap: wrap;
}

.pat-image view {
  width: calc(33.3% - 5rpx*2);
  height: 200rpx;
  margin: 5rpx;
}

.pat-image image {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 7rpx;
}

.upload-Image {
  position: relative;
}

.upload-Image image:nth-child(2) {
  width: 30rpx !important;
  height: 30rpx !important;
  position: absolute;
  top: 0;
  right: 0;
}

/* 选择就诊人 */
.patient-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.patient-view image {
  width: 120rpx;
  height: 120rpx;
}

.patient-view text:nth-child(2) {
  flex: 1;
  padding: 0 50rpx;
  font-weight: bold;
}

.patient-view text:nth-child(3) {
  color: #2c76ef;
}
</style>