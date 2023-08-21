<template>
	<n-space vertical>
		<n-card
			:bordered="false"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			<template #header>
				<span style="color: #8790a4">{{ $t('Profile') }}</span>
			</template>
			<template #cover>
				<img :src="profile?.cover" />
			</template>
			<div>
				<div class="flex self-center">
					<n-avatar
						size="large"
						src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG"
					/>
					<div class="my-auto ml-2">
						<div class="name text-lg -mt-2" style="color: #b7a34e">
							{{ profile?.nickname }}
						</div>
						<div
							class="date"
							:style="{ color: isDark ? '#8f918e' : '#a6a6a6' }"
						>
							{{ profile?.description }}
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
				<span style="color: #8790a4">{{ $t('Galleries') }}</span>
			</template>
			123
		</n-card>

		<n-card
			:bordered="false"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			<template #header>
				<span style="color: #8790a4">{{ $t('Navigation') }}</span>
			</template>
			<n-space justify="space-around" size="large">
				<n-button quaternary size="small" :focusable="false">
					{{ $t('about') }}
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
const { locale } = useI18n()
import { Site } from '~/api/site'

defineProps<{
	profile: Site | undefined
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

@media screen and (max-width: 1476px) {
	.n-card {
		max-width: 250px;
	}
}
</style>
