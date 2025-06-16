<template>
  <footer class="app-footer">
    <footer class="footer">
      <div class="footer-content">
        <p>© {{ new Date().getFullYear() }} {{ SiteAuthor }}. All rights reserved.</p>
        <p class="gongan">
          <img src="/assets/images/ic_gongan.png"/>
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=33021202003484"
             rel="noreferrer" target="_blank">浙公网安备33021202003484号</a>
        </p>
        <p><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">{{ SiteRecordNumber }}</a></p>

        <p>
          <SiteRuntime/>
        </p>
        <p>
          Powered by &nbsp;
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue3</a>&nbsp; + &nbsp;
          <a href="https://element-plus.org/" target="_blank" rel="noopener">Element Plus</a>
        </p>
      </div>
    </footer>
  </footer>
</template>

<script setup lang="ts">
const SiteAuthor = import.meta.env.VITE_SITE_COPYRIGHT || 'PickStars'

const SiteRecordNumber = import.meta.env.VITE_SITE_ICP || ''

</script>

<style scoped lang="scss">
.app-footer {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  color: white;
  padding: 1rem 0.5rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap; // 如空间不足，允许换行
  justify-content: center;
  align-items: center;
  gap: 1rem; // 元素间间距
}

.footer-content p {
  margin: 0;
  display: flex;
  align-items: center;
}

.footer-content a {
  color: #ddd;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.gongan img {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
}

</style>
