<template>
  <header class="app-header">
    <div class="logo">
      <h1>{{ SiteAuthor }}</h1>

      <button
          class="preview-btn"
          @mouseenter="previewStore.setPreview(true)"
          @mouseleave="previewStore.setPreview(false)"
      >
        <svg-icon icon-name="icon-Eyes" color="#ffffff"/>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {usePreviewStore} from '@/stores/preview'
import SvgIcon from "@/components/SvgIcon.vue";

const SiteAuthor = import.meta.env.VITE_SITE_Briefly
const previewStore = usePreviewStore()

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

  .preview-btn {
    background: transparent;
    padding: 0rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    fill: white;

    &:hover {
    }
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