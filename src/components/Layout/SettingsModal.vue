<template>
  <transition name="modal-fade">
    <div v-if="isSettingsModalOpen" class="settings-modal-overlay" @click.self="closeModal">
      <div class="settings-modal-content">
        <div class="modal-header">
          <h3>系统设置</h3>
          <button @click="closeModal" class="close-btn">
            <SvgIcon icon-name="icon-Close" color="#ffffff"/>
          </button>
        </div>

        <div class="modal-body">
          <div class="modal-left" v-if="!loading && configData">
            <h2>站点信息</h2>
            <p class="site-name">网站版本：{{ configData.WebsiteChange?.Version || '无标题' }}</p>

            <h2 style="margin-top: 1rem;">更新日志</h2>
            <ul class="changelog">
              <li v-for="(log, index) in configData.WebsiteChange?.Log" :key="index">{{ log }}</li>
            </ul>
          </div>

          <div class="modal-right">
            <div class="setting-item">
              <h2>壁纸设置</h2>
              <div class="wallpaper-options">
                <button
                    class="wallpaper-btn"
                    :class="{ active: settingsStore.wallpaperType === 'random' }"
                    @click="toggleWallpaper('random')"
                >
                  随机背景
                </button>
                <button
                    class="wallpaper-btn"
                    :class="{ active: settingsStore.wallpaperType === 'daily' }"
                    @click="toggleWallpaper('daily')"
                >
                  每日一图
                </button>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {useSettingsStore} from '@/stores/settings';
import SvgIcon from "@/components/SvgIcon.vue";
import {ElMessage} from 'element-plus';
import axios from 'axios';

const settingsStore = useSettingsStore();
const isSettingsModalOpen = computed(() => settingsStore.isSettingsModalOpen);
const configData = ref<any>(null);
const loading = ref(true);

// 关闭弹窗
const closeModal = () => {
  settingsStore.toggleSettingsModal(false);
};

const toggleWallpaper = (wallpaperType: string) => {
  settingsStore.toggleWallpaperType(wallpaperType);
  ElMessage.success('设置已保存！')
  closeModal()
};

onMounted(async () => {
  try {
    const response = await axios.get('/assets/data/config.json');
    configData.value = response.data;
  } catch (error) {
    console.error('加载配置失败:', error);
    ElMessage.error('无法加载网站配置');
  } finally {
    loading.value = false;
  }
});

</script>

<style scoped lang="scss">
.settings-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  animation: fadeOverlay 0.3s ease-in;
  background-color: rgba(89, 89, 89, 0.2);
}

@keyframes fadeOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.settings-modal-content {
  animation: modalFadeIn 0.4s ease-out;
  backdrop-filter: blur(15px); // 毛玻璃关键样式
  background-color: rgba(255, 255, 255, 0.1); // 半透明背景
  border: 1px solid rgba(255, 255, 255, 0.2); // 轻微边框
  border-radius: 16px;
  width: 90%;
  height: 80%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  color: #fff;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: none;
  border: none;

}

.modal-body {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  height: 100%;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.modal-left {
  width: 30%;
  color: #fff;

  h4 {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .site-name {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .changelog {
    list-style: disc;
    font-size: 0.9rem;
    margin-top: 1rem;
    height: -webkit-fill-available;
    overflow-y: auto;      // 启用垂直滚动

    li {
      margin-bottom: 0.25rem;
      line-height: 1.4;
      word-break: break-word;
    }

    // 自定义滚动条（可选）
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.modal-right {
  flex: 1;
}

.wallpaper-options {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.wallpaper-btn {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;

  transition: all 0.3s ease;
}

.wallpaper-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.wallpaper-btn.active {
  background-color: #4a90e2;
  color: white;
  border-color: #4a90e2;
}

.modal-footer {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
}

</style>