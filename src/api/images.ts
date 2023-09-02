import { alovaInstance } from '~/composables/request'
import { useRequest } from 'alova'
import { IMAGES } from './moments'

interface IMAGES_GROUP {
	creationDate: string
	imagesList: Array<IMAGES>
}

export const imagesGroup = () => {
	const { data } = useRequest(() =>
		alovaInstance.Get<Array<IMAGES_GROUP>>('/images'),
	)
	return { data }
}
