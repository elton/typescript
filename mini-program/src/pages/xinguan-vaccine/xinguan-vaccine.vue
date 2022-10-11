<template>
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>姓名</text>
      <input
        type="text"
        placeholder="请输入姓名"
        placeholder-class="input-style"
        v-model="pendingData.name"
      />
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input
        type="text"
        placeholder="请输入身份证"
        placeholder-class="input-style"
        v-model="pendingData.id_card"
      />
    </view>
    <view class="xinguan-flex">
      <text>手机号</text>
      <input
        type="number"
        placeholder="请输入手机号"
        placeholder-class="input-style"
        v-model="pendingData.phone"
      />
    </view>
    <view class="xinguan-flex">
      <text>现居住地址</text>
      <picker mode="region" class="flex-left" @change="changeRegion">
        <view>
          <text>{{
            pendingData.address === ''
              ? '请选择现居住地址'
              : pendingData.address
          }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>现居详细地址</text>
      <input
        type="text"
        placeholder="请输入现居详细地址"
        placeholder-class="input-style"
        v-model="pendingData.de_address"
      />
    </view>
    <view class="xinguan-flex">
      <text>疫苗人群分类</text>
      <picker
        mode="selector"
        class="flex-left"
        :range="selectorData"
        @change="changeSelector"
      >
        <view>
          <text>{{
            pendingData.crowd_sort === ''
              ? '请选择疫苗人群分类'
              : pendingData.crowd_sort
          }}</text>
          <image src="/static/other/gengduo.svg" />
        </view>
      </picker>
    </view>

    <!-- 预约时间 -->
    <view>
      <!-- 医院地址 -->
      <view class="reserve-address">
        <text class="reserve-name">{{ timeData.data.Hospital }}</text>
        <text class="reserve-road">{{ timeData.data.address }}</text>
        <view class="reserve-title">
          <text v-for="(item, index) in timeData.data.company" :key="index">{{
            item
          }}</text>
        </view>
      </view>
      <!-- 星期 -->
      <view
        class="Week"
        v-for="(item, index) in timeData.data.week"
        :key="index"
      >
        <view class="Week-flex" @click="ChooseWeek(item.date)">
          <view
            class="Week-style Week-sup"
            :class="pendingData.date === '' ? '' : 'checkstyle'"
          >
            <text>{{ item.day }}</text>
            <text>{{ item.date }}</text>
            <text>{{ item.Have }}</text>
          </view>
        </view>
      </view>
      <!-- 时段 -->
      <view
        class="period-view"
        v-for="(item, index) in timeData.data.lasting"
        :key="index"
      >
        <text class="period-title">{{ item.period }}</text>
        <view class="Week-flex">
          <block v-for="(item_a, index_a) in item.time" :key="index_a">
            <view
              class="Week-style Week-Down"
              :class="index + '-' + index_a === timeIndex ? 'checkstyle' : ''"
              @click="
                ChooseTime(
                  index + '-' + index_a,
                  item.period,
                  item_a.start_time,
                  item_a.end_time,
                  item_a.when
                )
              "
            >
              <text>{{ item_a.start_time }}-{{ item_a.end_time }}</text>
              <text>剩余{{ item_a.over }}</text>
            </view>
          </block>
        </view>
      </view>
    </view>

    <view style="height: 300rpx"></view>
    <view class="submit">
      <text @click="cancel">取消</text>
      <text @click="submit">提交预约</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, toRefs } from 'vue';
  import { requestAPI } from '@/public/request';
  import { NewAppTime } from '@/env';

  const timeData = reactive<{ data: NewAppTime }>({
    data: {
      Hospital: '',
      address: '',
      company: [],
      lasting: [],
      week: [],
    },
  });

  onMounted(async () => {
    const res = await requestAPI.newAppTime();
    console.log(res);
    timeData.data = res.data.data[0];
  });

  // 代提交的数据
  const SubmitData = reactive({
    pendingData: {
      name: '',
      id_card: '',
      phone: '',
      address: '',
      de_address: '',
      crowd_sort: '',
      date: '',
      period: '',
      reserve_time: '',
      when: 0,
    },
  });

  // toRefs 解构嵌套数据
  let { pendingData } = toRefs(SubmitData);

  //选择省市区

  const changeRegion = (event: any) => {
    pendingData.value.address = event.detail.value.join('');
  };

  //疫苗人群分类数据
  const selectorData = ref([
    '医疗卫生人员',
    '卫生系统内工作的其他人员',
    '因公出国人员',
    '对外劳务派遣人员',
    '留学生',
    '因私出国人员',
    '海关边检人员',
    '公安系统,消防人员',
    '党政机关,事业单位人员',
    '社区工作者',
    '教育工作者',
    '小学和中学学生',
    '其他人员',
  ]);

  const changeSelector = (event: any) => {
    pendingData.value.crowd_sort = selectorData.value[event.detail.value];
  };

  // 选择日期
  const ChooseWeek = (date: string) => {
    pendingData.value.date = date;
  };

  // 选择时段
  const timeIndex = ref('');
  const ChooseTime = (
    index: string,
    period: string,
    start_time: string,
    end_time: string,
    when: number
  ) => {
    timeIndex.value = index;
    pendingData.value.period = period;
    pendingData.value.reserve_time = start_time + '-' + end_time;
    pendingData.value.when = when;
  };

  // 按钮事件
  const cancel = () => {
    uni.navigateBack();
  };
  const submit = async () => {
    uni.showLoading({ title: '提交中', mask: true });
    const res: any = await requestAPI.resCovid(pendingData.value);
    console.log(res);
    if (res.statusCode === 200) {
      uni.hideLoading();
      uni.navigateTo({
        url: '/pages/my-service/xinguan/index',
      });
    }
  };
</script>

<style>
  /* 表单提交 */
  @import url('../../common-style/form.css');
  page {
    background-color: #f7f7f7;
  }
  /* 预约地址 */
  .reserve-address {
    background-color: #ffffff;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 10rpx;
  }
  .reserve-address text {
    display: block;
  }
  .reserve-name {
    font-weight: bold;
  }
  .reserve-road {
    padding: 20rpx 0;
  }
  .reserve-title {
    display: flex;
    align-items: center;
  }
  .reserve-title text {
    background-color: #f7f7f7;
    padding: 5rpx 20rpx;
    font-size: 25rpx;
    margin-right: 10rpx;
  }
  .Week {
    background-color: #ffffff;
    padding: 20rpx;
    border-radius: 10rpx;
    margin: 20rpx;
    display: flex;
    align-items: center;
  }
  .Week-flex {
    display: flex;
  }
  .Week-style {
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
    text-align: center;
    padding: 20rpx 0;
    border-radius: 10rpx;
    margin-right: 20rpx;
  }
  .Week-style text {
    padding: 3rpx;
  }
  .Week-sup {
    width: 150rpx;
  }
  .period-view {
    background-color: #ffffff;
    padding: 20rpx;
    border-radius: 10rpx;
    margin: 20rpx;
  }
  .period-title {
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }
  .Week-Down {
    width: 200rpx;
  }
  /* 选中加上样式 */
  .checkstyle {
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
</style>
