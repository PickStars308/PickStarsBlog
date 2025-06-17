<template>
  <div class="floating-tools" :class="{ visible: isVisible }">
    <div class="tool-btn" @click="scrollToTop" title="返回顶部">
      <SvgIcon icon-name="icon-BackTop" color="#ffffff" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const isVisible = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleScroll() {
  isVisible.value = window.scrollY > 100 // 超过100px才显示
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.floating-tools {
  position: fixed;
  bottom: 2rem;
  right: -4rem; // 默认隐藏在右侧
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999;
  transition: right 0.3s ease;

  &.visible {
    right: 1rem; // 滚动后显示
  }

  .tool-btn {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: background 0.3s;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
</style>
