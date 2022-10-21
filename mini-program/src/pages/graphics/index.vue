<template>
  <view class="graphics-back">
    <text class="graphics-Title">请详细描述您的病情</text>
    <textarea placeholder="为了更好获得医生帮助，请尽可能描述病情" maxlength="300" placeholder-class="textarea-color" :auto-focus="true"
      v-model="submitData.illness" />
  </view>
  <view class="graphics-back">
    <checkbox-group @change="checkboxChange">
      <label>
        <checkbox value="cb" color="#0176ff" :checked="submitData.guide" />需要医生指导用药
      </label>
    </checkbox-group>
  </view>

  <!-- 上传图片 -->
  <view class="graphics-back">
    <text class="graphics-Title">上传检查报告或患处照片</text>
    <view class="pat-image">
      <view class="upload-Image" v-for="(item, index) in submitData.ins_report" :key="index">
        <image :src="item" mode="aspectFill" />
        <image src="/static/other/shanchu-goods.svg" mode="aspectFix" @click="submitData.ins_report.splice(index,1)" />
      </view>
      <view>
        <image src="/static/other/shuxing-img.png" mode="aspectFill" @click="upload()" />
      </view>
    </view>
  </view>

  <view class="graphics-back">
    <text class="graphics-Title" @click="choosePatient">选择就诊人</text>
    <view class="patient-view">
      <image src="/static/other/touxiang.svg" mode="widthFix" />
      <text>张三</text>
      <text>选择就诊人</text>
    </view>
  </view>

  <view style="height:200rpx"></view>
  <view class="submit">
    <text>取消</text>
    <text>提交</text>
  </view>
</template>
<script setup lang="ts">
import { uploadImage } from "@/public/misc";
import { ref, reactive } from 'vue';
import { uploadURL } from "@/public/request";
import { Graphics } from '@/env';

const upload = async () => {
  const res: any = await uploadImage(uploadURL, '上传中', '上传失败')
  console.log(JSON.parse(res.data).data)
  submitData.ins_report.push(JSON.parse(res.data).data)
}

const submitData = reactive<Graphics>({
  illness: '',
  guide: false,
  ins_report: [],
  patient_id: ''
})

const checkboxChange = (event: { detail: { value: string[] } }) => {
  submitData.guide = event.detail.value.length > 0
}

const choosePatient = () => {
  uni.navigateTo({
    url: '/pages/my-service/my-patient/my-patient'
  })
}

</script>
<style>
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