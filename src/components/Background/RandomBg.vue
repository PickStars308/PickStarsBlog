<template>
  <div class="random-background">
    <!-- 背景图层 -->
    <div class="bg-image" :style="backgroundStyle" :class="{ 'no-blur': isPreview }"></div>
    <!-- 黑白半透明遮罩 -->
    <div class="bg-overlay" :class="{ 'no-overlay': isPreview }"></div>
  </div>
</template>

<script setup lang="ts">

import { computed, ref, onMounted } from 'vue'
import { usePreviewStore } from '@/stores/preview'
import { useAppStore } from '@/stores/index'
import { useSettingsStore } from '@/stores/settings'
import { ElNotification } from 'element-plus'

// 获取 stores
const previewStore = usePreviewStore()
const appStore = useAppStore()
const settingsStore = useSettingsStore()

// 本地图片资源
const images = import.meta.glob('@/assets/assets/images/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const imageUrls = Object.values(images)

const backgroundUrl = ref('')
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundUrl.value})`,
}))
const isPreview = computed(() => previewStore.isPreviewing)

// 壁纸加载方法
const loadWallpaper = async () => {
  appStore.setLoading(true)

  // 1. 每日一图
  if (settingsStore.wallpaperType === 'daily') {
    const bingUrl = 'https://bing.ee123.net/img/4k'
    backgroundUrl.value = bingUrl

    const img = new Image()
    img.src = bingUrl
    img.onload = () => {
      setTimeout(() => {
        appStore.setLoading(false)
      }, 800)
    }
    img.onerror = () => {
      ElNotification({
        title: '加载失败',
        message: '无法加载 Bing 壁纸，已为您切换至随机壁纸',
        type: 'error',
      })
      loadRandomImage()
    }
  }
  // 2. 随机本地图
  else {
    loadRandomImage()
  }
}

const loadRandomImage = () => {
  const index = Math.floor(Math.random() * imageUrls.length)
  const imgUrl = imageUrls[index]
  backgroundUrl.value = imgUrl

  const img = new Image()
  img.src = imgUrl
  img.onload = () => {
    setTimeout(() => {
      appStore.setLoading(false)
    }, 800)
  }
  img.onerror = () => {
    ElNotification({
      title: '加载失败',
      message: '本地图片加载失败',
      type: 'error',
    })
    appStore.setLoading(false)
  }
}

onMounted(() => {
  loadWallpaper()
})

watch(() => settingsStore.wallpaperType, () => {
  loadWallpaper()
})

</script>


<style scoped lang="scss">
.random-background {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;

  .bg-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(12px); // 高斯模糊
    transform: scale(1.05);
    transition: filter 0.5s ease, transform 0.5s ease; // 添加过渡动画
  }

  .bg-image.no-blur {
    filter: none; // 取消模糊
    transform: scale(1); // 恢复原始尺寸
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    mix-blend-mode: multiply;
    transition: background 0.5s ease; // 添加过渡动画
  }

  .bg-overlay.no-overlay {
    background: rgba(0, 0, 0, 0); // 取消遮罩
  }
}
</style>