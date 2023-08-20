<template>
	<div
		id="container"
		ref="container"
		class="mx-auto overflow-y-auto"
		style="height: 100vh"
	>
		<!-- 移动端头部cover -->
		<!-- <div class="index_banner" data-src="https://cdn.fui.im/wp-content/uploads/2022/06/banner.jpg" uk-img="loading: eager" style="background-image: url(&quot;https://cdn.fui.im/wp-content/uploads/2022/06/banner.jpg&quot;);">
         <div class="user_info">
             <div class="top">
                 <div class="left">
                    <div class="name">FUZZZ</div>
                    <div class="des">Born for design</div>
                 </div>
                
                <div class="avatar"><img src="https://cdn.fui.im/wp-content/uploads/2022/07/XHS_165392155241801024c01keciadixp6f0113gui42plrh.jpg"></div>
             </div> 
         </div>
        </div> -->
		<div ref="containerRef" class="moments_main p-2" style="width: 100vw">
			<n-config-provider :theme="naiveTheme">
				<n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
					<n-gi span="24 m:14 l:14" offset="0 m:3 l:3">
						<!-- <div v-if="momentsData == null" v-for="i in 5" class="p-2.5 mb-2.5" style="border-radius: 0.75rem;"
                            :style="{ background: (isDark ? '#3c3c3c' : '#fff') }">
                            <n-space vertical :size="5">
                                <n-skeleton height="1.5rem" width="5%" :sharp="false" />
                                <n-skeleton height="2.5rem" :sharp="false" />
                                <n-skeleton height="6rem" />
                                <n-skeleton height="1.75rem" width="7%" />
                            </n-space>
                        </div> -->
						<moments :data="momentsData" :is-dark="isDark" />
					</n-gi>
					<n-gi span="0 m:5 l:5">
						<n-affix :trigger-top="8" :listen-to="() => containerRef as any">
							<SiderBar
								:is-laptop="isLaptop"
								:cover="cover"
								:is-dark="isDark"
							/>
						</n-affix>
					</n-gi>
				</n-grid>
				<n-empty description="没有更多了" :show-icon="false"> </n-empty>
			</n-config-provider>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { naiveTheme } from 'vue-dark-switch'
import { isDark } from 'vue-dark-switch'
import { useRequest } from 'vue-request'
import useSroll from '~/composables/scroll'
import { useNProgress } from '@vueuse/integrations/useNProgress'
const { start, done } = useNProgress()
const cover =
	'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/VCG211443791004.jpg'

const isLaptop = useMediaQuery('(min-width: 1280px)')

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
const container: any = ref(null)

const { isBottom } = useSroll(container) // 此处可传入滚动的dom实例

const isDone = ref(false)

watch(isBottom, (newIsBottom) => {
	if (isDone.value) return
	if (newIsBottom) {
		start()
		momentsData.value.push(a)
		isDone.value = true
		isBottom.value = false
		done()
	}
})

// const getNew = () => {
// 	isBottom.value = false
// }

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
	background: #f6faf8;
	background-size: cover;
	background-position: center;
}

.user_info {
	position: absolute;
	bottom: 10%;
	right: 8%;
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
	width: 54px;
	height: 54px;
}

.user_info .name {
	color: #fff;
	font-weight: 600;
}

.user_info .des {
	font-size: 13px;
	text-align: right;
	color: #d6d6d6;
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

.logo {
	width: 10em;
	height: 10em;
	padding: 1.5rem;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
