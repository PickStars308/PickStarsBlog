<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import axios from 'axios'
import {marked} from 'marked'
import {ElNotification} from 'element-plus'


interface PickStarsItem {
  id: string
  Use: boolean
  Data: {
    Title: string
    Version: string
    Description: string
    Log?: string
    Icon?: string
    Screenshots?: string[]
  }
  Download: {
    Link: string
    Password: string
  }
}

const route = useRoute()
const appParam = route.query.app as string

const appData = ref<PickStarsItem | null>(null)
const notFound = ref(false)
const changelogHtml = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('/assets/data/config.json')
    const items: PickStarsItem[] = res.data.PickStars || []

    const found = items.find(item => item.id === appParam)
    if (found && found.Use) {
      appData.value = found

      // 获取更新日志 markdown 内容
      if (found.Data.Log) {
        const logRes = await axios.get(found.Data.Log)
        changelogHtml.value = await marked.parse(logRes.data)
      }
    } else {
      notFound.value = true
    }
  } catch (error) {
    ElNotification({
      title: "Error",
      message: '' + error,
      type: "error",
    });
    notFound.value = true
  }
})
</script>


<template>
  <section class="store-download-page">
    <div v-if="appData" class="app-card">
      <div class="header">
        <img :src="appData.Data.Icon || '/default-icon.png'" alt="App 图标" class="icon"/>
        <div class="info">
          <h1>{{ appData.Data.Title }}</h1>
          <p class="version">版本：{{ appData.Data.Version }}</p>
          <p v-if="appData.Download.Password" class="password">提取码：{{ appData.Download.Password }}</p>
        </div>
        <a :href="appData.Download.Link" class="download-btn" target="_blank">下载</a>
      </div>

      <div v-if="appData.Data.Screenshots?.length" class="screenshots">
        <img v-for="(img, i) in appData.Data.Screenshots" :key="i" :src="img" alt="Screenshot"/>
      </div>

      <div class="description">
        <h2>应用简介</h2>
        <p>{{ appData.Data.Description }}</p>
      </div>

      <div class="changelog" v-if="changelogHtml">
        <h2>更新日志</h2>
        <div class="markdown-body" v-html="changelogHtml"></div>
      </div>

    </div>

    <div v-else-if="notFound" class="not-found">
      <h2>应用未找到或不可用</h2>
      <p>请检查链接是否正确或稍后再试。</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.store-download-page {
  padding: 10rem 5rem;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .app-card {
    width: 100%;
    padding: 2rem;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    .icon {
      width: 80px;
      height: 80px;
      border-radius: 20%;
      object-fit: cover;
      margin-right: 1.5rem;
    }

    .info {
      flex-grow: 1;

      h1 {
        font-size: 1.6rem;
        margin: 0;
      }

      .version,
      .password {
        font-size: 0.95rem;
        color: #bbb;
      }
    }

    .download-btn {
      background-color: #409eff;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 0.6rem;
      font-weight: bold;
      text-decoration: none;
      transition: background 0.3s ease;

      &:hover {
        background-color: #66b1ff;
      }
    }
  }

  .screenshots {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;

    img {
      height: 500px;
      border-radius: 0.75rem;
      object-fit: cover;
      flex-shrink: 0;
    }
  }

  .description {
    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      color: #ccc;
      line-height: 1.6;
    }
  }

  .changelog {
    margin-top: 2rem;

    h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .markdown-body {
      color: #ccc;
      line-height: 1.6;

      h3 {
        margin-top: 1rem;
        font-size: 1rem;
      }

      code {
        background: rgba(255, 255, 255, 0.1);
        padding: 0.2rem 0.4rem;
        border-radius: 0.3rem;
        font-family: monospace;
      }

      pre {
        background: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
      }

      ul {
        margin-left: 1rem;
        list-style: disc;
      }

      a {
        color: #4ea1ff;
        text-decoration: underline;
      }
    }
  }


  .not-found {
    text-align: center;
    color: #ccc;

    h2 {
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .store-download-page {
    padding: 4rem 1.5rem;

    .app-card {
      padding: 1rem;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      .icon {
        width: 60px;
        height: 60px;
        margin-right: 0;
      }

      .info {
        h1 {
          font-size: 1.3rem;
        }

        .version,
        .password {
          font-size: 0.85rem;
        }
      }

      .download-btn {
        width: 100%;
        text-align: center;
        padding: 0.5rem 0;
        font-size: 1rem;
        border-radius: 0.5rem;
      }
    }

    .screenshots {
      height: auto;
      gap: 0.5rem;
      overflow-x: scroll;

      img {
        height: 350px;
        min-width: 100px;
        border-radius: 0.5rem;
      }
    }

    .description, .changelog {
      h2 {
        font-size: 1.1rem;
      }

      p, .markdown-body {
        font-size: 0.9rem;
      }
    }
  }
}


</style>
