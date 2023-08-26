import { useRequest } from 'vue-request'
import { setTitle } from '~/plugins/title'

export interface SITE_CONFIG {
	id: number
	title: string
	avatar: string
	cover: string
	nickname: string
	description: string
}

export const siteConfigReq = () => {
	const { data, loading, error } = useRequest<SITE_CONFIG>(
		() => http.get('/siteConfig'),
		{
			onSuccess: (res) => {
				setTitle(res.title, res.description)
			},
		},
	)
	return { data, loading, error }
}
