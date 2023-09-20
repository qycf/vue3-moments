<template>
    <div class="w-[20rem]">
        <n-space vertical :size="24">
            <img src="/logo.png" alt="show your face" />
            <n-input type="text" v-model:value="email" size="large" placeholder="邮箱"></n-input>
            <n-button disabled block size="large" color="#eb5735" @click="clickRegister">
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
import { useNotification } from 'naive-ui'
const notification = useNotification()


notification.create({
    title: "通知",
    description: '注册功能暂未开放',
    meta: '2023-09-11 15:11',
    duration: 1500,
})


const email = ref('')
const clickRegister = () => {

}
</script>
<style scoped></style>


<route lang="json">
{
    "meta": {
        "layout": "auth",
        "name": "register",
        "title": "注册"
    }
}
</route>