<template>
  <LoadingDialog/>

  <RandomBg/>

  <VerticalNav/>

  <section class="AppLayout">
    <AppHeader/>

    <section class="MainContent">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </section>

    <AppFooter/>
  </section>

  <Maintain v-if="isMaintaining"/>
</template>

<script setup lang="ts">
import {ElNotification} from "element-plus";

const isMaintaining = import.meta.env.VITE_SITE_MAINTAIN === 'true'


import {ConsoleLogger} from '@/utils/ConsoleLogger';
import {checkDays, helloInit} from "@/utils/Home";
// 初始化
const icon = `

  ██████╗ ██╗ ██████╗██╗  ██╗    ███████╗████████╗ █████╗ ██████╗ ███████╗
  ██╔══██╗██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
  ██████╔╝██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝███████╗
  ██╔═══╝ ██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗╚════██║
  ██║     ██║╚██████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║███████║
  ╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

    `;
import {useAppStore} from '@/stores/index.ts'
import VerticalNav from "@/components/VerticalNav.vue";
import LoadingDialog from "@/components/LoadingDialog.vue";
import Maintain from "@/Views/Maintain.vue";

if (!isMaintaining) {

  const appInfo = {
    版本: import.meta.env.VITE_PICKSTARS_VERSION,
    作者: "摘星辰",
    "作者 GitHub": "https://github.com/PickStars308",
    网站: "https://xinstudio.top/",
  };

  if (ConsoleLogger) {
    ConsoleLogger.logStructured(appInfo, icon, "font-size: 16px;color: #50b16e;");
  } else {
    ElNotification({
      title: "Error",
      message: "ConsoleLogger module not found. Please check the import path.",
      type: "info",
    });
  }

  onMounted(async () => {
    const appStore = useAppStore()

// 监听 isLoading 的变化
    watch(
        () => appStore.isLoading,
        (val) => {
          // 当 isLoading 变为 false 时执行
          if (!val) {
            checkDays()

            setTimeout(() => {
              helloInit()
            }, 1000)
          }
        }
    )
  })
} else {
  const appInfo = {
    版本: import.meta.env.VITE_PICKSTARS_VERSION,
    作者: "摘星辰 维护中...",
    "作者 GitHub": "https://github.com/PickStars308",
    网站: "https://xinstudio.top/",
  };

  if (ConsoleLogger) {
    ConsoleLogger.logStructured(appInfo, icon, "font-size: 16px;color: #50b16e;");
  } else {
    ElNotification({
      title: "Error",
      message: "ConsoleLogger module not found. Please check the import path.",
      type: "info",
    });
  }
}

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


<style lang="scss">
@use "@/styles/global.scss" as *;
</style>