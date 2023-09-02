<template>
	<div class="p-3" :style="`border-radius: 0.75rem;background-color:${isDark ? `#171717` : `#fff`}`">
		<div class="mb-4 font-bold text-lg">图片管理</div>
		<n-upload multiple directory-dnd :custom-request="Upload" list-type="image" :default-file-list="previewFileList"
			@preview="handlePreview">
			<n-upload-dragger>
				<div style="margin-bottom: 12px">
					<n-icon size="48" :depth="3">
						<ArchiveSharp />
					</n-icon>
				</div>
				<n-text style="font-size: 16px">
					点击或者拖动文件到该区域来上传
				</n-text>
				<n-p depth="3" style="margin: 8px 0 0 0">
					请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
				</n-p>
			</n-upload-dragger>
		</n-upload>
		<n-modal v-model:show="showModal" preset="card" style="width: 600px" title="一张很酷的图片">
			<img :src="previewImageUrl" style="width: 100%">
		</n-modal>
		<n-divider dashed>
			或者
		</n-divider>
		<n-dynamic-input :create-button-props="{ type: 'primary' }" v-model:value="images" placeholder="请输入">
			<template #create-button-default>
				输入链接
			</template>
			<template #create-button-icon>
				<n-icon>
					<AddLinkSharp />
				</n-icon>
			</template>
		</n-dynamic-input>
		<n-button v-show="images.length > 0" class="mt-6" @click="handleUpload" type="primary" block>
			保存
		</n-button>

		<a-grid item-responsive class="mt-4" :col-gap="1" :row-gap="1" :cols="1">
			<a-image-preview-group infinite>
				<a-grid-item v-for="item in imagesGroupRsp" :key="item.creationDate">
					<div class="my-4 font-bold text-3xl">{{ item.creationDate }}</div>
					<a-grid item-responsive class="mt-4" :col-gap="1" :row-gap="1"
						:cols="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 4, xxl: 4 }">
						<a-grid-item v-for="i in item.imagesList" :key="i.id">
							<a-image :src='i.url' :title="i.createTime" description='Present by Arco Design'
							width="300px" height="200px" fit="cover" 
								style=" vertical-align: top;" :preview-visible="visible"
								@preview-visible-change="() => { visible = false }">
								<template #extra>
									<div class="actions">
										<span class="action" @click="() => { visible = true }"><icon-eye /></span>
										<a-tooltip content="A user’s avatar">
											<span class="action"><icon-info-circle /></span>
										</a-tooltip>
									</div>
								</template>
							</a-image>
						</a-grid-item>

					</a-grid>
				</a-grid-item>
			</a-image-preview-group>
		</a-grid>
	</div>
</template>

<script lang="ts" setup>
import { UploadCustomRequestOptions, UploadFileInfo, UploadInst } from 'naive-ui';
import { isDark } from 'vue-dark-switch'
import { AddLinkSharp, ArchiveSharp } from '@vicons/material'
import { uploadImages } from '~/api/upload'
import { imagesGroup } from '~/api/images'
const showModal = ref(false)
const previewImageUrl = ref('')
const images = ref([])
const uploadRef = ref<UploadInst | null>(null)

const { data: imagesGroupRsp } = imagesGroup()


const handleUpload = () => {
	uploadRef.value?.submit()
}

const { send } = uploadImages()



const Upload = ({ file,
	data,
	headers,
	withCredentials,
	action,
	onFinish,
	onError,
	onProgress }: UploadCustomRequestOptions) => {

	console.log("filefilefilefile", file);

	let files = new FormData()
	files.append('files', file.file as File)
	onProgress({
		percent: 65
	})

	send(files).then(res => {
		onProgress({
			percent: 100
		})
		onFinish()
		// previewFileList.value.push({
		// 	name: res.data[0].name,
		// 	url: res.data[0].url,
		// 	uid: res.data[0].id,
		// 	status: 'finished'
		// })
	})


}
const previewFileList = ref<UploadFileInfo[]>(
	[]
)



const handlePreview = (file: UploadFileInfo) => {
	const { url } = file
	previewImageUrl.value = url as string
	showModal.value = true
}


const visible = ref(false)




const imagesList = ref([
	{
		id: 1,
		url: 'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/moon/moonIMG_6918.JPG',
	},
	{
		id: 2,
		url: 'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/moon/moonIMG_6918.JPG',
	},
	{
		id: 3,
		url: 'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/%E6%9F%B3%E5%B7%9E/%E6%BC%82%E4%BA%AE%E5%B0%91%E6%95%B0%E6%B0%91%E6%97%8F%E7%BE%8E%E5%A5%B34k%E5%A3%81%E7%BA%B8_%E5%BD%BC%E5%B2%B8%E5%9B%BE%E7%BD%91.jpg',
	},
	{
		id: 4,
		url: 'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/moon/moonIMG_6918.JPG',
	},
	{
		id: 5,
		url: 'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/moon/moonIMG_6918.JPG',
	},
	{
		id: 6,
		url: 'https://gallerys-1305976148.cos.ap-guangzhou.myqcloud.com/moon/moonIMG_6918.JPG',
	}
])

</script>
<style scoped></style>
<route lang="json">
{
	"meta": {
		"layout": "admin",
		"name": "images"
	}
}
</route>
