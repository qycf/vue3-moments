<template>
	<div class="flex">
		<!-- 点赞 -->
		<span key="heart" class="action flex-1">
			<n-space :size="4">
				<n-button tertiary size="small" type="tertiary" @click="clickActions">
					<template #icon>
						<n-icon size="32" color="#8790a4">
							<ArrowDropUpOutlined />
						</n-icon>
					</template>
					<span class="text-xs"> 赞 {{ start }}</span>
				</n-button>
				<n-button tertiary size="small" type="tertiary" @click="clickActions">
					<template #icon>
						<n-icon size="32" color="#8790a4">
							<ArrowDropDownOutlined />
						</n-icon>
					</template>
				</n-button>
			</n-space>
		</span>
		<span class="flex-2 mt-auto">
			<a-dropdown position="tl">
				<n-icon size="18" color="#8790a4">
					<MoreHorizOutlined />
				</n-icon>
				<template #content>
					<a-doption style="color: #8790a4" @click="clickActions">
						<template #default>{{ t('uninterested') }}</template>
						<template #icon>
							<n-icon size="18">
								<HeartBrokenOutlined />
							</n-icon>
						</template>
					</a-doption>
					<a-doption style="color: #8790a4" @click="clickActions">
						<template #default>{{ t('block the author') }}</template>
						<template #icon>
							<n-icon size="18">
								<PersonRemoveAlt1Outlined />
							</n-icon>
						</template>
					</a-doption>
					<a-doption style="color: #8790a4" @click="clickActions">
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
	ArrowDropUpOutlined,
	ArrowDropDownOutlined,
	MoreHorizOutlined,
	HeartBrokenOutlined,
	PersonRemoveAlt1Outlined,
	MoodBadOutlined,
} from '@vicons/material'
import { useMessage } from 'naive-ui'

defineProps({
	start: Number,
})


const { t } = useI18n()
const message = useMessage()

const clickActions = () => {
	message.warning('请先登陆')
}

</script>
<style scoped></style>
