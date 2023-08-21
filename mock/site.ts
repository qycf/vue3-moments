import { MockMethod } from 'vite-plugin-mock'

export default [
	{
		url: '/api/mock/profile',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: {
					avatar:
						'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG',
					cover:
						'https://12366.chinatax.gov.cn/znzx/oss/download?oid=ZNZX00-230821165913-16926083539795620623349026986915',
					nickname: 'qiuyue2525',
					description: 'show your face',
				},
			}
		},
	},
] as MockMethod[]
