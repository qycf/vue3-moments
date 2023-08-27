<template>
	<div>
		<n-grid :x-gap="12" :y-gap="12" :cols="12">
			<n-gi span="9" class="p-3" :style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
				<n-form-item path="age" :label="$t('new moments')">
					<n-input v-model:value="momentsReq.title" />
				</n-form-item>
				<div style="border: 1px solid #ccc;">
					<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig"
						:mode="mode" />
					<Editor v-model="momentsReq.content" style=";height: 500px; overflow-y: hidden"
						:default-config="editorConfig" :mode="mode" @on-created="handleCreated" />
				</div>
			</n-gi>
			<n-gi span="3">
				<n-collapse :theme-overrides="collapseThemeOverrides" arrow-placement="right"
					:default-expanded-names="['1', '2']">
					<n-collapse-item title="Publish" name="1" class="p-3"
						:style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
						<n-space :size="6" vertical justify="space-around">
							<n-space justify="space-between">
								<span class="text-[#61677A] font-bold">{{ t('ban') }}</span>
								<n-switch v-model:value="momentsReq.isPublish" />
							</n-space>
							<n-space justify="space-between">
								<span class="text-[#61677A] font-bold">{{ t('pined') }}</span>
								<n-switch v-model:value="momentsReq.isTop" />
							</n-space>
							<n-space vertical>
								<span class="text-[#61677A] font-bold">{{ t('start') }}:</span>
								<n-input-number v-model:value="momentsReq.start" size="small" />
								<span class="text-[#61677A] font-bold">{{ t('date') }}</span>
								<n-date-picker v-model:value="momentsReq.createTime" type="datetime" clearable />
							</n-space>
						</n-space>
					</n-collapse-item>
					<n-collapse-item :title="t('tags')" name="2" class="p-3"
						:style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
						<n-dynamic-tags v-model:value="momentsReq.tags" :render-tag="renderTag" />
					</n-collapse-item>
				</n-collapse>
				<n-button type="primary" block class="mt-4" @click="clickPublish">
					完成
				</n-button>
			</n-gi>
		</n-grid>
	</div>
</template>

<script lang="ts" setup>
import { AutoCompleteInst, CollapseProps, NTag } from 'naive-ui'
import { AddSharp } from '@vicons/material'
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { isDark } from "vue-dark-switch";
import { useRequest } from 'vue-request'
import { MOMENTS, newMoments } from '~/api/moments'

const { t } = useI18n()

type CollapseThemeOverrides = NonNullable<CollapseProps['themeOverrides']>

const collapseThemeOverrides: CollapseThemeOverrides = {
	titlePadding: "0",
}

const isPublish = ref(1)
const title = ref('')
const start = ref(0)
const timestamp = ref()




const momentsReq = ref(
	{
		title: '',
		content: '',
		isPublish: 0,
		isTop: 0,
		start: 0,
		createTime: null,
		tags: []
	}
)


const clickPublish = () => {
	momentsReq.value.isTop = momentsReq.value.isTop ? 1 : 0
	momentsReq.value.isPublish = momentsReq.value.isPublish ? 1 : 0
	momentsReq.value.createTime = momentsReq.value.createTime ? timestampToTime(momentsReq.value.createTime) as any : null
	momentsReq.value.tags = momentsReq.value.tags.join(',') as any
	console.log(momentsReq.value);

	// const data = newMoments(momentsReq.value)
	// console.log(data);

	// momentsReq恢复为默认
	momentsReq.value = {
		title: '',
		content: '',
		isPublish: 0,
		isTop: 0,
		start: 0,
		createTime: null,
		tags: []
	}
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const mode = 'default' // 或 'simple'

const autoCompleteInstRef = ref<AutoCompleteInst | null>(null)

watch(autoCompleteInstRef, (value) => {
	if (value) nextTick(() => value.focus())
})
const inputValueRef = ref('')


const options = computed(() => {
	if (inputValueRef.value === null) {
		return []
	}

	return data.value.map((item: any) => {
		if (item.name === '') {
			return {
				label: inputValueRef.value,
				value: inputValueRef.value
			}
		}
		return {
			label: item.name,
			value: item.name
		}
	})
})

const tagsType = {
	humanity: 'success',
	scenery: 'warning',
	portrait: 'error',
} as any

const renderTag = (tag: string, index: number) => {
	return h(
		NTag,
		{
			type: 'success',
			closable: true,
			onClose: () => {
				tags.value.splice(index, 1)
			}
		},
		{
			default: () => tag
		}
	)
}


const tags = ref([] as any[])


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value
	if (editor == null) return
	editor.destroy()
})

const handleCreated = (editor: any) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}




const timestampToTime = (timestamp: any) => {
	timestamp = timestamp ? timestamp : null;
	let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}

const { data } = useRequest(
	() => http.get(`/tags/list`), {
	onSuccess: (res: any) => {
		// 在res头部添加一个空的选项
		res.unshift({ id: null, name: '' })
	},
})

</script>
<style></style>
<route lang="json">
{
	"meta": {
		"layout": "admin",
		"name": "new moments"
	}
}
</route>
