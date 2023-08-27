import { useRequest } from 'vue-request'

export const tagsListReq = () => {
	const { data } = useRequest(() => http.get(`/tags/list`))
	return data
}
