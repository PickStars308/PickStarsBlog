<template>
  <header class="app-header">
    <div class="logo">
      <h1>{{ SiteAuthor }}</h1>

      <div class="Button">
        <SvgIcon
            icon-name="icon-Eyes"
            color="#ffffff"
            @mouseenter="previewStore.setPreview(true)"
            @mouseleave="previewStore.setPreview(false)"
        />
        <SvgIcon
            icon-name="icon-Setting"
            color="#ffffff"
            @click="openSettingsModal"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { usePreviewStore } from '@/stores/preview'
import SvgIcon from "@/components/SvgIcon.vue";
import { useSettingsStore } from '@/stores/settings';  // 引入设置状态管理

const SiteAuthor = import.meta.env.VITE_SITE_Briefly
const previewStore = usePreviewStore()
const settingsStore = useSettingsStore();  // 初始化设置存储

// 打开设置弹窗的方法
const openSettingsModal = () => {
  settingsStore.toggleSettingsModal(true);
};
</script>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;

  .logo {
    width: 85%;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  .Button {
    display: flex;
    align-items: center;
    gap: 1rem;

  }
}

@media (max-width: 768px) {
  .app-header {
    .logo {
      width: 100%;
      font-size: 15px;
    }
  }
}


</style>
