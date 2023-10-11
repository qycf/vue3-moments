<template>
    <div class="w-[20rem]">
        <n-space vertical :size="24">
            <img src="/logo.png" alt="show your face" />
            <n-input type="text" v-model:value="LoginForm.email" size="large" placeholder="邮箱/用户名"></n-input>
            <n-input type="password" v-model:value="LoginForm.password" size="large" placeholder="密码"></n-input>
            <n-button :loading="loading" block size="large" color="#eb5735" @click="clickLogin">
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
import { ref } from 'vue'
import { LoginRsp } from '~/api/auth'
import { useMessage } from 'naive-ui'
import { useUserStore } from '~/stores/user'
import router from '~/plugins/router';
const message = useMessage()
const LoginForm = ref(
    {
        email: '',
        password: '',
    }
)

const { send, loading } = LoginRsp()

const clickLogin = () => {
    if (!LoginForm.value.email || !LoginForm.value.password) {
        return
    }
    loading.value = true
    send(LoginForm.value).then(res => {
        message.success('登录成功')
        const userStore = useUserStore();
        userStore.setLogin(res)
        setTimeout(() => {
            router.push({ path: '/' })
        }, 500)
    }).catch(err => {
        message.error(err)
    })
}

</script>
<style scoped></style>


<route lang="json">
{
    "meta": {
        "layout": "auth",
        "name": "login",
        "title": "登录"
    }
}
</route>