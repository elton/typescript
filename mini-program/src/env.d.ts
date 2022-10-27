/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export interface Vaccine {
  image: string;
  title: string;
}

export interface Reserve {
  describe: string;
  image: string;
  title: string;
}

export interface Popular {
  background: string;
  dep_id: string;
  image: string;
  title: string;
}

export interface SelfTest {
  describe: string;
  image: string;
  minute: number;
  name: string;
  number_of_people: number;
  question: number;
}

interface Time {
  end_time: string;
  over: number;
  start_time: string;
  when: number;
}

interface Period {
  period: string;
  time: Time[];
}

interface Week {
  Have: string;
  date: string;
  day: string;
}

export interface NewAppTime {
  Hospital: string;
  address: string;
  company: string[];
  lasting: Period[];
  week: Week[];
}

export interface CovidTestOrder {
  address: string;
  cancel: boolean;
  company: string;
  date: string;
  name: string;
  period: string;
  time: string;
  _id: string;
}

export interface HpvSelect {
  name: string;
  _id: string;
}

export interface HpvList {
  describe: string[];
  hpv_id: string;
  name: string;
  price: string[];
  _id: string;
}

interface HpvName {
  combo: string;
  combo_id: string; // 跟JSON数据中的key的名字保持一致
}

interface HpvTime {
  time: string;
  time_id: string;
}

export interface HpvCombName {
  title: string;
  name: HpvName[];
}

export interface HpvCombTime {
  title: string;
  name: HpvTime[];
}

// ----------新冠疫苗订单------------
export interface XinguanOrder {
  address: string;
  cancel: boolean;
  company: string;
  date: string;
  name: string;
  period: string;
  time: string;
  _id: string;
}

// ----------HPV疫苗预约订单------------
export interface HpvOrder {
  name: string;
  combo: string;
  ino_time: string;
  price: number;
  hpv_name: string;
  time: string;
  address: string;
  order_number: string;
  cancel: boolean;
  _id: string;
}

interface Date {
  date: string;
  week: string;
}

interface Style {
  desc: string[];
  title: string;
}
// 核酸检测预约
export interface Nucleicacid {
  address: string;
  boon: string[];
  date: Date[];
  hospital: string;
  logo: string;
  name: string;
  phone: string;
  price: number;
  style: Style[];
  _id: string;
}

// ----------核酸检测预约订单------------
export interface NuataOrder {
  address: string;
  cancel: boolean;
  name: string;
  order_number: string;
  phy_name: string;
  phy_time: string;
  price: number;
  time: string;
  _id: string;
}

// 提交图文咨询
export interface Graphics {
  illness: string;
  guide: boolean;
  ins_report: string[];
  patient_id: string;
}

// 就诊人数据
export interface Patient {
  age: string;
  born: string;
  id_card: string;
  name: string;
  phone: string;
  relation: string;
  sex: string;
  _id: string;
}

export interface ResponseData {
  data: { data: [] };
  statusCode: number;
}

export interface PhyTerm {
  query_val: string;
  _id: string;
  filter_val: string[];
}

export interface PhyData {
  be_suit: string;
  describe: string;
  image: string;
  price: number;
  sales: number;
  title: string;
  _id: string;
}

export interface FilterData {
  type: string;
  sales: string;
  price: string;
}

interface Crowd {
  image: string;
  name: string;
}

interface Content {
  details: string;
  thing: string;
}

interface Project {
  title: string;
  content: Content[];
}

export interface PhyDetail {
  image: string;
  price: number;
  sales: number;
  title: string;
  _id: string;
  crowd: Crowd[];
  date: Date[];
  project: Project[];
}
export interface PatientData {
  phy_name: string;
  phy_time: string;
  show?: boolean;
  patient_id?: string;
}
export interface phyOrder {
  address: string;
  cancel: boolean;
  name: string;
  order_number: string;
  phy_name: string;
  phy_time: string;
  price: number;
  time: string;
  _id: string;
}

export interface Topic {
  topic: string;
  _id: string;
  options: {
    son_id: string;
    title: string;
  }[];
}

export interface TestResult {
  outline: string[];
  result: string;
  scope: string;
  suggest: string;
  _id: string;
  recommend:
    | []
    | {
        dep_id: string;
        dep_name: string;
        hospital: string;
      }[];
}

export interface ShareDataType {
  type: string;
  name: string;
  share_title: string;
  share_path: string;
  share_url: string;
}

export interface VideoData {
  avatar: string;
  controls: boolean;
  name: string;
  play_but: boolean;
  video_title: string;
  video_url: string;
  _id: string;
}

export interface Department {
  dep_ment: string;
  _id: string;
}

export interface SubDept {
  dep_ment: string;
  dep_ment_list: {
    dep_id: string;
    dep_name: string;
  }[];
  _id: string;
}
