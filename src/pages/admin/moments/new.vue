<template>
	<div>
		<n-grid :x-gap="12" :y-gap="12" :cols="12">
			<n-gi span="9" class="p-3" :style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
				<n-form-item label-style="font-size:x-large;" path="age"
					:label="$route.query.id ? t('edit') : t('new moments')">
					<n-input v-model:value="momentsForm.title" />
				</n-form-item>
				<div style="border: 1px solid #ccc;">
					<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig"
						:mode="mode" />
					<Editor v-model="momentsForm.content" style=";height: 500px; overflow-y: hidden"
						:default-config="editorConfig" :mode="mode" @on-created="handleCreated" />
				</div>
			</n-gi>
			<n-gi span="3">
				<n-collapse :theme-overrides="collapseThemeOverrides" arrow-placement="right"
					:default-expanded-names="['1', '2', '3']">
					<n-collapse-item :title="t('Publish')" name="1" class="p-3"
						:style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
						<n-space :size="6" vertical justify="space-around">
							<n-space justify="space-between">
								<span class="text-[#61677A] font-bold">{{ t('ban') }}</span>
								<n-switch v-model:value="momentsForm.isBan" />
							</n-space>
							<n-space justify="space-between">
								<span class="text-[#61677A] font-bold">{{ t('pined') }}</span>
								<n-switch v-model:value="momentsForm.isTop" />
							</n-space>
							<n-space vertical>
								<span class="text-[#61677A] font-bold">{{ t('start') }}:</span>
								<n-input-number v-model:value="momentsForm.start" size="small" />
								<span class="text-[#61677A] font-bold">{{ t('date') }}</span>
								<n-date-picker v-model:value="momentsForm.createTime" type="datetime" clearable />
							</n-space>
						</n-space>
					</n-collapse-item>
					<n-collapse-item :title="t('tags')" name="2" class="p-3"
						:style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
						<n-dynamic-tags v-model:value="momentsForm.tags" :render-tag="renderTag" />
					</n-collapse-item>

					<n-collapse-item :title="t('images')" name="3" class="p-3"
						:style="`background-color:${isDark ? `#171717` : `#fff`};border-radius:0.75rem`">
						<n-space vertical>
							<n-button type="primary" dashed block>
								<template #icon>
									<n-icon>
										<AddAPhotoSharp />
									</n-icon>
								</template>
								从图库选择
							</n-button>
						</n-space>


					</n-collapse-item>
				</n-collapse>
				<n-button type="primary" block class="mt-4" @click="clickPublish()">
					{{ $route.query.id ? t('update') : t('publish') }}
				</n-button>
			</n-gi>
		</n-grid>
	</div>
</template>

<script lang="ts" setup>
import { CollapseProps, NTag, UploadFileInfo } from 'naive-ui'
import { AddAPhotoSharp } from '@vicons/material'
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { isDark } from "vue-dark-switch";
import { MOMENTS, saveOrUpdateMoments } from '~/api/moments'
import router from '~/plugins/router'


onMounted(async () => {
	// 获取当前路由query,如果有id,则获取该id的moments数据
	const { id } = useRoute().query
	if (id) {
		const moments = await momentsSend(id)
		setMomentsForm(moments)
	}
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value
	if (editor == null) return
	editor.destroy()
})

const { data, send: saveOrUpdateMomentsSend } = saveOrUpdateMoments()
// 获取moments数据
const { send: momentsSend } = momentsRsp()



// tags列表
const tags = ref([] as any[])
// moments表单数据，用于页面展示
const momentsForm = ref({
	id: null,
	title: '',
	content: '',
	isBan: false,
	isTop: false,
	start: 0,
	createTime: null,
	tags: [],
	images: {
		urls: [],
		ids: []
	}
})

const clickPublish = () => {
	// 获取moments表单数据，用于发送
	const momentsReq = {
		id: momentsForm.value.id,
		title: momentsForm.value.title,
		content: momentsForm.value.content,
		isPublish: momentsForm.value.isBan ? 0 : 1,
		isTop: momentsForm.value.isTop ? 1 : 0,
		start: momentsForm.value.start,
		createTime: momentsForm.value.createTime === null ? null : timestampToTime(momentsForm.value.createTime),
		tags: momentsForm.value.tags.length > 0 ? momentsForm.value.tags.join(',') : null
	}
	saveOrUpdateMomentsSend(momentsReq).then(res => {
		router.push('/admin/moments/new?id=' + res.id)
	})
	toast.success(momentsForm.value.id !== null ? t('update success') : t('publish success'))
}



const { t } = useI18n()

// 右侧collapse主题
type CollapseThemeOverrides = NonNullable<CollapseProps['themeOverrides']>
const collapseThemeOverrides: CollapseThemeOverrides = {
	titlePadding: "0",
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const mode = 'default' // 或 'simple'



const handleCreated = (editor: any) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}

// tags渲染
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

// 时间戳转换为 yyyy-MM-dd hh:mm:ss
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


// 设置moments表单数据，用于页面展示
const setMomentsForm = (moments: MOMENTS) => {
	momentsForm.value.id = moments.id as any
	momentsForm.value.title = moments.title
	momentsForm.value.content = moments.content
	momentsForm.value.start = moments.start
	momentsForm.value.isBan = moments.isPublish === 0 ? true : false
	momentsForm.value.isTop = moments.isTop === 0 ? false : true
	momentsForm.value.createTime = moments.createTime ? new Date(moments.createTime).getTime() as any : null
	momentsForm.value.tags = moments.tags !== null ? moments.tags.split(',') as any : []
}



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
