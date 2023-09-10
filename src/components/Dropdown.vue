<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { isDark } from 'vue-dark-switch'
const visiable = ref(false)
function dropdownHandler() {
	visiable.value = false
}

const { availableLocales, locale } = useI18n()
</script>

<template>
	<div class="relative">
		<div class="inline-flex items-center overflow-hidden rounded-md">
			<button
				class="h-full cursor-pointer border-0 bg-transparent p-2 text-[#E8E8E8] hover:bg-gray-200 hover:text-gray-700"
				dark="hover:bg-gray-500" @click.stop="visiable = !visiable">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
					<path
						d="M12.87 15.07l-2.54-2.51l.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11l.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
						fill="currentColor"></path>
				</svg>
			</button>
		</div>

		<Transition name="fade" mode="out-in">
			<div v-if="visiable" v-on-click-outside.bubble="dropdownHandler" dark="bg-gray-500"
				class="absolute end-0 z-10 mt-2 w-56 rounded-md shadow-lg divide-y divide-gray-100"
				:class="isDark ? 'bg-gray-800' : 'text-[#E8E8E8]'">
				<div class="p-2">
					<span v-for="availableLocale of availableLocales" :key="availableLocale" :class="locale === availableLocale
						? 'bg-gray-100 text-gray-800 dark:bg-gray-400'
						: ''
						" class="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:text-gray-900"
						dark="text-light-500 hover:text-light-900" @click="locale = availableLocale">
						{{ availableLocale }}
					</span>
				</div>
			</div>
		</Transition>
</div></template>
