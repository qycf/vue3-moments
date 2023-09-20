<template>
    <div class="w-[20rem]">
        <n-space vertical :size="24">
            <div class="text-center text-[2rem] font-bold text-[#2f3339]" :style="`color:${isDark ? `#fff` : `#2f3339`}`">
                找回密码
            </div>

            <n-input type="text" size="large" placeholder="邮箱"></n-input>
            <n-button block size="large" color="#eb5735">
                下一步
            </n-button>
            <div class="text-center text-sm text-[#a6a6a6]">
                想起来了！ <router-link :style="`color:${isDark ? 'red' : '#000'}`" class="font-extralight"
                    :to="{ path: '/auth/login' }">返回登录</router-link>
            </div>
        </n-space>

    </div>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue'
import { isDark } from 'vue-dark-switch'
const email = ref('')
const options = computed(() => {
    return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        const prefix = email.value.split('@')[0]
        return {
            label: prefix + suffix,
            value: prefix + suffix
        }
    })
})
</script>
<style scoped></style>


<route lang="json">
{
    "meta": {
        "layout": "auth",
        "name": "password_reset",
        "title": "重置密码"
    }
}
</route>