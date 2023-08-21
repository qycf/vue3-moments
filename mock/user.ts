import { MockMethod } from 'vite-plugin-mock'

export default [
	{
		url: '/api/mock/gallerys',
		method: 'get',
		response: () => {
			return {
				code: 0,
				data: {},
			}
		},
	},
] as MockMethod[]
