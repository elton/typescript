"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://meituan.thexxdd.cn/api";
const getToken = () => {
  const token = common_vendor.index.getStorageSync("wxuser").user_token || "";
  const base64Token = common_vendor.gBase64.encode(token + ":");
  return "Basic " + base64Token;
};
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      method,
      data,
      header: { Authorization: getToken() },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else if (res.statusCode === 401) {
          common_vendor.index.showToast({
            title: "\u767B\u5F55\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        } else if (res.statusCode === 500) {
          common_vendor.index.showToast({
            title: "\u670D\u52A1\u5668\u9519\u8BEF",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        } else if (res.statusCode === 202) {
          common_vendor.index.showToast({
            title: "\u7F3A\u5C11\u53C2\u6570",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        } else {
          common_vendor.index.showToast({
            title: "\u670D\u52A1\u5668\u9519\u8BEF",
            icon: "none",
            duration: 1e3
          });
          reject(res);
        }
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "\u670D\u52A1\u5668\u672A\u77E5\u9519\u8BEF",
          icon: "none",
          duration: 1e3
        });
        reject(err);
      }
    });
  });
};
const requestAPI = {
  frontpage: () => {
    return request("/frontpage", "GET", {});
  }
};
exports.requestAPI = requestAPI;
