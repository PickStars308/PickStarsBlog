<template>
  <div class="random-background">
    <!-- 背景图层 -->
    <div class="bg-image" :style="backgroundStyle"></div>
    <!-- 黑白半透明遮罩 -->
    <div class="bg-overlay"></div>
  </div>
</template>

<script setup lang="ts">
const images = import.meta.glob('@/assets/assets/images/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string> // 强制类型断言为字符串

const imageUrls = Object.values(images)

const getRandomImage = (): string => {
  const index = Math.floor(Math.random() * imageUrls.length)
  return imageUrls[index]
}

const backgroundStyle = {
  backgroundImage: `url(${getRandomImage()})`,
}
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
    transform: scale(1.05); // 缩放一点避免边缘模糊出现黑边
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35); // 半透明黑色遮罩
    mix-blend-mode: multiply; // 叠加效果（可选）
  }
}
</style>
