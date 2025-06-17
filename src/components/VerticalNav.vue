<template>
  <div class="vertical-nav">
    <nav class="nav-links">
      <template v-for="link in links" :key="link.path">
        <RouterLink
            v-if="!link.path.includes('https')"
            :to="link.path"
            class="nav-link"
            :class="{ active: currentPath === link.path }"
        >
          {{ link.name }}
        </RouterLink>
        <a
            v-else
            :href="link.path"
            target="_blank"
            rel="noopener"
            class="nav-link"
        >
          {{ link.name }}
        </a>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'
import {ElNotification} from "element-plus";

// 声明导航项的数据结构
interface NavLink {
  name: string
  path: string
}

const links = ref<NavLink[]>([])

const route = useRoute()
const currentPath = computed(() => route.path)

onMounted(async () => {
  try {
    const response = await axios.get('/assets/data/navs.json')
    links.value = response.data
  } catch (error) {
    ElNotification({
      title: "Error",
      message: '' + error,
      type: "error",
    });  }
})

</script>

<style scoped lang="scss">
.vertical-nav {
  position: fixed;
  z-index: 1000;
  bottom: 10px;
  left: 10px;

  .nav-links {
    writing-mode: vertical-rl;
    text-orientation: upright;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-link {
    color: #ffffff;
    text-decoration: none;
    padding: 4px;
    transition: color 0.3s;
    font-size: 16px;

    &:hover {
      color: var(--el-color-primary);
    }

    &.active {
      font-weight: bold;
      color: var(--el-color-primary);
    }
  }
}

@media screen and (max-width: 768px) {
  .vertical-nav {
    width: auto;
    bottom: 10px;

    .nav-link {
      text-orientation: mixed;
      flex-direction: row;
      font-size: 13px;

    }
  }
}
</style>
