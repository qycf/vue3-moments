
<template>
	<n-config-provider :theme="naiveTheme" :theme-overrides="!isDark ? themeOverrides : darkThemeOverrides">
			<Nav />
			<div id="container" :class="`mx-auto`" :style="`width:100vw;padding-top: ${isLaptop ? `5rem` : `3.5rem`};`">
				<n-grid :cols="24" item-responsive responsive="screen">
					<n-gi span="0 m:4" :key="1" />
					<n-gi span="24 m:16" class="mb-2 px-2" key="cover">
						<Banner />
					</n-gi>
					<n-gi span="0 m:4" :key="1" />
					<n-gi span="0 m:4" :key="1" />
					<n-gi span="24 m:16" key="moments">
						<div ref="containerRef" class="moments_main px-2" style="width: 100vw">
							<n-grid x-gap="12" :cols="24" key="moments" item-responsive responsive="screen">
								<n-gi span="24 m:16" key="moment">
									<Moments :data="momentsList" :is-dark="isDark" />
									<MomentsSkeleton v-if="loading" />
								</n-gi>
							</n-grid>
						</div>
						<n-empty v-show="isLastPage" description="没有更多了" :show-icon="false" />
					</n-gi>
					<n-gi span="0 m:4" :key="1" />
				</n-grid>
				<n-back-top :right="15" />
			</div>
	</n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { naiveTheme } from 'vue-dark-switch'
import { isDark } from 'vue-dark-switch'
import { themeOverrides, darkThemeOverrides } from '~/styles/theme'
import { useInfiniteScroll } from '@vueuse/core'
import { usePagination } from "@alova/scene-vue";
import { momentsListService } from '~/api/moments'
// 判断屏幕宽度
const isLaptop = useMediaQuery('(min-width: 1280px)')


/**
 * 获取动态列表
 * @returns {momentsList} 动态列表
 * @returns {page} 当前页
 * @returns {pageCount} 总页数
 * @returns {pageSize} 每页条数
 *
 */
const { data: momentsList, page, isLastPage, pageSize, loading } = usePagination((page, pageSize) => momentsListService(page, pageSize), {
	append: true,
	initialPageSize: 5,
	initialPage: 1,
	data: res => res.rows,
	total: res => res.total,
})


useInfiniteScroll(
	window,
	() => {
		if (isLastPage.value == true) {
			return
		}
		page.value++
	},
	{ distance: 10 }
)


</script>
<style scoped></style>