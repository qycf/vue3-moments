<template>
	<a-scrollbar style="overflow: auto;">
		<n-config-provider :theme="naiveTheme">
			<div id="container" class="mx-auto" style="max-height: 100vh;">
				<!-- 移动端头部cover -->
				<n-grid :cols="24" item-responsive responsive="screen">
					<n-gi span="24 m:0 l:0" v-if="!isLaptop">
						<div class="index_banner" :class="isDark ? `` : `bg-white`"
							:style="`background-image: url(&quot;${cover}&quot;);background-color: ${isDark ? `#3c3c3c` : `#fff`};`">
							<MNavigation />
							<div class="user_info">
								<div class="top">
									<div class="left">
										<div class="name font-bold" style="color: #b7a34e">qiuyue2525</div>
										<div class="des " :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">Show your face
										</div>
									</div>
									<div class="avatar"><img
											src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG">
									</div>
								</div>
							</div>
						</div>
					</n-gi>
					<n-gi span="24 m:24 l:24">
						<div class="moments_main p-2" ref="containerRef" style="width: 100vw">
							<n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
								<n-gi span="24 m:16 l:13" offset="0 m:1 l:3">
									<div v-if="momentsData == null" v-for="i in 5" class="p-2.5 mb-2.5"
										style="border-radius: 0.75rem;"
										:style="{ background: (isDark ? '#3c3c3c' : '#fff') }">
										<n-space vertical :size="5">
											<n-skeleton height="1.5rem" width="5%" :sharp="false" />
											<n-skeleton height="2.5rem" :sharp="false" />
											<n-skeleton height="6rem" />
											<n-skeleton height="1.75rem" width="7%" />
										</n-space>
									</div>
									<moments :data="momentsData" :is-dark="isDark" />
								</n-gi>
								<n-gi span="0 m:7 l:4">
									<n-affix :trigger-top="9" :listen-to="() => containerRef as any">
										<SiderBar :is-laptop="isLaptop" :cover="cover" :is-dark="isDark" />
									</n-affix>
								</n-gi>
							</n-grid>
							<n-empty v-if="isDone" description="没有更多了" :show-icon="false"> </n-empty>
							<div v-else ref="target" class=" text-center my-3">
								<n-spin size="medium" />
							</div>
						</div>
					</n-gi>
				</n-grid>
				<n-back-top :right="15" />
			</div>
		</n-config-provider>
	</a-scrollbar>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { naiveTheme } from 'vue-dark-switch'
import { isDark } from 'vue-dark-switch'
import { useRequest } from 'vue-request'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { throttle } from 'lodash'
import { useElementVisibility } from '@vueuse/core'
const { start, done } = useNProgress()

const target = ref(null)
const targetIsVisible = useElementVisibility(target)
const isDone = ref(false)

watch(targetIsVisible, (newIsVisible) => {
	if (newIsVisible) {
		start()
		getNew()
	}
})

const getNew = throttle(() => {
	setTimeout(() => {
		momentsData.value.push(a)
		isDone.value = true
		done()
	}, 2000);
}, 1500, { leading: true, trailing: false })

const cover =
	'https://12366.chinatax.gov.cn/znzx/oss/download?oid=ZNZX00-230821165913-16926083539795620623349026986915'

const bg = "&quot;https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/VCG211443791004.jpg&quot;"
const isLaptop = useMediaQuery('(min-width: 1280px)')
const isMobile = useMediaQuery('(max-width: 768px)')

const containerRef = ref<HTMLElement | undefined>(undefined)
const a = {
	id: 3,
	isTop: 1,
	tags: ['scenery', 'portrait'],
	content:
		'<p><a href="http://localhost:5173/"><span style="color: rgb(212, 177, 6);">#庆余年444444#</span></a>什么时候可以看呢？😅</p>这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态',
	images: [
		{
			id: 1,
			fileName: '1',
			url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
			exif: {
				Model: 'Canon',
				ISOSpeedRatings: 'Canon EOS 5D Mark III',
				ExposureTime: '1/100',
				LensModel: 'EF24-70mm f/2.8L II USM',
				DateTimeOriginal: '2019:08:10 16:00:00',
				FNumber: 'f/2.8',
			},
		},
		{
			id: 1,
			fileName: '1',
			url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
			exif: {
				Model: 'Canon',
				ISOSpeedRatings: 'Canon EOS 5D Mark III',
				ExposureTime: '1/100',
				LensModel: 'EF24-70mm f/2.8L II USM',
				DateTimeOriginal: '2019:08:10 16:00:00',
				FNumber: 'f/2.8',
			},
		},
		{
			id: 1,
			fileName: '1',
			url: 'https://tenfei01.cfp.cn/creative/vcg/800/new/VCG21gic16120417.jpg',
			exif: {
				Model: 'Canon',
				ISOSpeedRatings: 'Canon EOS 5D Mark III',
				ExposureTime: '1/100',
				LensModel: 'EF24-70mm f/2.8L II USM',
				DateTimeOriginal: '2019:08:10 16:00:00',
				FNumber: 'f/2.8',
			},
		},
	],
}

const momentsData = ref()
useRequest(() => http.get('/momments/1'), {
	onSuccess: (res) => {
		momentsData.value = res.data.momments
	},
})
</script>
<style scoped>
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
