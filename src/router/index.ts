import {createMemoryHistory, createRouter} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/Views/Home.vue')
    },
    {
        path: '/About',
        name: 'About',
        component: () => import('@/Views/About.vue') // 懒加载
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
