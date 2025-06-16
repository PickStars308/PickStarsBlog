import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreviewStore = defineStore('preview', () => {
    const isPreviewing = ref(false)

    const setPreview = (val: boolean) => {
        isPreviewing.value = val
    }

    return {
        isPreviewing,
        setPreview,
    }
})
