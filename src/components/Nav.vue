<template>
    <div class="nav bg-black" ref="nav">
        <div class="nav-container mx-20" style="
			display: flex;
			flex-wrap: inherit;
			align-items: center;
			justify-content: space-between;
			width: 100%;
		">
            <img class="logo" src="/logo_light.png" alt="show your face">
            <n-menu v-if="!isMobile" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
            <div v-if="isMobile" class="menu">
                <n-icon size="24px" color="#fff" @click="drawer = true">
                    <MenuOutlined />
                </n-icon>
            </div>
            <n-space v-else class="ml-auto">
                <ul class="flex items-center gap-2 text-sm font-medium">
                    <li>
                        <span class="h-10 w-10 flex items-center justify-center " style="color: #E8E8E8;">
                            <SwitchIcon unmount-persets />
                        </span>
                    </li>

                    <template v-if="!userStore.Authorization">
                        <li>
                            <n-button round color="#e8e8e8" text-color="#5d636b" @click="$router.push('/auth/register')">
                                注册
                            </n-button>
                        </li>
                        <li>
                            <n-button v-if="!userStore.Authorization" round color="#fe4821"
                                @click="$router.push('/auth/login')">
                                登陆
                            </n-button>
                        </li>
                    </template>


                    <template v-else>
                        <n-button round color="#fe4821" @click="$router.push('/admin/moments/new')">
                            <template #icon>
                                <n-icon>
                                    <AddAPhotoSharp />
                                </n-icon>
                            </template>
                            新动态
                        </n-button>
                        <n-button round color="#e8e8e8" text-color="#5d636b" @click="logout()">
                            <template #icon>
                                <n-icon>
                                    <LogOutOutlined />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>
                </ul>
            </n-space>
        </div>
    </div>
    <n-drawer v-model:show="drawer" width="60vw" placement="left" display-directive="show">
        <n-drawer-content>
            <template #header>
                <n-space justify="end">
                    <MNavigation />
                </n-space>
            </template>
            <n-menu v-model:value="activeKey" :options="menuOptions" />
            <template #footer>
                <n-space class="ml-auto">
                    <n-button v-if="!userStore.Authorization" round color="#e8e8e8" text-color="#5d636b"
                        @click="$router.push('/auth/register')">
                        注册
                    </n-button>
                    <n-button v-if="!userStore.Authorization" round color="#fe4821" @click="$router.push('/auth/login')">
                        登陆
                    </n-button>
                    <template v-else>
                        <n-button round color="#fe4821" @click="$router.push('/admin/moments/new')">
                            <template #icon>
                                <n-icon>
                                    <AddAPhotoSharp />
                                </n-icon>
                            </template>
                            新动态
                        </n-button>
                        <n-button round color="#e8e8e8" text-color="#5d636b" @click="logout()">
                            <template #icon>
                                <n-icon>
                                    <LogOutOutlined />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>

                </n-space>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script lang='ts' setup>
import { SwitchIcon } from 'vue-dark-switch'
import { MenuOutlined, LogOutOutlined, AddAPhotoSharp } from '@vicons/material'
import { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { router } from '~/plugins/router'
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(
    ['message'],
)

const userStore = useUserStore()
import '~/styles/index.css'
const drawer = ref(false)
const activeKey = ref('/')
const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(

                RouterLink,
                {
                    to: {
                        name: '/',
                        params: {
                            lang: 'zh-CN'
                        }
                    }
                },
                {
                    default: () => '首页'
                }
            ),
        key: '/',

    }
]
const nav = ref<HTMLElement | null>(null)
const i = ref(0)

defineProps({
    isDark: {
        type: Boolean,
        default: false,
    },
})

const logout = () => {
    userStore.setLogout()
    message.success('退出成功')
    router.push({ path: '/' })

}

window.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
        document.body.scrollTop
    var scroll = scrollTop - i.value;
    i.value = scrollTop;
    nav.value?.classList.toggle("sticky", window.scrollY > 0)
})

const isMobile = useMediaQuery('(max-width: 768px)')

</script>
<style scoped>
.sticky {
    backdrop-filter: saturate(180%) blur(6px);
    padding-top: .5rem;
    padding-bottom: .5rem;
    /* height: 4rem; */
    background-color: rgb(0 0 0/80%);
}
</style>