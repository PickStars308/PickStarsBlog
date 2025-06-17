<script setup lang="ts">
import {onMounted, onBeforeUnmount} from 'vue'
import {useAppStore} from '@/stores'

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
  <section id="PickStars">
    <PickStarsHero />

    <section class="PickStarsSection wow animate__animated animate__fadeInLeft">
      <CustomizeTitle title="摘星辰" subTitle="PickStars"/>

      <PickStarsList />
    </section>


  </section>
</template>

<style scoped lang="scss">
.PickStarsSection {
  padding: 10px;
}
</style>