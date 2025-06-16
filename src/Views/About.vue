<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const handleScroll = () => {
  const scrollY = window.scrollY
  const threshold = 10 // 可以自己调节这个值

  if (scrollY > threshold) {
    appStore.showFooter = false
  } else {
    appStore.showFooter = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section id="Skills">
    <SkillsHero/>

    <section class="SkillsSection">
      <CustomizeTitle title="技能" subTitle="What I can do"/>
      <Skills/>

      <CustomizeTitle title="项目" subTitle="What I've built"/>
      <SkillsProjects/>

    </section>
  </section>
</template>

<style scoped lang="scss">
.SkillsSection {
  padding: 10px;
}
</style>