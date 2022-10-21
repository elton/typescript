// pinia
import { defineStore } from 'pinia';

interface PatientInfo {
  name: string;
  _id: string;
}

export const myStore = defineStore('my_data', {
  // 初始化数据
  state: () => ({
    // 就诊人信息
    patientInfo: {} as PatientInfo,
  }),

  actions: {
    // 设置就诊人信息
    setPatientInfo(data: PatientInfo) {
      console.log(data);
      this.patientInfo = data;
    },
  },
});
