import { defineStore } from 'pinia'
import { SITE_SETTINGS } from '~/api/siteSettings'

export const useSiteSettingsStore = defineStore('siteSettings', {
    state() {
        return {
            siteSettings: {} as SITE_SETTINGS,
        }
    },
    actions: {
        setSiteSettings(siteSettingsRsp: SITE_SETTINGS) {
            this.siteSettings = siteSettingsRsp
        },
    },
    // 设置为SessionStorage
    persist: {
        storage: sessionStorage,
    }
})
