<template>
	<router-view />
</template>

<script setup lang="ts">
const siteSettingsStore = useSiteSettingsStore()
const title = siteSettingsStore.siteSettings.title
if (title === undefined || title === null) {
	siteSettingsReq()
}
</script>