<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
onLaunch(() => {
  const getMenu = uni.getStorageSync('menuButton')
  if (!getMenu) {
    // 获取右上角胶囊按钮的坐标值
    const res = uni.getMenuButtonBoundingClientRect()
    uni.setStorageSync('menuButton', res)
  }
})
</script>
<style></style>
