<script setup lang="ts">
defineProps({
  title: { type: String, default: "About" },
  subTitle: { type: String, default: "PickStars" }
});
</script>

<template>
  <div class="about-title">
    <span class="prefix">{{ title }}</span>
    <span class="suffix">{{ subTitle }}</span>
  </div>
</template>

<style scoped>
.about-title {
  position: relative;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-left: 5rem;
  font-size: 2.5rem;
}

.about-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 50%;
  height: 0.375rem;
  background-color: #ffffff;
}

.prefix {
  color: #ffffff;
  margin-right: 0.5rem;
}

.suffix {
  color: var(--el-color-primary);
}

@media (max-width: 480px) {
  .about-title {
    margin-left: 2rem;

    font-size: 1.5rem; /* 24px */
  }
}
</style>
