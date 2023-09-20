<template>
    <div class="p-3" :style="`border-radius: 0.75rem;background-color:${isDark ? `#171717` : `#fff`}`">
        <n-space>
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi span="4" :label="$t('tags')" :show-feedback="false">
                    <n-select v-model:value="value" :options="options" />
                </n-form-item-gi>

                <n-form-item-gi span="6" :label="$t('date')" :show-feedback="false">
                    <n-date-picker type="daterange" clearable />
                </n-form-item-gi>

                <n-form-item-gi span="4" :label="$t('keyword')" path="user.name">
                    <n-input clearable>
                    </n-input>
                </n-form-item-gi>
                <n-form-item-gi span="10" :label="$t('actions')">
                    <n-space>
                        <n-button :loading="loading" @click="clickSearch">
                            <template #icon>
                                <n-icon>
                                    <SearchSharp />
                                </n-icon>
                            </template>
                            {{ $t('search') }}
                        </n-button>
                        <n-button type="primary">
                            <template #icon>
                                <n-icon>
                                    <AddAPhotoSharp />
                                </n-icon>
                            </template>
                            {{ $t('new moments') }}
                        </n-button>
                    </n-space>
                </n-form-item-gi>
            </n-grid>
        </n-space>

        <div class="mt-4">
            <n-data-table :loading="loading" :columns="colums" :max-height="250" :data="data" :bordered="false"
                :scroll-x="500" :row-key="rowKey">
                <template #loading>
                    <n-spin size="medium" />
                </template>
            </n-data-table>
            <n-space justify="end" class="mt-4">
                <n-pagination v-model:page="page" v-model:page-size="pageSize" :page-count="pageCount" show-size-picker
                    :page-sizes="[10, 20]" />
            </n-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { NTag, NButton, NSwitch } from 'naive-ui'
import { useRequest } from 'vue-request'
import { AddAPhotoSharp, SearchSharp } from "@vicons/material";
import { isDark } from 'vue-dark-switch'
import { momentsListRsp, banMoments } from '~/api/moments'
import router from '~/plugins/router';


const dataTable = ref()
const tableLoading = ref(true)

const rowKey = (dataTable: any) => dataTable.id
const { data, send, page, pageSize, pageCount, loading, refresh } = momentsListRsp()
const { send: banMomentsSend } = banMoments()
const { send: deleteMomentsSend } = deleteMoments()

onMounted(() => {
    send(page.value, pageSize.value)
})

const value = ref(null)

watch(page, (newVal, oldVal) => {
    console.log("newVal", newVal);
    console.log("oldVal", oldVal);
})

const { locale, t } = useI18n()


const clickSearch = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000)
}


const options = ref([
    {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
    },
    {
        label: 'Drive My Car',
        value: 'song1',
    },
    {
        label: 'Norwegian Wood',
        value: 'song2',
    },
    {
        label: "You Won't See",
        value: 'song3',
        disabled: true,
    },
    {
        label: 'Nowhere Man',
        value: 'song4',
    },
    {
        label: 'Think For Yourself',
        value: 'song5',
    },
    {
        label: 'The Word',
        value: 'song6',
    },
    {
        label: 'Michelle',
        value: 'song7',
        disabled: true,
    },
    {
        label: 'What goes on',
        value: 'song8',
    },
    {
        label: 'Girl',
        value: 'song9',
    },
    {
        label: "I'm looking through you",
        value: 'song10',
    },
    {
        label: 'In My Life',
        value: 'song11',
    },
    {
        label: 'Wait',
        value: 'song12',
    },
])

const colums = ref([
    {
        type: 'selection',
        disabled(row: any) {
            return false
        }
    },
    {
        title: (() => {
            return t('ban')
        }) as any,
        key: 'id',
        width: 50,
        render(row: any) {
            return h(
                NSwitch,
                {
                    value: row.isPublish === 0 ? true : false,
                    onUpdateValue: (value: any) => {
                        banMomentsSend(row.id, value ? 0 : 1).then(res => {
                            toast.success("操作成功")
                            refresh()
                        })
                    },
                },
                { default: () => row.id },
            )
        },
    },
    {
        title: (() => {
            return t('title')
        }) as any,
        key: 'title',
        width: 100,
    },
    // {
    //     title: '图片数量',
    //     key: 'images',
    //     width: 70,
    //     render(row: any) {
    //         return row.images.length
    //     },
    // },
    // {
    //     title: (() => {
    //         return t('tags')
    //     }) as any,
    //     key: 'tags',
    //     width: 150,
    //     render(row: any) {
    //         const tags = row.tags.map((tagKey: any) => {
    //             return h(
    //                 NTag,
    //                 {
    //                     style: {
    //                         marginRight: '6px',
    //                     },
    //                     type: tagsType[tagKey],
    //                     round: true,
    //                     size: 'small',
    //                     bordered: false,
    //                 },
    //                 {
    //                     default: () => t(tagKey),
    //                 },
    //             )
    //         })
    //         return tags
    //     },
    // },
    {
        title: (() => {
            return t('latestTime')
        }) as any,
        key: 'updateTime',
        width: 150
    },
    {
        title: (() => {
            return t('actions')
        }) as any,
        key: 'actions',
        fixed: 'right',
        width: 100,
        render(row: any) {
            return [
                h(
                    NButton,
                    {
                        style: {
                            marginRight: '6px',
                        },
                        type: 'info',
                        secondary: true,
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => router.push('/admin/moments/new?id=' + row.id),
                    },
                    { default: () => t('edit') },
                ),
                h(
                    NButton,
                    {
                        style: {
                            marginRight: '6px',
                        },
                        type: 'error',
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => {
                            deleteMomentsSend(row.id).then(res => {
                                toast.success("删除成功")
                                refresh()
                            })
                        },
                    },
                    { default: () => '删除' },
                ),
            ]
        },
    },
]) as any




</script>
<style scoped></style>

<route lang="json">
{
    "meta": {
        "layout": "admin",
        "name": "moments"
    }
}
</route>