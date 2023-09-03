
<template>
	<n-config-provider :theme="naiveTheme">
		<div class="nav bg-black" ref="nav">
			<n-grid :cols="24" item-responsive responsive="screen">
				<n-gi span="4" offset="3">
					Nav
				</n-gi>
			</n-grid>
		</div>
		<div style="padding-top: 5rem; background-color: #181818; position: relative">
			<div style="
          background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');
          opacity: 0.2;
          filter: blur(10px);
          transform: scale(1.1);
          position: absolute;
          max-width: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          overflow: hidden;
        "></div>
			<n-grid cols="8" item-responsive responsive="screen" class=" px-40 m-auto pb-8 relative"
				style="max-width: 1280px;height: 65vh;">
				<n-grid-item span="4" class="overflow-hidden">
					<div class="h-full">
						<div class="media-content "
							style="
              background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');">
						</div>
					</div>
				</n-grid-item>
				<n-grid-item span="4" class="overflow-hidden">
					<n-grid cols="2" style="height: 65vh;">
						<n-grid-item v-for="i in 4" span="1" class="overflow-hidden">
							<div class="h-full">
								<div class="media-content "
									style="
              background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');">
								</div>
							</div>
						</n-grid-item>
					</n-grid>

				</n-grid-item>

			</n-grid>
			<!-- <div class="parent object-cover relative pb-5 h-1/3" style="width: 1250px; margin: auto; z-index: 999;">
				<div class="div1">
					<div class="media-content" style="
              background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');
              object-fit: cover;
              height: 100%;
            ">1</div>
				</div>
				<div class="div2 media-content" style="
            background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');
            object-fit: cover;
            height: 100%;
          ">

				</div>
				<div class="div3 media-content" style="
            background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');
            object-fit: cover;
            height: 100%;
          ">
					3
				</div>
				<div class="div4 media-content" style="
            background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');
            object-fit: cover;
            height: 100%;
          ">
					4
				</div>
				<div class="div5 media-content" style="
            background-image: url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082806171782.jpg');
            object-fit: contain;
            height: 100%;
          ">
					5
				</div>
			</div> -->
		</div>

		<div id="container" class="mx-auto ">
			<!-- 移动端头部cover -->
			<n-grid :cols="24" item-responsive responsive="screen">
				<n-gi v-if="!isLaptop" span="24 m:0 l:0">
					<div class="index_banner" :class="isDark ? `` : `bg-white`" :style="`background-image: url(&quot;${siteConfigRsp?.cover
						}&quot;);background-color: ${isDark ? `#3c3c3c` : `#fff`};`">
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
				<n-gi span="0 m:4 l:1" offset="2 l:3">
					<!-- <n-affix :trigger-top="9" :listen-to="() => siderBarRef"> -->
					<SiderBar class="mt-2  animate__animated animate__bounceInDown" :siteSettings="siteConfigRsp"
						:is-laptop="isLaptop" :is-dark="isDark" />
					<!-- </n-affix> -->
				</n-gi>
				<n-gi span="24 m:17 l:12">
					<div ref="containerRef" class="moments_main p-2" style="width: 100vw">
						<n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
							<n-gi span="24 m:16 l:13" offset="0 m:1 l:3">
								<Moments :data="momentsList" :is-dark="isDark" />
								<transition enter-active-class="animate__animated"
									leave-active-class="animate__animated animate__backOutLeft">
									<div v-show="momentsList.length < 1">
										<div v-for="i in 5" :key="i" class="mb-2.5 p-2.5"
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

						<n-empty v-show="isLastPage" description="没有更多了" :show-icon="false">
						</n-empty>
					</div>
				</n-gi>
			</n-grid>
			<n-back-top :right="15" />
			<LoginForm :is-laptop="isLaptop" />
		</div>
	</n-config-provider>
</template>

<script lang="ts" setup>
import { MenuOption, NConfigProvider } from 'naive-ui'
import { naiveTheme } from 'vue-dark-switch'
import { isDark } from 'vue-dark-switch'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { siteSettings } from '~/api/siteSettings'
import { momentsListService } from '~/api/moments'
import 'animate.css';
import { useInfiniteScroll } from '@vueuse/core'
import { usePagination } from "@alova/scene-vue";
import { RouterLink } from 'vue-router'
const { start, done } = useNProgress()


const activeKey = ref('1')
const menuOptions: MenuOption[] = [
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: '',
						params: {
							lang: 'zh-CN'
						}
					}
				},
				{ default: () => '首页' }
			),
		key: 'home',

	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: '',
						params: {
							lang: 'zh-CN'
						}
					}
				},
				{ default: () => '首页' }
			),
		key: 'home',

	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: '',
						params: {
							lang: 'zh-CN'
						}
					}
				},
				{ default: () => '首页' }
			),
		key: 'home',

	},


	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: '',
						params: {
							lang: 'zh-CN'
						}
					}
				},
				{ default: () => '首页' }
			),
		key: 'home',

	},
]
const nav = ref<HTMLElement | null>(null)
window.addEventListener("scroll", function () {
	nav.value?.classList.toggle("sticky", window.scrollY > 0)
})








// 判断屏幕宽度
const isLaptop = useMediaQuery('(min-width: 1280px)')
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
.media-content {
	transition: all .444s ease-in-out;
	background-color: rgba(120, 120, 120, .1);
	background-repeat: no-repeat;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	height: 100%;
	width: 100%;
	overflow: hidden;
	object-fit: cover;
}

.media-content:hover {
	transition: all .444s ease-in-out;
	transform: scale(1.05);
}

.parent {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 1fr);
	grid-column-gap: 5px;
	grid-row-gap: 5px;
	height: 66vh !important;
}

.div1 {
	grid-area: 1 / 1 / 9 / 5;
	background-position: 50% 50%;
	overflow: hidden;

}

.div2 {
	grid-area: 1 / 5 / 5 / 7;
	background-position: 50% 50%;
}

.div3 {
	grid-area: 1 / 7 / 5 / 9;
	background-position: 50% 50%;
}

.div4 {
	grid-area: 5 / 5 / 9 / 7;
	background-position: 50% 50%;
}

.div5 {
	grid-area: 5 / 7 / 9 / 9;
	background-position: 50% 50%;
}






.nav {
	background-color: transparent;
	box-shadow: none;
	width: 100%;
	height: 100px;
	transition: all .3s ease-in-out;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
}

.sticky {
	background-color: red;
	backdrop-filter: saturate(180%) blur(6px);
	padding-top: .25rem;
	padding-bottom: .25rem;
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