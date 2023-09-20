<template>
	<n-space vertical>
		<n-card
			:bordered="false"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			<template #header>
				<n-icon color="#b7a34e" size="24">
					<PersonFilled />
				</n-icon>
			</template>
			<template #cover>
				<img :src="siteSettings?.cover" />
			</template>
			<div>
				<div class="flex self-center">
					<n-avatar
						size="large"
						src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG"
					/>
					<div class="my-auto ml-2">
						<div class="name text-lg -mt-2" style="color: #b7a34e">
							{{ siteSettings?.nickname }}
						</div>
						<div
							class="date"
							:style="{ color: isDark ? '#8f918e' : '#a6a6a6' }"
						>
							{{ siteSettings?.description }}
						</div>
					</div>
				</div>
			</div>
		</n-card>
		<n-card
			:bordered="false"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			<template #header>
				<n-icon color="#b7a34e" size="24">
					<LocalFireDepartmentOutlined />
				</n-icon>
			</template>
			<n-config-provider :theme-overrides="isDark ? darkThemeOverrides : null">
				<n-list clickable hoverable type="error">
					<n-list-item>
						<template #prefix>
							<n-icon color=" #b7a34e">
								<VerticalAlignTopOutlined />
							</n-icon>
						</template>
						<n-space justify="space-between">
							<span>
								{{ hotList[0].name }}
							</span>
							<span style="color: #8790a4; font-size: xx-small">
								{{ hotList[0].count }}
							</span>
						</n-space>
					</n-list-item>
					<n-list-item
						v-for="(i, index) in hotList.slice(1, hotList.length)"
						:key="index"
					>
						<template #prefix>
							<n-icon color="#b7a34e">
								{{ index + 1 }}
							</n-icon>
						</template>
						<n-space justify="space-between">
							<span>
								{{ i.name }}
							</span>
							<span style="color: #8790a4; font-size: xx-small">
								{{ i.count }}
							</span>
						</n-space>
					</n-list-item>
				</n-list>
			</n-config-provider>
		</n-card>

		<n-card
			:bordered="false"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			<template #header>
				<n-icon color="#b7a34e" size="24">
					<MenuFilled />
				</n-icon>
			</template>
			<n-space justify="space-around" size="large">
				<n-button quaternary size="small" :focusable="false">
					关于
				</n-button>
				<n-button quaternary size="small" :focusable="false">
					<switch-icon />
				</n-button>
				<n-button
					quaternary
					size="small"
					:focusable="false"
					@click="locale = locale == '简体中文' ? 'English' : '简体中文'"
				>
					{{ locale == '简体中文' ? 'EN' : '简中' }}
				</n-button>
			</n-space>
		</n-card>
	</n-space>
</template>

<script lang="ts" setup>
import { SwitchIcon } from 'vue-dark-switch'
import {
	LocalFireDepartmentOutlined,
	PersonFilled,
	MenuFilled,
	VerticalAlignTopOutlined,
} from '@vicons/material'
import { darkThemeOverrides } from '~/styles/theme'
const { locale } = useI18n()
import { SITE_SETTINGS } from '~/api/siteSettings'

const hotList = ref([
	{
		id: 3,
		name: '月亮',
		count: 9,
		isTop: true,
	},
	{
		id: 1,
		name: '人文',
		count: 1,
	},
	{
		id: 2,
		name: '风光',
		count: 3,
	},
])

defineProps<{
	siteSettings: SITE_SETTINGS | undefined
	isLaptop: boolean
	isDark: boolean
}>()
</script>
<style scoped>
@media screen and (max-width: 2560px) {
	.n-card {
		max-width: 375px;
	}
}

@media (min-width: 1275px) and (max-width: 1476px) {
	.n-card {
		max-width: 16.5vw;
	}
}
@media screen and (max-width: 1275px) {
	.n-card {
		max-width: 20.7vw;
	}
}
</style>
