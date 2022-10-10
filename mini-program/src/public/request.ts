import { Base64 } from 'js-base64';
const baseURL = 'https://meituan.thexxdd.cn/api';

// 获取token
const getToken = (): string => {
  const token = uni.getStorageSync('wxuser').user_Token || '';
  const base64Token = Base64.encode(token + ':');
  return 'Basic ' + base64Token;
};

interface ResData {
  data: { data: any[] };
  statusCode: number;
}

const request = (
  url: string,
  method: 'GET' | 'POST',
  data: string | object | ArrayBuffer
): Promise<ResData> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      method,
      data,
      header: { Authorization: getToken() },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else if (res.statusCode === 401) {
          uni.navigateTo({
            url: '/pages/login-page/index',
          });
          reject(res);
        } else if (res.statusCode === 400) {
          uni.showToast({
            title: '传递参数错误',
            icon: 'none',
            duration: 1000,
          });
        } else if (res.statusCode === 500) {
          uni.showToast({
            title: '服务器错误',
            icon: 'none',
            duration: 1000,
          });
          reject(res);
        } else if (res.statusCode === 202) {
          uni.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          });
          reject(res);
        } else {
          uni.showToast({
            title: '服务器错误',
            icon: 'none',
            duration: 1000,
          });
          reject(res);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '服务器未知错误',
          icon: 'none',
          duration: 1000,
        });
        reject(err);
      },
    });
  });
};

export const requestAPI = {
  // 首页数据
  frontpage: () => {
    return request('/frontpage', 'GET', {});
  },

  // 新冠疫苗预约
  newAppTime: () => {
    return request('/newapptime', 'GET', {});
  },

  // 新冠疫苗预约提交
  resCovid: (data: object) => {
    return request('/rescovid', 'POST', data);
  },

  // 小程序登录
  wxLogin: (data: object) => {
    return request('/wx_login', 'POST', data);
  },
};
