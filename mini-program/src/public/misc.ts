// 图片上传

export const uploadImage = (
  url: string,
  su_title: string,
  err_title: string
) => {
  return new Promise((resolve, reject) => {
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      success: (res) => {
        uni.showLoading({ title: su_title, mask: true });
        uni.uploadFile({
          url,
          filePath: res.tempFiles[0].tempFilePath,
          header: { accept: 'application/json' },
          name: 'file',
          success: (res_img) => {
            resolve(res_img);
            uni.hideLoading();
          },
          fail: (err) => {
            reject(err);
            uni.showToast({
              title: err_title,
              icon: 'error',
              duration: 1000,
            });
          },
        });
      },
    });
  });
};
