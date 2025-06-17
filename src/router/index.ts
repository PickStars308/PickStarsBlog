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
    },
    {
        path: '/PickStars',
        name: 'PickStars',
        component: () => import('@/Views/PickStars.vue')
    },
    {
        path: '/Download',
        component: () => import('@/Views/DownloadPage.vue')
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
