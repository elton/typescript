<template>
  <view class="regist-view">
    <view class="regist-left">
      <text v-for="(item, index) in departments" :key="index" :class="departmentId === item._id && 'addcolor'"
        @click="querySubDept(item._id)">{{
            item.dep_ment
        }}</text>
    </view>
    <view class="regist-right" v-if="subDepartments.length > 0">
      <block v-for="(item, index) in subDepartments" :key="index">
        <view v-for="(item_a, index_a) in item.dep_ment_list" :key="index_a">
          <text @click="toDoctor(item_a.dep_id)">{{ item_a.dep_name }}</text>
        </view>
      </block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { requestAPI } from '@/public/request';
import { Department, SubDept } from '@/env';

const departments = ref<Department[]>([]);
const departmentId = ref<string>('');
const subDepartments = ref<SubDept[]>([]);

onMounted(async () => {
  // 获取科室列表
  const res = await requestAPI.department() as { data: { data: Department[] } };
  departments.value = res.data.data;
  if (departmentId.value === '') {
    departmentId.value = res.data.data[0]._id;
    querySubDept(res.data.data[0]._id);
  }
});

// 查询二级科室
const querySubDept = async (id: string) => {
  departmentId.value = id;
  const res = await requestAPI.regList({ id }) as { data: { data: SubDept[] } };
  console.log(res);
  subDepartments.value = res.data.data;
};

// 跳转到选择医生
const toDoctor = (id: string) => {
  uni.navigateTo({
    url: `/pages/doctor/index?id=${id}`,
  });
};

</script>

<style>
.regist-view {
  display: flex;
  justify-content: space-between;
}

.regist-left {
  background-color: #f5f5f5;
  width: 200rpx;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  overflow: auto;
}

.regist-left text {
  display: block;
  padding: 25rpx;
}

.addcolor {
  background-color: #ffffff;
  color: #2c76ef;
}

.regist-right {
  padding-left: 200rpx;
  flex: 1;
}

.regist-right view {
  padding: 25rpx;
}
</style>
