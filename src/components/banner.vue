<template>
    <div class="index_banner" :class="isDark ? `` : `bg-white`" :style="`background-image: url(&quot;${siteSettings.siteSettings.cover
        }&quot;);background-color: ${isDark ? `#3c3c3c` : `#fff`};`
        ">
        <div class="user_info">
            <div class="top">
                <div class="left">
                    <div class="name font-bold" style="color: #b7a34e">
                        {{ siteSettings.siteSettings.nickname }}
                    </div>
                    <div class="des" :style="{ color: isDark ? '#8f918e' : '#a6a6a6' }">
                        {{ siteSettings.siteSettings.description }}
                    </div>
                </div>
                <div class="avatar">
                    <img v-if="siteSettings.siteSettings.avatar" :src="siteSettings.siteSettings.avatar" />
                    <n-skeleton v-else :width="50" :height="50" size="medium" style="border-radius: 8px;" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { isDark } from 'vue-dark-switch'
const siteSettings = useSiteSettingsStore()

</script>
<style scoped>
.index_banner {
    height: 200px;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.user_info {
    position: absolute;
    bottom: 3%;
    right: 5%;
}

.user_info .top {
    display: flex;
    align-items: center;
}

.user_info .left {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    align-items: flex-end;
    padding-right: 10px;
}

.user_info .avatar {
    width: 50px;
    height: 50px;
}

.user_info .name {
    font-weight: 600;
}

.user_info .des {
    font-size: 13px;
    text-align: right;
}

.user_info .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.index_banner img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>