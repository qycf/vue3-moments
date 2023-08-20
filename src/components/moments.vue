<template>
	<template v-for="(item, index) in data" :key="index">
		<div
			class="mb-2.5 p-2.5"
			style="border-radius: 0.75rem"
			:style="{ background: isDark ? '#3c3c3c' : '#fff' }"
		>
			<!-- 动态顶部 -->
			<div
				v-if="item.isTop === 1"
				:style="{ color: isDark ? '#8f918e' : '#a6a6a6' }"
				class="1"
			>
				<!-- <icon-to-top class="mx-2" />{{ $t('pined') }} -->
				<icon-to-top class="mx-2" />{{ $t('pined') }}
				<n-divider
					style="
						margin-top: 0.5rem !important;
						margin-bottom: 0.5rem !important;
					"
				/>
			</div>
			<!-- 头像、时间 -->
			<div class="moment_info">
				<div class="avatar">
					<div class="avatar">
						<n-avatar
							round
							src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG"
						/>
					</div>
				</div>
				<div class="info mb-1">
					<div class="right">
						<div class="name text-lg" style="color: #b7a34e">qiuyue2525</div>
						<div
							class="date"
							:style="{ color: isDark ? '#8f918e' : '#a6a6a6' }"
						>
							{{ dateComputed('2023-08-04 17:02:11') }}
						</div>
					</div>
				</div>
				<!-- 弹出选项 -->
				<n-space>
					<n-tag
						v-for="(n, index) in item.tags"
						:key="index"
						:bordered="false"
						round
						size="small"
						:type="tagsType[n]"
					>
						{{ $t(n) }}
					</n-tag>
				</n-space>
			</div>
			<!-- 动态内容 -->
			<div class="mt-1">
				<!-- 文本内容 -->
				<div class="content" v-html="item.content"></div>
				<!-- 图片 -->
				<a-grid
					item-responsive
					class="mt-1"
					:col-gap="1"
					:row-gap="1"
					:cols="3"
				>
					<a-image-preview-group infinite>
						<a-grid-item v-for="i in item?.images" :key="i">
							<a-image
								width="100%"
								height="100%"
								fit="cover"
								:src="i.url"
								show-loader
							>
							</a-image>
						</a-grid-item>
					</a-image-preview-group>
				</a-grid>
				<!-- 操作栏 -->
				<CommentActions class="mt-4" />
			</div>
		</div>
	</template>
</template>

<script lang="ts" setup>
import { IconToTop } from '@arco-design/web-vue/es/icon'

// 获取当前时间戳
const timestamp = Date.now() / 1000

const tagsType = {
	humanity: 'success',
	scenery: 'warning',
	portrait: 'error',
} as any

defineProps({
	data: {
		type: Object,
		default: () => {},
	},
	isDark: {
		type: Boolean,
		default: false,
	},
})
// 时间计算
const dateComputed = computed(() => {
	return (dateStr: string) => {
		const date = new Date(dateStr)
		const month = date.getMonth() + 1
		const day = date.getDate()
		const commentsTimestamp = date.getTime() / 1000
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`
		const timeDifference = timestamp - commentsTimestamp
		if (timeDifference < 86400) {
			return `今天 ${hours}:${minutesStr}`
		} else if (timeDifference < 172800) {
			return `昨天 ${hours}:${minutesStr}`
		} else if (timeDifference < 259200) {
			return `前天 ${hours}:${minutesStr}`
		}
		return `${month}月${day}日 ${hours}:${minutesStr}`
	}
})
</script>
<style scoped>
.moment_info {
	display: flex;
	/* 使用 Flex 布局 */
	align-items: center;
	/* 垂直居中 */
}

.avatar {
	margin-right: 0.5rem;
	/* 可根据需要调整间距 */
}

.info {
	flex: 1;
	/* 占据剩余空间 */
}
</style>