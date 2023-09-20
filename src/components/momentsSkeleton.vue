<template>
    <div v-for="i in 5" :key="i" class="mb-2.5 p-2.5" :style="{ background: isDark ? '#3c3c3c' : '#fff' }"
        style="border-radius: 0.75rem;">
        <n-space vertical>
            <n-space>
                <n-skeleton :width="50" circle height="3.2rem" :sharp="false" size="medium" />
                <n-space vertical :size="1">
                    <n-skeleton height="1.5rem" :width="80" round size="medium" />
                    <n-skeleton height="1.5rem" :width="160" round size="medium" />
                </n-space>
            </n-space>
            <n-skeleton height="1.5rem" :sharp="false" />
            <n-skeleton height="1.5rem" :sharp="false" />
            <n-skeleton height="1.5rem" :sharp="false" />
            <n-skeleton height="1.5rem" :sharp="false" />
            <n-skeleton height="1.5rem" :sharp="false" />
            <n-space justify="space-between">
                <n-space>
                    <n-skeleton :width="70" height="2rem" :sharp="false" size="medium" />
                    <n-skeleton :width="50" height="2rem" :sharp="false" size="medium" />
                </n-space>
                <n-skeleton :width="50" height="2rem" :sharp="false" size="medium" />
            </n-space>
        </n-space>
    </div>
</template>

<script lang='ts' setup>
import { isDark } from 'vue-dark-switch'
</script>
<style scoped></style>