<template>
  <div v-if="enabled">
    <div class="cursor-dot" :style="dotStyle"></div>
    <div class="cursor-ring" :style="ringStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  enabled?: boolean
  dotColor?: string
  ringColor?: string
}>()

const enabled = props.enabled ?? true
const dotColor = props.dotColor ?? '#fff'
const ringColor = props.ringColor ?? 'rgba(255, 255, 255, 0.3)'

const dotStyle = reactive({
  left: '0px',
  top: '0px',
  backgroundColor: dotColor,
  width: '20px',
  height: '20px',
  transition: 'width 0.15s ease, height 0.15s ease',
})

const ringStyle = reactive({
  left: '0px',
  top: '0px',
  backgroundColor: ringColor,
  width: '32px',
  height: '32px',
  transition: 'width 0.15s ease, height 0.15s ease',
})

let mouseX = 0,
    mouseY = 0
let ringX = 0,
    ringY = 0

const updateMouse = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  dotStyle.left = `${mouseX}px`
  dotStyle.top = `${mouseY}px`
}

const animate = () => {
  ringX += (mouseX - ringX) * 0.15
  ringY += (mouseY - ringY) * 0.15
  ringStyle.left = `${ringX}px`
  ringStyle.top = `${ringY}px`
  requestAnimationFrame(animate)
}

const onMouseDown = () => {
  // 按下时缩小
  dotStyle.width = '12px'
  dotStyle.height = '12px'
  ringStyle.width = '24px'
  ringStyle.height = '24px'
}
const onMouseUp = () => {
  // 松开时恢复
  dotStyle.width = '20px'
  dotStyle.height = '20px'
  ringStyle.width = '32px'
  ringStyle.height = '32px'
}

onMounted(() => {
  document.body.style.cursor = 'none'
  window.addEventListener('mousemove', updateMouse)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  requestAnimationFrame(animate)
})

onUnmounted(() => {
  document.body.style.cursor = 'auto'
  window.removeEventListener('mousemove', updateMouse)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.cursor-dot {
  background-color: #fff;
}
.cursor-ring {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
