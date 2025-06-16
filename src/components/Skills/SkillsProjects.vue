<template>
  <section class="projects-section">
    <div class="project-card" v-for="project in projects" :key="project.title">
      <h3 class="title">{{ project.title }}</h3>

      <p class="description">{{ project.description }}</p>

      <!-- 使用 <router-link> 替代 <a> 标签 -->
      <router-link
          :to="project.link"
          class="link"
          custom
          v-slot="{ navigate }"
      >
        <span
            @click="navigate"
            role="link"
            tabindex="0"
        >
          查看项目
        </span>

      </router-link>
    </div>

  </section>

</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Project {
  title: string
  description: string
  link: string // 现在 link 应该是路由路径（如 '/project/1'），而不是完整 URL
}

const projects = ref<Project[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('/assets/data/projects.json')
    projects.value = response.data
  } catch (error) {
    console.error('加载项目数据失败:', error)
  }
})
</script>

<style scoped lang="scss">
.projects-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  padding: 5rem;

  .project-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    padding: 1rem 1.5rem;
    color: #fff;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }

    .title {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .description {
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }

    .link {
      color: var(--el-color-primary);
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// ⬇️ 移动端优化
@media (max-width: 768px) {
  .projects-section {
    padding: 2rem 2rem;
    grid-template-columns: 1fr;

    .project-card {
      padding: 1rem;
      .title {
        font-size: 1rem;
      }

      .description {
        font-size: 0.85rem;
      }

      .link {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
