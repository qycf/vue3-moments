import { alovaInstance } from '~/composables/request'
import { useRequest } from 'alova'
import { usePagination } from '@alova/scene-vue'

export const saveOrUpdateMoments = () => {
	const { data, send } = useRequest(
		(moment: any) => alovaInstance.Post<MOMENTS>('/moments', moment
			,
			{
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
			}
		),
		{
			immediate: false,
		},

	)
	return { data, send }
}

export const momentsRsp = () => {
	const { data, send } = useRequest(
		(id: number) => alovaInstance.Get<MOMENTS>('/moments?id=' + id),
		{
			immediate: false,
		},
	)
	return { data, send }
}

export const banMoments = () => {
	const { send } = useRequest(
		(id: number, status: number) =>
			alovaInstance.Delete('/moments/ban?id=' + id + '&status=' + status),
		{
			immediate: false,
		},
	)
	return { send }
}

export const deleteMoments = () => {
	const { send } = useRequest(
		(id: number) => alovaInstance.Delete('/moments?id=' + id),
		{
			immediate: false,
		},
	)
	return { send }
}

export const momentsListService = (page: number, size: number) => {
	return alovaInstance.Get<MOMENTS_REQ>(
		'/moments/list?page=' + page + '&size=' + size,
	)
}

export const momentsListRsp = () => {
	const {
		data,
		send,
		page,
		pageSize,
		pageCount,
		loading,
		refresh,
		isLastPage,
	} = usePagination(
		(page: number, size: number) =>
			alovaInstance.Get<MOMENTS_REQ>(
				'/moments/list?page=' + page + '&size=' + size,
			),
		{
			// immediate: false,
			initialData: {
				rows: [],
				total: 0,
				page: 1,
				size: 0,
				totalPage: 0,
			},
			initialPage: 1,
			initialPageSize: 5,
			data: (res) => res.rows,
			total: (res) => res.total,
		},
	)

	return { data, send, page, pageSize, pageCount, loading, refresh, isLastPage }
}

export interface TAGS {
	name: string
	color: string
	textColor: string
}

export interface IMAGES {
	id: number
	url: string
	momentsId: number
	exif: string
	createTime: string
}

export interface MOMENTS {
	id: number
	title: string
	tags: string
	content: string
	images: Array<IMAGES>
	start: number
	isTop: number
	isPublish: number
	updateTime: string
	createTime: string
}

export interface MOMENTS_REQ {
	total: number
	page: number
	size: number
	totalPage: number
	rows: Array<MOMENTS>
}
