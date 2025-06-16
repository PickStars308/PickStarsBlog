<template>
  <header class="app-header">
    <div class="logo">
      <h1> {{ SiteAuthor }} </h1>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/About">关于</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const SiteAuthor = import.meta.env.VITE_SITE_Briefly
</script>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

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
    z-index: 1000;
  }

  nav a {
    color: white;
    margin-left: 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>
