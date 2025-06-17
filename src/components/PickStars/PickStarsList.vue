<script setup lang="ts">
import {ref, onMounted} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

interface PickStarsItem {
  id: string
  Use: boolean
  Data: {
    Title: string
    Version: string
    Description: string
  }
  Download: {
    Link: string
    Password: string
  }
}

const router = useRouter()
const pickStarsList = ref<PickStarsItem[]>([])

onMounted(async () => {
  try {
    const res = await axios.get('/assets/data/config.json')
    if (res.data?.PickStars) {
      pickStarsList.value = res.data.PickStars
    }
  } catch (err) {
    console.error('加载 PickStars 配置失败:', err)
  }
})

const goToDownload = (item: PickStarsItem) => {
  if (!item.Use) return
  router.replace({
    path: '/Download',
    query: {
      app: item.id
    }
  })

}
</script>

<template>
  <section class="pickstars-section">
    <div
        v-for="(item, index) in pickStarsList"
        :key="index"
        class="pickstars-card"
    >
      <h3>{{ item.Data.Title }}</h3>
      <p><strong>版本:</strong> {{ item.Data.Version }}</p>
      <p class="desc">{{ item.Data.Description }}</p>

      <div class="actions">
        <button
            class="btn"
            :class="{ disabled: !item.Use }"
            :disabled="!item.Use"
            @click="goToDownload(item)"
        >
          {{ item.Use ? '立即下载' : '暂不可用' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.pickstars-section {
  display: grid;
  gap: 2rem;
  padding: 5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.pickstars-card {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1.25rem;
  padding: 2rem;
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #ffffff;
  }

  p {
    margin: 0.4rem 0;
    line-height: 1.6;
  }

  .desc {
    color: #cccccc;
    margin: 0.5rem 0 1.2rem;
    font-size: 0.95rem;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .btn {
      background-color: var(--el-color-primary, #409eff);
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 0.6rem;
      font-weight: 500;
      font-size: 0.95rem;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #66b1ff;
      }

      &.disabled {
        pointer-events: none;
        opacity: 0.5;
        background-color: #555;
      }
    }

    p {
      font-size: 0.875rem;
      color: #aaa;
    }
  }
}

@media (max-width: 768px) {
  .pickstars-section {
    padding: 2rem 2rem;
    grid-template-columns: 1fr;
  }

}
</style>
