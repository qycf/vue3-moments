export interface TAGS {
	name: string
	color: string
	textColor: string
}

export interface MOMENTS {
	id: number
	title: string
	tags: Array<TAGS>
	content: string
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
