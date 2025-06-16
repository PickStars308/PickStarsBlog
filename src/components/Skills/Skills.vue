<template>
  <div class="skills-container">
    <div v-for="skill in skills" :key="skill.name" class="skill-item">
      <div class="skill-header">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-progress">{{ skill.progress }}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-bar-fill" :style="{ width: skill.progress + '%' }"></div>
      </div>
      <p class="skill-desc">{{ skill.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Skill {
  name: string
  progress: number
  description: string
}

const skills = ref<Skill[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('/assets/data/skills.json')
    skills.value = response.data
  } catch (error) {
    console.error('技能数据加载失败:', error)
  }
})
</script>

<style scoped lang="scss">
.skills-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 每行三个
  gap: 1.5rem;
  padding: 5rem;
}

.skill-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.skill-bar {
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.skill-bar-fill {
  height: 100%;
  background-color: var(--el-color-primary, #409EFF);
  transition: width 0.5s ease;
}

.skill-desc {
  font-size: 0.875rem;
  color: #ccc;
}

@media screen and (max-width: 600px) {
  .skills-container {
    grid-template-columns: 1fr;
    padding: 2rem 2rem;
    gap: 1rem;
  }

  .skill-item {
    padding: 0.8rem;
  }

  .skill-header {
    font-size: 0.9rem;
  }

  .skill-bar {
    height: 8px;
    margin-bottom: 0.4rem;
  }

  .skill-desc {
    font-size: 0.75rem;
  }
}

</style>
