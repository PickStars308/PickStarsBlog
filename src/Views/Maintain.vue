<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {ElNotification} from 'element-plus'

interface MaintainInfo {
  Title: string
  Description: string
  ContactAdmini: string
}

const maintainData = ref<MaintainInfo | null>(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const res = await axios.get('/assets/data/config.json')
    maintainData.value = res.data.Maintain || null
  } catch (err) {
    error.value = true
    ElNotification({
      title: "Error",
      message: '' + err,
      type: "error",
    });
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="maintain-page">
    <div v-if="loading" class="loading">加载中...</div>

    <div v-else-if="error" class="error">
      <h2>加载维护信息失败</h2>
      <p>请稍后重试。</p>
    </div>

    <div v-else-if="maintainData" class="maintain-content">
      <h1>{{ maintainData.Title }}</h1>
      <p>{{ maintainData.Description }}</p>
      <p>如有问题，请联系管理员：<a :href="`mailto:${maintainData.ContactAdmini}`">{{ maintainData.ContactAdmini }}</a></p>
    </div>

    <div v-else class="empty">
      <h2>暂无维护信息</h2>
    </div>
  </section>
</template>

<style scoped lang="scss">
.maintain-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;

  .loading,
  .error,
  .empty {
    font-size: 1.2rem;
    color: #aaa;
  }

  .maintain-content {
    max-width: 600px;

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #ff5555;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;

      a {
        color: #409eff;
        text-decoration: underline;
      }
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .maintain-page {
    padding: 3rem 1rem;

    .maintain-content {
      h1 {
        font-size: 1.5rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
}
</style>
