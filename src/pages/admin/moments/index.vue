<template>
    <div class="p-3" :style="`border-radius: 0.75rem;background-color:${isDark ? `#171717` : `#fff`}`">
        <n-space>
            <n-config-provider :locale="locale == 'English' ? null : zhCN">
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
            </n-config-provider>
        </n-space>

        <div class="mt-4">
            <n-data-table :loading="tableLoading" :columns="colums" :max-height="250" :data="dataTable"
                :pagination="paginationReactive" :bordered="false" :scroll-x="500" :row-key="rowKey">
                <template #loading>
                    <n-spin size="medium" />
                </template>
            </n-data-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { NTag, NButton, NSwitch } from 'naive-ui'
import { useRequest } from 'vue-request'
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import { AddAPhotoSharp, SearchSharp } from "@vicons/material";
import { isDark } from 'vue-dark-switch'



const dataTable = ref()
const tableLoading = ref(true)

const rowKey = (dataTable: any) => dataTable.id

onMounted(() => {
    useRequest(() => http.get('/momments'), {
        onSuccess: (data) => {
            setTimeout(() => {
                tableLoading.value = false
                dataTable.value = data.data
            }, 2000)
        }
    })
})

const value = ref(null)


const { locale, t } = useI18n()

const loading = ref(false)

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
const tagsType = {
    humanity: 'success',
    scenery: 'warning',
    portrait: 'error',
} as any

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
                    modelValue: row.isTop,
                    'onUpdate:modelValue': (value: any) => {
                        console.log(value)
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
    {
        title: '图片数量',
        key: 'images',
        width: 70,
        render(row: any) {
            return row.images.length
        },
    },
    {
        title: (() => {
            return t('tags')
        }) as any,
        key: 'tags',
        width: 150,
        render(row: any) {
            const tags = row.tags.map((tagKey: any) => {
                return h(
                    NTag,
                    {
                        style: {
                            marginRight: '6px',
                        },
                        type: tagsType[tagKey],
                        round: true,
                        size: 'small',
                        bordered: false,
                    },
                    {
                        default: () => t(tagKey),
                    },
                )
            })
            return tags
        },
    },
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
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => play(row),
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
                        onClick: () => play(row),
                    },
                    { default: () => t('ban') },
                ),
            ]
        },
    },
]) as any

const paginationReactive = reactive({
    page: 2,
    pageSize: 5,
    showSizePicker: true,
    pageSizes: [3, 5, 7],
    onChange: (page: number) => {
        paginationReactive.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
    },
})

const play = (row: any) => {
    console.log(row)
}
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