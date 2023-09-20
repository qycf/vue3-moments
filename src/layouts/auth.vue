<template>
    <n-notification-provider>
        <n-message-provider>
            <n-grid cols="10" item-responsive responsive="screen" class="w-full h-[100vh] "
                :style="`background-color:${isDark ? '#000' : '#fff'}`">
                <n-grid-item span="0 m:4">
                    <div class="h-full bg-cover bg-center"
                        style="background-image:url('https://globals.static.nicetheme.xyz/apollo.2.demo.nicetheme.xyz/wp-content/uploads/2021/11/2021110108152291.jpeg')">
                    </div>
                </n-grid-item>
                <n-grid-item span="10 m:6" class="m-auto">
                    <n-config-provider :theme="naiveTheme" :theme-overrides="!isDark ? themeOverrides : darkThemeOverrides">
                        <router-view v-slot="{ Component }">
                            <transition name="fade" mode="out-in">
                                <component :is="Component" />
                            </transition>
                        </router-view>

                    </n-config-provider>
                </n-grid-item>
            </n-grid>
        </n-message-provider>
    </n-notification-provider>
</template>

<script lang="ts" setup>
import { themeOverrides, darkThemeOverrides } from '~/styles/theme'
import { naiveTheme } from 'vue-dark-switch'
import { isDark } from 'vue-dark-switch'
</script>
<style scoped></style>
