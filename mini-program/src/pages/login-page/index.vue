<template>
  <view class="Login-page">
    <image
      mode="aspectFill"
      src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg"
    ></image>
    <button @click="login">授权登陆</button>
  </view>
</template>
<script setup lang="ts">
  import { requestAPI } from '@/public/request';
  const login = () => {
    uni.getUserProfile({
      desc: '获取个人信息',
      success: (res) => {
        console.log(res);
        const { avatarUrl, nickName } = res.userInfo;

        // 获取code
        uni.login({
          success: (code) => {
            uni.showLoading({ title: '登陆中', mask: true });
            apiLogin(avatarUrl, nickName, code.code);
          },
          fail: (err) => {
            uni.showToast({ title: '登录失败', icon: 'none', duration: 1000 });
          },
        });
      },
      fail: (err) => {
        uni.showToast({ title: '登录失败', icon: 'none', duration: 1000 });
      },
    });
  };

  // 调用微信api接口登陆
  const apiLogin = async (
    avatarUrl: string,
    nickName: string,
    code: string
  ) => {
    try {
      const obj = {
        appid: 'wx0f3f886e026d6e2f',
        secret: 'b19345abc08581e596eb268d62f9dc05',
        avatarUrl,
        nickName,
        code,
      };
      const res: any = await requestAPI.wxLogin(obj);
      // 存储用户信息到本地缓存，然后返回上一页
      uni.setStorageSync('wxuser', res.data.data);
      setTimeout(() => {
        uni.navigateBack();
        uni.hideLoading();
      }, 600);
    } catch (error) {
      console.log(error);
      uni.showToast({ title: '登录失败', icon: 'none', duration: 1000 });
    }
  };
</script>
<style scoped>
  .Login-page {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
  .Login-page image {
    width: 100%;
    height: 100%;
  }
  .Login-page button {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 30%;
    background-color: #2c76ef;
    color: #ffffff;
    padding: 0 100rpx;
    font-size: 35rpx;
  }
</style>
