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
