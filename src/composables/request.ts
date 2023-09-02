import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'

export const alovaInstance = createAlova({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	// VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
	statesHook: VueHook,
	// 请求适配器，推荐使用fetch请求适配器
	requestAdapter: GlobalFetch(),
	// 全局的请求拦截器
	beforeRequest(method) {
		// 假设我们需要添加token到请求头
		method.config.headers['token'] = 'aa1d23a85a264b3fb986a840bb3f891e'
		// method.config.headers['Content-Type'] = 'multipart/form-data; boundary=--------------------------196403161230052156545926';
	},
	// 使用数组的两个项，分别指定请求成功的拦截器和请求失败的拦截器
	responded: {
		// 请求成功的拦截器
		// 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
		// 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
		onSuccess: async (response) => {
			if (response.status >= 400) {
				toast.error(response.statusText ?? '未知请求错误')
				throw new Error(response.statusText)
			}
			const json = await response.json()

			if (json.code !== 200) {
				toast.warning(json.msg ?? '未知请求错误')
				// 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
				throw new Error(json.message)
			}

			// 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
			return json.data
		},

		// 请求失败的拦截器
		// 请求错误时将会进入该拦截器。
		// 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
		onError: (err) => {
			console.log('err')
			toast.warning(err ?? '未知请求错误')
		},
	},
})
