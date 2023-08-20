<template>
	<n-space vertical>
		<n-card
			v-if="isLaptop"
			title="个人资料"
			:bordered="false"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			<template #cover>
				<img :src="cover" />
			</template>
			<div>
				<div class="flex self-center">
					<n-avatar
						size="large"
						src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG"
					/>
					<div class="my-auto ml-2">
						<div class="name text-lg -mt-2" style="color: #b7a34e">
							qiuyue2525
						</div>
						<div
							class="date"
							:style="{ color: isDark ? '#8f918e' : '#a6a6a6' }"
						>
							show your face
						</div>
					</div>
				</div>
			</div>
		</n-card>
		<n-card
			:bordered="false"
			title="猜你喜欢"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			卡片内容
		</n-card>

		<n-card
			:bordered="false"
			title="操作"
			:style="`background-color: ${isDark ? `#3c3c3c` : `#fff`};`"
		>
			<n-space justify="space-around" size="large">
				<switch-icon />
				<n-button type="primary" size="small" @click="changeLanguage"
					>切换语言</n-button
				>
			</n-space>
		</n-card>
	</n-space>
</template>

<script lang="ts" setup>
import { SwitchIcon } from 'vue-dark-switch'
const { locale } = useI18n()

const changeLanguage = () => {
	const language = locale.value == '简体中文' ? 'English' : '简体中文'
	locale.value = language
}

defineProps({
	isLaptop: {
		type: Boolean,
		required: true,
	},
	cover: {
		type: String,
		required: true,
	},
	isDark: {
		type: Boolean,
		required: true,
	},
})
</script>
<style scoped>
.n-card {
	max-width: 300px;
}
</style>
