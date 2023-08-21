<script setup lang="ts">
import { getRoutes } from '@/plugins/router'
import { SwitchIcon } from 'vue-dark-switch'
import { TranslateOutlined } from '@vicons/material'
const { locale } = useI18n()

const routes = getRoutes()
	.filter((r) => !r.path.includes('notFound'))
	.map((r) => {
		let { path, name } = r
		if (path === '/') {
			return { path, name: 'home' }
		}

		if (!name) {
			name = path
		}

		return { path, name: name.toString().slice(1).replaceAll('/', ' · ') }
	})
const changeLanguage = () => {
	const language = locale.value == '简体中文' ? 'English' : '简体中文'
	locale.value = language
}


</script>

<template>
	<nav aria-label="Site Nav" class="mx-auto h-80px max-w-3xl flex items-center justify-between p-4">
		<span class="h-10 w-10 flex items-center justify-center">
			<SwitchIcon unmount-persets />
		</span>
		<ul class="flex items-center gap-2 text-sm font-medium">
			<li class="hidden !block">
				<!-- <Dropdown /> -->
				<n-button text color="#ff69b4" size="small" @click="changeLanguage">
					{{ locale == '简体中文' ? 'EN' : '简中' }}
				</n-button>
			</li>
		</ul>
	</nav>
</template>
