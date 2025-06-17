import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        isSettingsModalOpen: false,
        wallpaperType: localStorage.getItem('wallpaperType') || 'random',
    }),
    actions: {
        toggleSettingsModal(open: boolean) {
            this.isSettingsModalOpen = open
        },
        toggleWallpaperType(type: string) {
            this.wallpaperType = type
            localStorage.setItem('wallpaperType', type)
        },
    },
})
