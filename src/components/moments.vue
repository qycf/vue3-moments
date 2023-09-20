<template>
	<div>
		<TransitionGroup name="list" tag="ul">
			<div v-for="(item, index) in   data  " :key="index" class="hover mb-2.5 p-2.5" style="border-radius: 0.75rem"
				:style="{ background: isDark ? '#3c3c3c' : '#fff' }">
				<!-- 动态顶部 -->
				<div v-if="item.isTop === 1" :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">
					<icon-to-top class="mx-2" />置顶
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
								{{ updateTimeComputed(item.createTime, item.updateTime) }}
							</div>
						</div>
					</div>
					<!-- 标签 -->
					<n-space :size="2">
						<n-tag v-for="i in toTags(item.tags)" :key="index" :bordered="false" round size="small">
							{{ i }}
						</n-tag>
					</n-space>
				</div>
				<!-- 动态内容 -->
				<div class="mt-1">
					<!-- 文本内容 -->
					<div class="content" v-html="item.content"></div>
					<!-- 图片 -->
					<n-grid class="mt-1" cols="24" :x-gap="2" item-responsive responsive="screen">
						<n-grid-item :span="`${imagesCountComputed(item.images)} m:6`" v-for="i, index in   item.images  "
							:key="index">
							<a-image :height="isMobile && item.images.length == 1 ? `350px` : `100%`" width="100%"
								fit="cover" :src="i.url" :key="index" show-loader :preview-props="{
									actionsLayout: ['rotateRight', 'zoomIn', 'zoomOut']
								} as any">
							</a-image>
						</n-grid-item>
					</n-grid>
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
import dayjs from 'dayjs'


// 获取当前时间
const now = dayjs().date()
// 判断当前是否移动端
const isMobile = useMediaQuery('(max-width: 768px)')

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

const formatDate = (date: number) => {
	return date < 10 ? `0${date}` : `${date}`;
};

const updateTimeComputed = (createTime: string, updateTime: string) => {
	if (isUpdateComputed(createTime, updateTime)) {
		return `${dateComputed(createTime)} 修改于 ${dateComputed(updateTime)}`;
	}
	return `${dateComputed(createTime)}`;


};

const dateComputed = (dateTime: string) => {
	const date = dayjs(dateTime, "YYYY-MM-DD HH:mm:ss");
	const month = formatDate(date.month() + 1);
	const dayOfMonth = date.date();
	const hour = formatDate(date.hour());
	const minute = formatDate(date.minute());
	const hhMM = `${hour}:${minute}`;

	const difference = now - dayOfMonth

	switch (difference) {
		case 0:
			return `今天 ${hhMM}`;
		case 1:
			return `昨天 ${hhMM}`;
		case 2:
			return `前天 ${hhMM}`;
		default:
			break;
	}
	if (difference > 2 && difference <= 7) {
		return `${difference}天前 ${hhMM}`;
	}

	return `${date.year()}-${month}-${dayOfMonth} ${hhMM}`;
}

const isUpdateComputed = (createTime: string, updateTime: string) => {
	return !dayjs(createTime, "YYYY-MM-DD HH:mm:ss").isSame(dayjs(updateTime, "YYYY-MM-DD HH:mm:ss"), 'day');
}

const imagesCountComputed = (images: any) => {
	if (images == null) {
		return 0;
	}
	if (images.length <= 3)
		return 24 / images.length
	return 24 / 3;
}

const toTags = (tags: string) => {
	// 如果为null，直接返回空数组
	if (tags == null) {
		return []
	}

	// 如果字符串不包含逗号，直接返回字符串

	if (!tags.includes(',')) {
		return [tags]
	}

	return tags.split(',')
}


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
