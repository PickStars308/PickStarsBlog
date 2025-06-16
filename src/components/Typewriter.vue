<template>
  <div class="typewriter">
    {{ displayText }}<span class="cursor">_</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';

const fullText = ref('');
const displayText = ref('');
const typingIndex = ref(0);
const typingSpeed = 120; // 每个字间的速度（毫秒）
const startDelay = 3000; // 延迟3秒开始打字动画

// 打字逻辑
const typeWriter = () => {
  if (typingIndex.value < fullText.value.length) {
    displayText.value += fullText.value.charAt(typingIndex.value);
    typingIndex.value++;
    setTimeout(typeWriter, typingSpeed);
  }
};

// 获取一言内容
const fetchHitokoto = async () => {
  try {
    const res = await axios.get('https://v1.hitokoto.cn');
    fullText.value = res.data.hitokoto;
  } catch (error) {
    fullText.value = '摘星辰 探星河 包罗万象';
  }
};

onMounted(async () => {
  await fetchHitokoto();
  await nextTick(); // 等待DOM更新

  // 添加延迟
  setTimeout(() => {
    typeWriter();
  }, startDelay);
});
</script>

<style scoped>
.typewriter {
  white-space: pre-wrap;
  display: inline-block;
}

.cursor {
  display: inline-block;
  animation: blink 1s steps(1) infinite;
  color: currentColor;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
