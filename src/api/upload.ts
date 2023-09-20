import { alovaInstance } from '~/composables/request'
import { useRequest } from 'alova'

export const uploadImages = () => {
	const { send } = useRequest(
		(files: FormData) => alovaInstance.Post('/upload/image', files),
		{
			immediate: false,
		},
	)

	return { send }
}

export const uploadImagesByUrls = () => {
	const { send } = useRequest(
		(urls: string[]) => alovaInstance.Post('/images/upload?urls=' + urls,),
		{
			immediate: false,
		},
	)
	return { send }
}