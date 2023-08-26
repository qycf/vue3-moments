<template>
	<div>
		<n-grid :x-gap="12" :y-gap="12" :cols="12">
			<n-gi span="9" class="p-3" :style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
				<n-form-item path="age" :label="$t('new moments')">
					<n-input @keydown.enter.prevent />
				</n-form-item>
				<div style="border: 1px solid #ccc;">
					<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig"
						:mode="mode" />
					<Editor v-model="valueHtml" style=";height: 500px; overflow-y: hidden" :default-config="editorConfig"
						:mode="mode" @on-created="handleCreated" />
				</div>
			</n-gi>
			<n-gi span="3">
				<n-collapse :theme-overrides="collapseThemeOverrides" arrow-placement="right"
					:default-expanded-names="['1', '2']">
					<n-collapse-item title="Publish" name="1" class="p-3"
						:style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
						<n-space :size="1">
							<span>{{ t('ban') }}：</span>
							<n-switch v-model:value="isPublish" />
						</n-space>
					</n-collapse-item>
					<n-collapse-item :title="t('tags')" name="2" class="p-3"
						:style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
						<n-dynamic-tags v-model:value="tags" :max="3" :render-tag="renderTag">
							<template #input="{ submit, deactivate }">
								<n-auto-complete ref="autoCompleteInstRef" v-model:value="inputValueRef" size="small"
									:options="options" :placeholder="t('tags')" :clear-after-select="true"
									@select="selectTag($event)" @blur="deactivate" />
							</template>
							<template #trigger="{ activate, disabled }">
								<n-button size="small" type="primary" dashed :disabled="disabled" @click="activate()">
									<template #icon>
										<n-icon>
											<AddSharp />
										</n-icon>
									</template>
									添加
								</n-button>
							</template>
						</n-dynamic-tags>
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

const { t } = useI18n()

type CollapseThemeOverrides = NonNullable<CollapseProps['themeOverrides']>

const collapseThemeOverrides: CollapseThemeOverrides = {
	titlePadding: "0",
}

const isPublish = ref(false)

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

const renderTag = (tag: any, index: any) => {
	return h(
		NTag,
		{	
			color: { 
				color: tag.color,
				textColor: tag.textColor
			},
			disabled: index > 3,
			closable: true,
			onClose: () => {
				tags.value.splice(index, 1)
			}
		},
		{
			default: () => t(tag.name)
		}
	)
}

const selectTag = (e:any)=>{
	console.log("e",e);
	
}

const tags = ref([
	{
		"id": 1,
		"name": "moon",
		"color": "#3d455a",
		"textColor": "#ba433d"
	},
	{
		"id": 2,
		"name": "scenery",
		"color": "#c4a2aa",
		"textColor": "#fff"
	}
] as any[])


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value
	if (editor == null) return
	editor.destroy()
})

const handleCreated = (editor: any) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}

const clickPublish = () => {
	console.log("valueHtml.value：", valueHtml.value)
	console.log("tags：", tags.value)
	console.log("isPublish：", !isPublish.value)
}
const tagsList = ref([''] as any[])
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
