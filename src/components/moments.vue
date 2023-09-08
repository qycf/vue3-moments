<template>
	<div>
		<TransitionGroup name="list" tag="ul">
			<div v-for="(item, index) in data" :key="index" class="hover mb-2.5 p-2.5" style="border-radius: 0.75rem"
				:style="{ background: isDark ? '#3c3c3c' : '#fff' }">
				<!-- 动态顶部 -->
				<div v-if="item.isTop === 1" :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">
					<!-- <icon-to-top class="mx-2" />{{ $t('pined') }} -->
					<icon-to-top class="mx-2" />{{ $t('pined') }}
					<n-divider style="
							margin-top: 0.5rem !important;
							margin-bottom: 0.5rem !important;
						" />
				</div>
				<!-- 头像、时间 -->
				<div class="moment_info">
					<div class="avatar">
						<div class="avatar">
							<n-avatar round
								src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG" />
						</div>
					</div>
					<div class="info mb-1">
						<div class="right">
							<div class="name text-lg" style="color: #b7a34e">qiuyue2525</div>
							<div class="date" :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">
								{{ dateComputed('2023-08-04 17:02:11') }}
							</div>
						</div>
					</div>
					<!-- 标签 -->
					<n-space :size="2">
						<!-- <n-tag v-for="(n, index) in tagsComputed(item.tags)" :key="index" :bordered="false" round size="small">
						{{ $t(n) }}
					</n-tag> -->
					</n-space>
				</div>
				<!-- 动态内容 -->
				<div class="mt-1">
					<!-- 文本内容 -->
					<div class="content" v-html="item.content"></div>
					<!-- 图片 -->
					<a-grid item-responsive class="mt-1" :col-gap="1" :row-gap="1" :cols="3">
						<a-image-preview-group infinite>
							<a-grid-item v-for="i in item?.images" :key="i.id">
								<a-image width="100%" height="100%" fit="cover" :src="i.url" show-loader>
								</a-image>
							</a-grid-item>
						</a-image-preview-group>
					</a-grid>
					<!-- 操作栏 -->
					<n-message-provider>
						<CommentActions :start="item.start" class="mt-4" />
					</n-message-provider>
				</div>
			</div>
		</TransitionGroup>
	</div>
</template>

<script lang="ts" setup>
import { IconToTop } from '@arco-design/web-vue/es/icon'
import { MOMENTS } from '@/api/moments'
// 获取当前时间戳
const timestamp = Date.now() / 1000
defineProps({
	data: {
		type: Array as PropType<MOMENTS[]>,
		default: () => { },
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

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
	position: absolute;
}

.hover {
	transition: all 0.5s ease;
}

.hover:hover {
	transform: scale(1.02);
	box-shadow: 0 0 5 px rgba(0, 0, 0, 0.2);
}
</style>
