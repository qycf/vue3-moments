<template>
	<div class="flex">
		<!-- 点赞 -->
		<span key="heart" class="action flex-1" @click="onLikeChange">
			<n-space :size="4">
				<n-button tertiary size="small" type="tertiary">
					<template #icon>
						<n-icon size="32" color="#8790a4">
							<ArrowDropUpOutlined />
						</n-icon>
					</template>
					<span class="text-xs"> 赞 {{ 83 + (like ? 1 : 0) }} </span>
				</n-button>
				<n-button tertiary size="small" type="tertiary">
					<template #icon>
						<n-icon size="32" color="#8790a4">
							<ArrowDropDownOutlined />
						</n-icon>
					</template>
				</n-button>
			</n-space>
		</span>
		<span class="flex-2 mt-auto">
			<!-- <n-popover trigger="click">
				<template #trigger>
					<n-icon size="18" color="#8790a4">
						<MoreHorizOutlined />
					</n-icon>
				</template>
				<n-list hoverable clickable>
					<n-list-item>
						<n-icon size="18" color="#8790a4">
							<HeartBrokenOutlined />
						</n-icon>
						<span>123</span>
					</n-list-item>
				</n-list>

			</n-popover> -->
			<a-dropdown position="tl">
				<n-icon size="18" color="#8790a4">
					<MoreHorizOutlined />
				</n-icon>
				<template #content>
					<a-doption style="color:#8790a4">
						<template #default>{{ t('uninterested') }}</template>
						<template #icon>
							<n-icon size="18">
								<HeartBrokenOutlined />
							</n-icon>
						</template>
					</a-doption>
					<a-doption style="color:#8790a4">
						<template #default>{{ t('block the author') }}</template>
						<template #icon>
							<n-icon size="18">
								<PersonRemoveAlt1Outlined />
							</n-icon>
						</template>
					</a-doption>
					<a-doption style="color:#8790a4">
						<template #default>{{ t('shit') }}</template>
						<template #icon>
							<n-icon size="18">
								<MoodBadOutlined />
							</n-icon>
						</template>
					</a-doption>
				</template>
			</a-dropdown>
		</span>
	</div>
</template>

<script lang="ts" setup>
import {
	ArrowDropUpOutlined, ArrowDropDownOutlined,
	MoreHorizOutlined, HeartBrokenOutlined, PersonRemoveAlt1Outlined,
	MoodBadOutlined
} from '@vicons/material'

const { t } = useI18n()
const like = ref(false)
const onLikeChange = () => {
	like.value = !like.value
}
</script>
<style scoped></style>
