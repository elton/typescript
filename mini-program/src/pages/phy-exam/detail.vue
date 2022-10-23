<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive } from 'vue';
import { requestAPI } from '@/public/request'
import { ResponseData, PhyDetail, PatientData } from '@/env'
import SeMember from '@/com-components/se-member.vue'

const phyDetailData = ref<PhyDetail[]>([])

onLoad(async (event: any) => {
  const res = await requestAPI.phyDetail({ id: event.id }) as ResponseData
  phyDetailData.value = res.data.data
  patientData.phy_name = event.title
})

const timeIndex = ref(-1)

const patientData = reactive<PatientData>({
  phy_name: '',
  phy_time: '',
  show: true
})

// 子组件的名称，跟子组件中的ref属性值一致
const selectPatientComponent = ref()

// 调用子组件方法
const selectPatient = () => {
  selectPatientComponent.value.trigger(patientData)
}

</script>

<template>
  <view class="details-Top" v-for="(item,index) in phyDetailData" :key="index">
    <image :src="item.image" mode="aspectFill" />
    <view class="details-price">
      <text>¥{{item.price}}</text>
      <text>已约 {{item.sales}}</text>
    </view>
    <text class="details-Title">{{item.title}}</text>
  </view>

  <!-- 预约时段 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">体检时间选择</text>
    <scroll-view scroll-x="true" class="scroll-view_H">
      <view class="nucleic-time-flex">
        <block v-for="(item,index) in phyDetailData" :key="index">
          <view v-for="(item_a,index_a) in item.date" :key="index_a" :class="index_a=== timeIndex?'checkstyle':''"
            @click="timeIndex=index_a; patientData.phy_time = item_a.date">
            <text>{{item_a.date}}</text>
            <text>{{item_a.week}}</text>
          </view>
        </block>
      </view>
    </scroll-view>
  </view>

  <!-- 试用人群 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">试用人群</text>
    <view class="nucleic-crowd">
      <block v-for="(item,index) in phyDetailData" :key="index">
        <view v-for="(item_a, index_a) in item.crowd" :key="index_a">
          <image :src="item_a.image" mode="aspectFill" />
          <text>{{item_a.name}}</text>
        </view>
      </block>
    </view>
  </view>

  <!-- 套餐项目 -->
  <view class="nucleic-time">
    <view class="nucleic-Title">套餐项目</view>
    <view class="project-view" v-for="(item,index) in phyDetailData" :key="index">
      <block v-for="(item_a,index_a) in item.project" :key="index_a">
        <text class="project-Title">{{item_a.title}}</text>
        <view class="project-card" v-for="(item_b,index_b) in item_a.content" :key="index_b">
          <view>{{item_b.thing}}</view>
          <view>{{item_b.details}}</view>
        </view>
      </block>
    </view>
  </view>


  <!-- 提交 -->
  <view style="height:200rpx"></view>
  <view class="Total-view">
    <text v-if="phyDetailData.length>0">检测费用：{{phyDetailData[0].price}}</text>
    <text @click="selectPatient">选择成员</text>
  </view>

  <!-- 弹窗选择成员 -->
  <SeMember ref="selectPatientComponent" />
</template>

<style>
/* 表单提交 */
@import url('../../common-style/form.css');
/* 预约时间段 */
@import url('../../common-style/nucleic-time.css');

page {
  background-color: #fafafa;
}

/* 顶部 */
.details-Top {
  background-color: #ffffff;
}

.details-Top image {
  width: 100%;
  height: 400rpx;
  display: block;
}

.details-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
}

.details-price text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  color: #ff5f2c;
}

.details-Title {
  padding: 0 0 20rpx 20rpx;
  display: block;
  font-weight: bold;
  font-size: 35rpx;
}

/* 适用人群 */
.nucleic-crowd {
  display: flex;
  justify-content: space-between;
  padding-top: 20rpx;
}

.nucleic-crowd view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nucleic-crowd image {
  width: 100rpx;
  height: 100rpx;
  display: block;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
}

/* 套餐项目 */
.project-Title {
  background-color: #f0f2f8;
  display: block;
  border-radius: 10rpx;
  font-weight: bold;
  text-align: center;
  padding: 20rpx 0;
  margin: 20rpx 0;
}

.project-card {
  display: flex;
  flex-wrap: wrap;
}

.project-card view {
  margin: 5rpx;
  background-color: #f0f2f8;
  border-radius: 10rpx;
  padding: 20rpx 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card view:nth-child(1) {
  width: 200rpx;
  margin-left: auto;
}

.project-card view:nth-child(2) {
  flex: 1;
  margin-right: auto;
}

/* 选中加上样式 */
.checkstyle {
  background-color: #2c76ef !important;
  color: #ffffff !important;
}
</style>