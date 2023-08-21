<template>
	<n-modal :show="userStore.showModalRef">
		<n-card
			:style="`max-width:${isLaptop ? `450px` : `350px`}`"
			:bordered="false"
			size="huge"
			role="dialog"
			aria-modal="true"
		>
			<template #header>
				<n-space justify="space-between">
					<span>登录</span>
					<span @click="userStore.showModalRef = false">x</span>
				</n-space>
			</template>
			<n-form ref="formRef">
				<n-form-item path="age" label="用户名">
					<n-input @keydown.enter.prevent />
				</n-form-item>
				<n-form-item path="password" label="密码">
					<n-input
						type="password"
						placeholder="密码"
						:maxlength="8"
						@keydown.enter.prevent
					/>
				</n-form-item>
				<n-button round block> 登录 </n-button>
				<div class="mt-2">
					<n-space justify="space-between">
						<n-button text size="small" color="#b7a34e"> 忘记密码 </n-button>
						<n-button text size="small" color="#b7a34e"> 注册 </n-button>
					</n-space>
				</div>
			</n-form>
		</n-card>
	</n-modal>
</template>

<script lang="ts" setup>
import useUserStore from '~/stores/user'

const userStore = useUserStore()

defineProps({
	isLaptop: {
		type: Boolean,
		required: true,
	},
})
</script>
<style scoped></style>
