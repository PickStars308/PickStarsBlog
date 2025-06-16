<template>
  <div class="social-links">
    <a
        v-for="(item, index) in links"
        :key="index"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        :style="{ color: item.bgColor }"
    >
      <svg-icon :iconName="item.name" :color="item.iconColor"/>
    </a>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {ElNotification} from "element-plus";

interface SocialLink {
  name: string;
  url: string;
  bgColor: string;
  iconColor: string;
}

const links = ref<SocialLink[]>([]);

onMounted(async () => {
  try {
    const res = await axios.get<SocialLink[]>('/assets/data/sociallinks.json');
    links.value = res.data;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: '' + error,
      type: "info",
    });
  }
});
</script>

<style scoped>
.social-link {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 4em;
  height: 4em;
  border-radius: 6px;
  text-decoration: none;
  overflow: hidden;
  color: inherit;
  transition: color 0.3s;
}

/* 初始状态下底部横线 */
.social-link::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5px; /* 初始横线厚度 */
  background-color: currentColor; /* 使用字体色 */
  transform: scaleY(1);
  transform-origin: bottom;
  transition: height 0.3s ease, transform 0.3s ease;
  z-index: 0;
  border-radius: 6px;
}

/* 鼠标移入时：从底部向上填满整个背景 */
.social-link:hover::before {
  height: 100%;
  transform: scaleY(1);
}

/* 图标在上层 */
.social-link > * {
  z-index: 1;
}

</style>
