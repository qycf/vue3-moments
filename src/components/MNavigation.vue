<script setup lang="ts">
import { SwitchIcon } from 'vue-dark-switch'
const { locale } = useI18n()
</script>

<template>
	<nav
		aria-label="Site Nav"
		class="mx-auto max-w-3xl flex items-center justify-between px-4"
	>
		<span class="h-10 w-10 flex items-center justify-center">
			<SwitchIcon unmount-persets />
		</span>
		<ul class="flex items-center gap-2 text-sm font-medium">
			<li class="hidden !block">
				<n-button
					text
					color="#8790a4"
					size="small"
					@click="locale = locale == '简体中文' ? 'English' : '简体中文'"
				>
					{{ locale == '简体中文' ? 'EN' : '简中' }}
				</n-button>
			</li>
		</ul>
	</nav>
</template>
