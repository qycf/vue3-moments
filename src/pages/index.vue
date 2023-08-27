<template>
	<!-- <a-scrollbar outer-style="background-colorre" style="overflow-x:hidden;overflow-y: auto;max-height: 100vh" ref="scrollbar"> -->
	<n-config-provider :theme="naiveTheme">
		<div id="container" class="mx-auto overflow-x-hidden overflow-y-auto" ref="scrollbar" :style="`height: ${windowHeight}px;`">
			<!-- 移动端头部cover -->
			<n-grid :cols="24" item-responsive responsive="screen">
				<n-gi v-if="!isLaptop" span="24 m:0 l:0">
					<div class="index_banner" :class="isDark ? `` : `bg-white`" :style="`background-image: url(&quot;${siteConfig?.cover
						}&quot;);background-color: ${isDark ? `#3c3c3c` : `#fff`};`">
						<MNavigation />
						<div class="user_info">
							<div class="top">
								<div class="left">
									<div class="name font-bold" style="color: #b7a34e">
										{{ siteConfig?.nickname }}
									</div>
									<div class="des" :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">
										{{ siteConfig?.description }}
									</div>
								</div>
								<div class="avatar">
									<img src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG" />
								</div>
							</div>
						</div>
					</div>
				</n-gi>
				<n-gi span="24 m:24 l:24">
					<div ref="containerRef" class="moments_main p-2" style="width: 100vw">
						<n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
							<n-gi span="24 m:16 l:13" offset="0 m:1 l:3">
								<Moments :data="momentsData" :is-dark="isDark" />
								<transition enter-active-class="animate__animated"
									leave-active-class="animate__animated animate__backOutLeft">
									<div v-show="isLoading">
										<div v-for="i in 5" :key="i" class="mb-2.5 p-2.5" style="border-radius: 0.75rem"
											:style="{ background: isDark ? '#3c3c3c' : '#fff' }">
											<n-space vertical :size="5">
												<n-skeleton height="1.5rem" width="5%" :sharp="false" />
												<n-skeleton height="2.5rem" :sharp="false" />
												<n-skeleton height="6rem" />
												<n-skeleton height="1.75rem" width="7%" />
											</n-space>
										</div>
									</div>
								</transition>

							</n-gi>
							<n-gi span="0 m:7 l:4">
								<n-affix :trigger-top="9" :listen-to="() => siderBarRef as any">
									<SiderBar class="animate__animated animate__bounceInDown" :siteConfig="siteConfig"
										:is-laptop="isLaptop" :is-dark="isDark" />
								</n-affix>
							</n-gi>
						</n-grid>

						<n-empty v-if="current >= totalPage" description="没有更多了" :show-icon="false">
						</n-empty>
						<!-- <div v-else ref="target" class="my-3 text-center">
								<n-spin size="medium" />
							</div> -->
					</div>
				</n-gi>
			</n-grid>
			<n-back-top :right="15" />
			<LoginForm :is-laptop="isLaptop" />
		</div>
	</n-config-provider>
	<!-- </a-scrollbar> -->
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { naiveTheme } from 'vue-dark-switch'
import { isDark } from 'vue-dark-switch'
import { usePagination, useRequest } from 'vue-request'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import useScroll from '~/composables/scroll'
import { throttle } from 'lodash'
import { siteConfigReq } from '~/api/siteConfig'
import { MOMENTS_REQ, MOMENTS } from '~/api/moments'
import 'animate.css';
import { useInfiniteScroll } from '@vueuse/core'

const { start, done } = useNProgress()

// 判断屏幕宽度
const isLaptop = useMediaQuery('(min-width: 1280px)')
// 获取屏幕高度
const windowHeight = window.innerHeight


// 动态数据
const momentsData = ref<MOMENTS[]>([])
// 侧边栏ref
const siderBarRef = ref<HTMLElement | undefined>(undefined)
// 滚动条ref
const scrollbar: any = ref(null);
// 滚动条是否触底
// const { isBottom } = useScroll(scrollbar)
// 骨架屏加载状态
const isLoading = ref(false)


useInfiniteScroll(
	scrollbar,
	() => {
		// load more
		console.log('load more');
		console.log("current", current.value);
		console.log("totalPage", totalPage.value);
		console.log("current.value >= totalPage.value", current.value >= totalPage.value);

		if (current.value >= totalPage.value) {
			return
		}
		console.log("继续加载");
		// 加载条开始加载
		start()
		// 骨架屏加载状态
		isLoading.value = true
		// 下一页
		nextPage()
	},
	{ distance: 10 }
)


/**
 * 获取网站配置
 *  @returns {SITE_CONFIG} 网站配置
 */
const { data: siteConfig } = siteConfigReq()

/**
 * 获取动态列表
 * @returns {MOMENTS_REQ} 动态列表
 * @returns {currentKey} 当前页
 * @returns {totalPage} 总页数
 * @returns {pageSize} 每页条数
 *
 */
const { current, totalPage, pageSize } = usePagination<MOMENTS_REQ>(
	() => http.get(`/moments/list`, {
		params: {
			page: currentKey.value,
			size: 5
		}
	}
	), {
	pagination: {
		currentKey: 'currentKey',
		totalPageKey: 'totalPage',
		totalKey: 'total',
		pageSizeKey: 'size',
	},
	onSuccess: (res) => {
		console.log("onSuccess totalPage", totalPage.value);

		momentsData.value?.push(...res.rows)
		isLoading.value = false
		done()
	},
})
// 当前页，默认为1
const currentKey = ref(1)
// 每页条数，默认为5
pageSize.value = 1

// 下一页
const nextPage = throttle(
	() => {
		setTimeout(() => {
			currentKey.value += 1
			current.value += 1
		}, 2000)
	},
	1500,
	{ leading: true, trailing: false },
)





/**
 * 触底监听，触底后加载下一页
 * @param isBottom
 */
// watch(isBottom, (newIsBottom) => {
// 	console.log(newIsBottom);
// 	const isDone = current.value >= totalPage.value
// 	if (newIsBottom && !isDone) {
// 		// 设置为false，防止重复加载
// 		isBottom.value = false
// 		// 加载条开始加载
// 		start()
// 		// 骨架屏加载状态
// 		isLoading.value = true
// 		// 下一页
// 		nextPage()

// 	}
// })



</script>
<style >




.index_banner {
	height: 200px;
	position: relative;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}

.user_info {
	position: absolute;
	bottom: 3%;
	right: 5%;
}

.user_info .top {
	display: flex;
	align-items: center;
}

.user_info .left {
	display: flex;
	flex-direction: column;
	align-content: flex-end;
	align-items: flex-end;
	padding-right: 10px;
}

.user_info .avatar {
	width: 50px;
	height: 50px;
}

.user_info .name {
	font-weight: 600;
}

.user_info .des {
	font-size: 13px;
	text-align: right;
}

.user_info .avatar img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 8px;
}

.index_banner img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}
</style>