<template>
  <transition name="fade-footer">
    <footer v-show="appStore.showFooter" class="app-footer">
      <footer class="footer">
        <div class="footer-content">
          <p>© {{ new Date().getFullYear() }} {{ SiteAuthor }}. All rights reserved.</p>
          <p class="gongan">
            <img src="/assets/images/ic_gongan.png"/>
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=33021202003484"
               rel="noreferrer" target="_blank">浙公网安备33021202003484号</a>
          </p>
          <p><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">{{ SiteRecordNumber }}</a></p>
          <p><a href="https://icp.gov.moe/?keyword=20250194" target="_blank">萌ICP备20250194号</a></p>
          <p><site-runtime/></p>
<!--          <p>-->
<!--            Powered by &nbsp;-->
<!--            <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue3</a>&nbsp; + &nbsp;-->
<!--            <a href="https://element-plus.org/" target="_blank" rel="noopener">Element Plus</a>-->
<!--          </p>-->
        </div>
      </footer>
    </footer>
  </transition>
</template>

<script setup lang="ts">


const SiteAuthor = import.meta.env.VITE_SITE_COPYRIGHT || 'PickStars'

const SiteRecordNumber = import.meta.env.VITE_SITE_ICP || ''

import {useAppStore} from "@/stores";

const appStore = useAppStore()


</script>

<style scoped lang="scss">
.app-footer {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  color: white;
  padding: 1rem 0.5rem;


  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    p {
      margin: 0;
      display: flex;
      align-items: center;
    }

    a {
      color: #ddd;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

}


@media (max-width: 768px) {
  .app-footer {
    padding: 0.5rem 0.5rem;

    .footer-content {
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
    }
  }
}

.gongan img {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
}

.fade-footer-enter-active,
.fade-footer-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-footer-enter-from,
.fade-footer-leave-to {
  opacity: 0;
  transform: translateY(30px); // 向下滑入/滑出
}

</style>
