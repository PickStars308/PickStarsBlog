// stores/app.js
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isLoading: true, // 默认加载中
        showFooter: false,
    }),
    actions: {
        setLoading(value: boolean) {
            this.isLoading = value
        },
        setScrollDown(value: boolean) {
            this.showFooter = value
        }
    }
})
