<template>
	<n-config-provider
		:theme="naiveTheme"
		:locale="locale == 'English' ? null : zhCN"
		class="w-full"
	>
		<n-layout has-sider style="height: 100vh">
			<n-layout-sider
				:collapsed="collapsed"
				bordered
				collapse-mode="width"
				:collapsed-width="64"
				:width="240"
			>
				<n-space justify="center" class="pt-3">
					<n-button text @click="router.push('/')">
						<n-avatar
							class="mx-auto"
							:size="40"
							src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
						/>
						<n-gradient-text
							v-if="!collapsed"
							class="ml-2 mt-1"
							:size="24"
							type="success"
						>
							Show your face
						</n-gradient-text>
					</n-button>
				</n-space>

				<n-menu
					:value="menuValue"
					:collapsed="collapsed"
					:collapsed-width="64"
					:collapsed-icon-size="22"
					:options="menuOptions"
					default-expand-all
					@update:value="handleUpdateValue"
				/>
			</n-layout-sider>
			<n-layout>
				<n-layout-header bordered>
					<div class="flex">
						<div class="my-auto flex-1">
							<n-button
								class="mx-3"
								text
								color="#111"
								style="font-size: 24px"
								@click="collapsed = !collapsed"
							>
								<n-icon>
									<MenuOpenSharp v-if="!collapsed" />
									<MenuSharp v-else />
								</n-icon>
							</n-button>
						</div>
						<div class="my-auto flex-1">
							<n-space justify="end">
								<div class="mt-3">
									<Dropdown />
								</div>
								<n-popover
									trigger="hover"
									placement="bottom"
									:show-arrow="false"
								>
									<template #trigger>
										<SwitchIcon class="mt-4" />
									</template>
									<span>或许不想知道你的花园长得咋样</span>
								</n-popover>
								<n-popover
									trigger="hover"
									placement="bottom"
									:show-arrow="false"
								>
									<template #trigger>
										<n-button quaternary class="h-full py-2">
											<n-avatar
												round
												size="medium"
												src="https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/qiuyue2525.JPG"
											/>
											<span class="mx-1 my-auto">qiuyue2525</span>
										</n-button>
									</template>
									<span>或许不想知道你的花园长得咋样</span>
								</n-popover>
							</n-space>
						</div>
					</div>
				</n-layout-header>
				<n-layout-content
					:style="`background-color:${isDark ? `` : `#f3f3f3`}`"
				>
					<n-scrollbar style="max-height: 90vh">
						<div class="p-3">
							<router-view> </router-view>
						</div>
					</n-scrollbar>
				</n-layout-content>
				<n-layout-footer>
					<div class="mt-1 text-center">Copyright ©2023 qiuyue2525</div>
				</n-layout-footer>
			</n-layout>
		</n-layout>
	</n-config-provider>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
	CameraSharp,
	SettingsSharp,
	MenuOpenSharp,
	MenuSharp,
	AddAPhotoSharp,
} from '@vicons/material'
import { naiveTheme, SwitchIcon } from 'vue-dark-switch'
import { RouterLink } from 'vue-router'
import { isDark } from 'vue-dark-switch'
import type { Component } from 'vue'
import { zhCN, enUS } from 'naive-ui'
const { t, locale } = useI18n()
const collapsed = ref(false)

const router = useRouter()
const menuValue = ref(router.currentRoute.value.meta.name as string)

// 菜单选中的回调
const handleUpdateValue = (key: string, item: MenuOption) => {
	menuValue.value = key
}

watch(menuValue, (newVal, oldVal) => {
	const index = tabs.value.findIndex((t: any) => newVal === t.key)
	if (index === -1) {
		handleAdd(newVal)
	}
	// router.push(newVal)
})

onMounted(() => {
	if ((router.currentRoute.value.meta.name as string) !== 'new moments') {
		handleAdd(router.currentRoute.value.meta.name as string)
	}
})

// 标签数组添加标签回调函数
const handleAdd = (key: any) => {
	const tab = {
		key,
		closable: true,
	}
	tabs.value.push(tab)
	menuValue.value = tab.key
}

// 切换标签
// const handSelect = (value: string) => {
// 	router.push(value)
// }

// 菜单数组
const menuOptions = [
	{
		label: (() => {
			return t('moments')
		}) as any,
		key: 'moments',
		icon: renderIcon(CameraSharp),
		children: [
			{
				label: () =>
					h(
						RouterLink,
						{
							to: {
								name: '/admin/moments/',
							},
						},
						{ default: () => t('moments') },
					),
				key: 'moments',
				icon: renderIcon(CameraSharp),
			},
			{
				label: () =>
					h(
						RouterLink,
						{
							to: {
								name: '/admin/moments/new',
							},
						},
						{ default: () => t('new moments') },
					),
				key: 'new moments',
				icon: renderIcon(AddAPhotoSharp),
			},
			{
				label: () =>
					h(
						RouterLink,
						{
							to: {
								name: '/admin/moments/images',
							},
						},
						{ default: () => t('images') },
					),
				key: 'images',
				icon: renderIcon(AddAPhotoSharp),
			},
		],
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: '/admin/settings',
					},
				},
				{ default: () => t('settings') },
			),
		key: 'settings',
		icon: renderIcon(SettingsSharp),
	},
]

// 标签数组
const tabs = ref([
	{
		icon: shallowRef(CameraSharp),
		key: 'new moments',
		closable: false,
	},
]) as any

function renderIcon(icon: Component) {
	// 获取menuOptions等于
	return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<style>
.n-layout-scroll-container {
	overflow: hidden;
}
</style>
