import { setTitle } from '~/plugins/title'
import { alovaInstance } from '~/composables/request'
import { useRequest } from 'alova'

export interface SITE_SETTINGS {
	id: number
	title: string
	avatar: string
	cover: string
	nickname: string
	description: string
}

export const siteSettings = () => {
	const { data, onSuccess } = useRequest(() =>
		alovaInstance.Get<SITE_SETTINGS>('/siteSettings'),
	)
	onSuccess((res) => {
		setTitle(res.data.title, res.data.description)
	})
	return { data }
}

// export const siteConfigReq = () => {
// 	const { data, loading, error } = useRequest<SITE_CONFIG>(
// 		() => http.get('/siteSettings'),
// 		{
// 			onSuccess: (res) => {
// 				setTitle(res.title, res.description)
// 			},
// 		},
// 	)
// 	return { data, loading, error }
// }
