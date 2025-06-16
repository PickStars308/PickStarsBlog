<template>
  <div v-if="!animationFinished" class="door-container">
    <div class="door left" :class="{ open: !isLoading }"></div>
    <div class="door right" :class="{ open: !isLoading }"></div>
    <div class="loading-text" v-if="isLoading">

      <div class="loader">
        <div class="loader-text">Loading...</div>
        <div class="loader-bar"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {ref, watch} from 'vue'

import {useAppStore} from '@/stores/index.ts'
const appStore = useAppStore()
const {isLoading} = storeToRefs(appStore)
watch(isLoading, (val) => {
  if (!val) {
    // 动画结束后移除 doors
    setTimeout(() => {
      animationFinished.value = true
    }, 1000)
  } else {
    animationFinished.value = false
  }
})

const animationFinished = ref(false)


</script>

<style scoped lang="scss">
.door-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2002;
  pointer-events: none;
}

.door {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: var(--bg-color);
  transition: transform 1s ease;
  z-index: 2;
  pointer-events: auto;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

.left.open {
  transform: translateX(-100%);
}

.right.open {
  transform: translateX(100%);
}

.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #333;
  z-index: 3;

  .loader {
    /* background-color: blue; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .loader-text {
    font-size: 24px;
    color: rgb(0, 0, 0);
    margin-bottom: 20px;
    align-self: center;
  }

  .loader-bar {
    width: 30%;
    height: 10px;
    border-radius: 5px;
    background-color: rgb(0, 0, 0);
    animation: loader-bar-animation 2s ease-in-out infinite;
  }

  @keyframes loader-bar-animation {
    0% {
      /* transform: translateX(-100%) rotate(270deg); */
      transform: translateX(-100%);
    }

    50% {
      /* transform: translateX(100%) rotate(-90deg); */
      transform: translateX(100%);
    }

    100% {
      /* transform: translateX(-100%) rotate(270deg); */
      transform: translateX(-100%);
    }
  }
}
</style>
