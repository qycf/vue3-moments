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
	</nav>
</template>
