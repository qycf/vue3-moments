<template>
    <div class="w-[20rem]">
        <n-space vertical :size="24">
            <img src="/logo.png" alt="show your face" />
            <n-input type="text" size="large" placeholder="邮箱"></n-input>
            <n-button block size="large" color="#eb5735">
                立即注册
            </n-button>
            <div class="text-center text-sm text-[#a6a6a6]">
                登录代表你已同意<span class="underline">用户协议</span> | <router-link class="text-[#f34728]"
                    :to="{ path: '/auth/login' }">立即登录</router-link>
            </div>

            <loginMethod />
        </n-space>

    </div>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue'
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
        "name": "register"
    }
}
</route>