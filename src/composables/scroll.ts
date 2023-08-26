import { ref, onMounted, onUnmounted } from 'vue'
import { throttle } from 'lodash'

export default function scroll(elRef: any = null) {
	// 默认监听window上的scroll事件
	let el = window
	const isBottom = ref(false) // 是否触底
	const scrollHeight = ref(0) // 可滚动区域的高
	const scrollTop = ref(0) // 已经滚动区域的高
	const clientHeight = ref(0) // 可视区高度

	// vueUse判断是否为移动端
	const isMobile = useMediaQuery('(max-width: 768px)')

	// 使用lodash实现节流效果
	const scroll = throttle(() => {
		if (!elRef) {
			scrollHeight.value = document.documentElement.scrollHeight
			scrollTop.value = document.documentElement.scrollTop
			clientHeight.value = document.documentElement.clientHeight
		} else {
			scrollHeight.value = el.scrollHeight
			scrollTop.value = isMobile ? el.scrollTop + 0.5 : el.scrollTop
			clientHeight.value = el.clientHeight
		}
		// 以滚动高度 + 当前视口高度  >= 可滚动高度 = 触底
		if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
			isBottom.value = true
		}
		console.log('以滚动高度', scrollTop.value)
		console.log('当前视口高度', clientHeight.value)
		console.log('可滚动高度', scrollHeight.value)
	}, 100)

	// 页面初始化注册scroll事件
	onMounted(() => {
		// dom 挂载时判断外界是否传入dom实例
		if (elRef) {
			// el = elRef.value.containerRef
			el = elRef.value
		}
		el.addEventListener('scroll', scroll)
	})

	// 页面销毁时移除scroll事件
	onUnmounted(() => {
		el.removeEventListener('scroll', scroll)
	})

	return {
		isBottom,
		scrollHeight,
		scrollTop,
		clientHeight,
	}
}
