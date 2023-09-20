import { setTitle } from '~/plugins/title'
import { alovaInstance } from '~/composables/request'
import { useRequest } from 'alova'
import { useSiteSettingsStore } from '~/stores/siteSettings'
export interface SITE_SETTINGS {
	id: number
	title: string
	avatar: string
	cover: string
	nickname: string
	description: string
}

export const siteSettingsReq = () => {
	const { data, onSuccess } = useRequest(() =>
		alovaInstance.Get<SITE_SETTINGS>('/siteSettings'),
	)
	onSuccess((res) => {
		const siteSettingStore = useSiteSettingsStore()
		siteSettingStore.setSiteSettings(res.data)
	})
	return { data }
}
