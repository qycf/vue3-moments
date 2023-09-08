
<template>
	<n-config-provider :theme="naiveTheme" :theme-overrides="!isDark ? themeOverrides : darkThemeOverrides">
		<div class="nav bg-black" ref="nav">
			<div class="nav-container mx-20" style="
			display: flex;
			flex-wrap: inherit;
			align-items: center;
			justify-content: space-between;
			width: 100%;
		">
				<img class="logo"
					src="/logo_light.png"
					alt="show your face">

				<n-menu v-if="!isMobile" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />

				<div v-if="isMobile" class="menu">
					<n-icon size="24px" color="#fff" @click="drawer = true">
						<MenuOutlined />
					</n-icon>
				</div>
				<n-space v-else class="ml-auto">
					<n-button round color="#e8e8e8" text-color="#5d636b" @click="$router.push('/auth/register')">
						注册
					</n-button>
					<n-button round color="#fe4821" @click="$router.push('/auth/login')">
						登陆
					</n-button>
				</n-space>
			</div>
		</div>
		<!-- <div class="media-container pt-20" style="background-color: #505050; position: relative;">
			<div class="media-bg"
				style="
          background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');">
			</div>
			<n-grid :x-gap="5" :y-gap="5" cols="16" item-responsive
				:class="`grid-screen ${isMobile ? `px-2` : `px-20`}  m-auto pb-5 relative`">
				<n-grid-item span="16 768:8" class="overflow-hidden "
					:style="`border-radius: 0.5rem;height:${isMobile ? `20rem` : `100%`}`">
					<div class="h-full">
						<div class="media-content first-media"
							style="
              background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');">
						</div>
					</div>
				</n-grid-item>
				<n-grid-item v-if="!isMobile" span="16 600:8 767:8" class="overflow-hidden !sm:h-full"
					style="height: 6rem;">
					<n-grid :x-gap="5" :y-gap="5" cols="4" class="grid-screen !sm:h-full" item-responsive>
						<n-grid-item v-for="  i   in   4  " span="2" class="overflow-hidden"
							:style="`border-radius: 0.5rem;height:${isMobile ? `6rem` : ``}`">
							<div class="h-full">
								<div class="media-content "
									style="
              background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');">
								</div>
							</div>
						</n-grid-item>
					</n-grid>
				</n-grid-item>

				<n-grid-item v-else v-for="i in 4" span="4" class="overflow-hidden "
					:style="`border-radius: 0.5rem;height:6rem`">
					<div class="h-full">
						<div class="media-content first-media"
							style="
              background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');">
						</div>
					</div>
				</n-grid-item>

			</n-grid>
		</div> -->
		<div id="container" :class="`mx-auto`" :style="`padding-top: ${isLaptop ? `5rem` : `3.5rem`};`">
			<n-grid :cols="24" item-responsive responsive="screen">
				<n-gi v-if="!isLaptop" span="24 m:3 l:0" class="mb-2">
					<div class="index_banner" :class="isDark ? `` : `bg-white`" :style="`background-image: url(&quot;${siteConfigRsp?.cover
						}&quot;);background-color: ${isDark ? `#3c3c3c` : `#fff`};`
						">
						<div class="user_info">
							<div class="top">
								<div class="left">
									<div class="name font-bold" style="color: #b7a34e">
										{{ siteConfigRsp?.nickname }}
									</div>
									<div class="des" :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">
										{{ siteConfigRsp?.description }}
									</div>
								</div>
								<div class="avatar">
									<img :src="siteConfigRsp?.avatar" />
								</div>
							</div>
						</div>
					</div>
				</n-gi>
				<n-gi span="0 m:4 l:4" offset="0 m:2 l:3">
					<SiderBar :siteSettings="siteConfigRsp" :is-laptop="isLaptop" :is-dark="isDark" />
				</n-gi>
				<n-gi span="24 m:15 l:13">
					<div ref="containerRef" class="moments_main px-2" style="width: 100vw">
						<n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
							<n-gi span="24 m:16 l:13">
								<Moments :data="momentsList" :is-dark="isDark" />
								<transition enter-active-class="animate__animated"
									leave-active-class="animate__animated animate__backOutLeft">
									<div v-show="momentsList.length < 1">
										<div v-for="       i        in        5       " :key="i" class="mb-2.5 p-2.5"
											:style="{ background: isDark ? '#3c3c3c' : '#fff' }"
											style="border-radius: 0.75rem;">
											<n-space vertical>
												<n-space>
													<n-skeleton :width="50" circle height="3.2rem" :sharp="false"
														size="medium" />
													<n-space vertical :size="1">
														<n-skeleton height="1.5rem" :width="80" round size="medium" />
														<n-skeleton height="1.5rem" :width="160" round size="medium" />
													</n-space>
												</n-space>
												<n-skeleton height="1.5rem" :sharp="false" />
												<n-skeleton height="1.5rem" :sharp="false" />
												<n-skeleton height="1.5rem" :sharp="false" />
												<n-skeleton height="1.5rem" :sharp="false" />
												<n-skeleton height="1.5rem" :sharp="false" />
												<n-space justify="space-between">
													<n-space>
														<n-skeleton :width="70" height="2rem" :sharp="false"
															size="medium" />
														<n-skeleton :width="50" height="2rem" :sharp="false"
															size="medium" />
													</n-space>
													<n-skeleton :width="50" height="2rem" :sharp="false" size="medium" />
												</n-space>
											</n-space>
										</div>
									</div>
								</transition>

							</n-gi>
						</n-grid>
					</div>
					<n-empty v-show="isLastPage" description="没有更多了" :show-icon="false">
					</n-empty>
				</n-gi>
			</n-grid>
			<n-back-top :right="15" />
			<LoginForm :is-laptop="isLaptop" />
			<n-drawer v-model:show="drawer" width="60vw" placement="left" display-directive="show">
				<n-drawer-content>
					<template #header>
						<n-space justify="end">
							<MNavigation />
						</n-space>
					</template>
					<n-menu v-model:value="activeKey" :options="menuOptions" />
					<template #footer>
						<n-button>Footer</n-button>
					</template>
				</n-drawer-content>
			</n-drawer>
		</div>
		<!-- <n-tabs :bar-width="0" default-value="moments" :justify-content="isMobile ? 'start' : 'center'" type="line">
			<n-tab-pane name="moments" tab="动态">
				<div id="container" class="mx-auto ">
					<n-grid :cols="24" item-responsive responsive="screen">
						<n-gi span="0 m:4 l:4" offset="0 m:2 l:3">
							<SiderBar class="mt-2" :siteSettings="siteConfigRsp" :is-laptop="isLaptop" :is-dark="isDark" />
						</n-gi>
						<n-gi span="24 m:15 l:13">
							<div ref="containerRef" class="moments_main p-2" style="width: 100vw">
								<n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
									<n-gi span="24 m:16 l:13">
										<Moments :data="momentsList" :is-dark="isDark" />
										<transition enter-active-class="animate__animated"
											leave-active-class="animate__animated animate__backOutLeft">
											<div v-show="momentsList.length < 1">
												<div v-for="  i   in   5  " :key="i" class="mb-2.5 p-2.5"
													:style="{ background: isDark ? '#3c3c3c' : '#fff' }"
													style="border-radius: 0.75rem;">
													<n-space vertical>
														<n-space>
															<n-skeleton :width="50" circle height="3.2rem" :sharp="false"
																size="medium" />
															<n-space vertical :size="1">
																<n-skeleton height="1.5rem" :width="80" round
																	size="medium" />
																<n-skeleton height="1.5rem" :width="160" round
																	size="medium" />
															</n-space>
														</n-space>
														<n-skeleton height="1.5rem" :sharp="false" />
														<n-skeleton height="1.5rem" :sharp="false" />
														<n-skeleton height="1.5rem" :sharp="false" />
														<n-skeleton height="1.5rem" :sharp="false" />
														<n-skeleton height="1.5rem" :sharp="false" />
														<n-space justify="space-between">
															<n-space>
																<n-skeleton :width="70" height="2rem" :sharp="false"
																	size="medium" />
																<n-skeleton :width="50" height="2rem" :sharp="false"
																	size="medium" />
															</n-space>
															<n-skeleton :width="50" height="2rem" :sharp="false"
																size="medium" />
														</n-space>
													</n-space>
												</div>
											</div>
										</transition>

									</n-gi>
								</n-grid>
							</div>
							<n-empty v-show="isLastPage" description="没有更多了" :show-icon="false">
							</n-empty>
						</n-gi>
					</n-grid>
					<n-back-top :right="15" />
					<LoginForm :is-laptop="isLaptop" />
				</div>
			</n-tab-pane>
			<n-tab-pane style="width: 100vw;" name="article" tab="文章">
				<div id="container" class="mx-auto ">
					<n-grid :class="isMobile ? 'px-2' : 'px-20'" :x-gap="isMobile ? 3 : 15" :y-gap="isMobile ? 5 : 15"
						:cols="24" item-responsive>
						<n-grid-item v-for="i in 8" span="12 400:12 600:8 800:6">
							<n-card title="带封面的卡片" style="border-radius: .5rem;">
								<template #cover>
									<div class="media-content "
										style="
              background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');height: 200px;border-radius: 0px !important;">
									</div>
								</template>
								卡片内容
							</n-card>
						</n-grid-item>
					</n-grid>
				</div>
			</n-tab-pane>
		</n-tabs>

		<div v-if="false" id="container" class="mx-auto ">
			<n-grid :cols="24" item-responsive responsive="screen">
				<n-gi v-if="!isLaptop" span="24 m:3 l:0">
					<div class="index_banner" :class="isDark ? `` : `bg-white`" :style="`background-image: url(&quot;${siteConfigRsp?.cover
						}&quot;);background-color: ${isDark ? `#3c3c3c` : `#fff`};`
						">
						<MNavigation />
						<div class="user_info">
							<div class="top">
								<div class="left">
									<div class="name font-bold" style="color: #b7a34e">
										{{ siteConfigRsp?.nickname }}
									</div>
									<div class="des" :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">
										{{ siteConfigRsp?.description }}
									</div>
								</div>
								<div class="avatar">
									<img :src="siteConfigRsp?.avatar" />
								</div>
							</div>
						</div>
					</div>
				</n-gi>
				<n-gi span="0 m:4 l:3" offset="0 l:3">
					<n-affix :trigger-top="9" :listen-to="() => siderBarRef">
		<SiderBar class="mt-2" :siteSettings="siteConfigRsp" :is-laptop="isLaptop" :is-dark="isDark" />
		</n-affix>
		</n-gi>
		<n-gi span="24 m:17 l:13">
			<div ref="containerRef" class="moments_main p-2" style="width: 100vw">
				<n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
					<n-gi span="24 m:16 l:13">
						<Moments :data="momentsList" :is-dark="isDark" />
						<transition enter-active-class="animate__animated"
							leave-active-class="animate__animated animate__backOutLeft">
							<div v-show="momentsList.length < 1">
								<div v-for="  i   in   5  " :key="i" class="mb-2.5 p-2.5"
									:style="{ background: isDark ? '#3c3c3c' : '#fff' }" style="border-radius: 0.75rem;">
									<n-space vertical>
										<n-space>
											<n-skeleton :width="50" circle height="3.2rem" :sharp="false" size="medium" />
											<n-space vertical :size="1">
												<n-skeleton height="1.5rem" :width="80" round size="medium" />
												<n-skeleton height="1.5rem" :width="160" round size="medium" />
											</n-space>
										</n-space>
										<n-skeleton height="1.5rem" :sharp="false" />
										<n-skeleton height="1.5rem" :sharp="false" />
										<n-skeleton height="1.5rem" :sharp="false" />
										<n-skeleton height="1.5rem" :sharp="false" />
										<n-skeleton height="1.5rem" :sharp="false" />
										<n-space justify="space-between">
											<n-space>
												<n-skeleton :width="70" height="2rem" :sharp="false" size="medium" />
												<n-skeleton :width="50" height="2rem" :sharp="false" size="medium" />
											</n-space>
											<n-skeleton :width="50" height="2rem" :sharp="false" size="medium" />
										</n-space>
									</n-space>
								</div>
							</div>
						</transition>
					</n-gi>
				</n-grid>
			</div>
			<n-empty v-show="isLastPage" description="没有更多了" :show-icon="false">
			</n-empty>
		</n-gi>
		</n-grid>
		<n-back-top :right="15" />
		<LoginForm :is-laptop="isLaptop" />
		</div> -->


	</n-config-provider>
</template>

<script lang="ts" setup>
import { MenuOption, NConfigProvider } from 'naive-ui'
import { MenuOutlined } from '@vicons/material'
import { naiveTheme } from 'vue-dark-switch'
import { isDark } from 'vue-dark-switch'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { siteSettings } from '~/api/siteSettings'
import { momentsListService } from '~/api/moments'
import 'animate.css';
import '~/styles/index.css'
import { themeOverrides, darkThemeOverrides } from '~/styles/theme'
import { useInfiniteScroll } from '@vueuse/core'
import { usePagination } from "@alova/scene-vue";
import { RouterLink } from 'vue-router'


const { start, done } = useNProgress()

const drawer = ref(false)
const activeKey = ref('/')
const menuOptions: MenuOption[] = [
	{
		label: () =>
			h(

				RouterLink,
				{
					to: {
						name: '/',
						params: {
							lang: 'zh-CN'
						}
					}
				},
				{
					default: () => '首页'
				}
			),
		key: '/',

	}
]
const nav = ref<HTMLElement | null>(null)
const i = ref(0)
window.addEventListener("scroll", function () {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
		document.body.scrollTop
	var scroll = scrollTop - i.value;
	i.value = scrollTop;
	if (scroll < 0) {
		console.log('up')
		//添加你想要的事件
	} else {
		//添加你想要的事件
		console.log('down')
	}
	nav.value?.classList.toggle("sticky", window.scrollY > 0)
})


// 判断屏幕宽度
const isLaptop = useMediaQuery('(min-width: 1280px)')
const isMobile = useMediaQuery('(max-width: 768px)')
// 获取屏幕高度
const windowHeight = window.innerHeight


/**
 * 获取动态列表
 * @returns {momentsList} 动态列表
 * @returns {page} 当前页
 * @returns {pageCount} 总页数
 * @returns {pageSize} 每页条数
 *
 */
const { data: momentsList, page, isLastPage, loading } = usePagination(() => momentsListService(1, 5), {
	append: true,
	initialPageSize: 5,
	initialPage: 1,
	data: res => res.rows,
	total: res => res.total,
	initialData: {
		rows: [],
		total: 0,
		page: 1,
		size: 5,
		totalPage: 0
	},
})




useInfiniteScroll(
	window,
	() => {
		if (isLastPage.value === true) {
			return
		}
		page.value += 1
		// 加载条开始加载
	},
	{ distance: 10 }
)


/**
 * 获取网站配置
 *  @returns {SITE_CONFIG} 网站配置
 */
const { data: siteConfigRsp } = siteSettings()

</script>
<style scoped>
.sticky {
	backdrop-filter: saturate(180%) blur(6px);
	padding-top: .5rem;
	padding-bottom: .5rem;
	/* height: 4rem; */
	background-color: rgb(0 0 0/80%);
}

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