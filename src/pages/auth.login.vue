<template>
    <div class="w-[20rem]">
        <n-space vertical :size="24">
            <img src="/logo.png" alt="show your face" />
            <n-input type="text" size="large" placeholder="邮箱/用户名"></n-input>
            <n-input type="password" size="large" placeholder="密码"></n-input>
            <n-button block size="large" color="#eb5735">
                登录
            </n-button>
            <div class="text-center text-sm font-extralight text-[#f34728]">
                <router-link :to="{ path: '/auth/register' }">立即注册</router-link>
                <span class="mx-2">|</span>
                <router-link :to="{ path: '/auth/password_reset' }">找回密码</router-link>
            </div>
            <loginMethod />
        </n-space>
    </div>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue'
const email = ref('')

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