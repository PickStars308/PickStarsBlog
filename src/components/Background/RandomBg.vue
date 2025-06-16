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
import { useAppStore } from '@/stores/index.ts'
import {ElNotification} from "element-plus";

// 获取 Pinia store
const previewStore = usePreviewStore()
const appStore = useAppStore()

// 导入所有图片资源
const images = import.meta.glob('@/assets/assets/images/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const imageUrls = Object.values(images)

// 随机选取一张背景图
const randomImage = ref('')

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${randomImage.value})`,
}))

const isPreview = computed(() => previewStore.isPreviewing)

onMounted(() => {
  // 随机挑选图片
  const index = Math.floor(Math.random() * imageUrls.length)
  const imgUrl = imageUrls[index]
  randomImage.value = imgUrl

  // 使用 Image 对象检测是否加载完成
  const img = new Image()
  img.src = imgUrl
  img.onload = () => {
    // 图片加载完成后延迟隐藏 loading
    setTimeout(() => {
      appStore.setLoading(false)
    }, 1000)
  }

  img.onerror = () => {
    ElNotification({
      title: "Error",
      message: '背景加载失败...',
      type: "error",
    });    // 即使失败也结束 loading（可选）
    appStore.setLoading(false)
  }
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