<template>
	<div>{{ tagsList }}</div>
</template>

<script lang="ts" setup>
import { tagsListReq } from '~/api/tags'

const tagsList = tagsListReq()
</script>
<style scoped></style>
<route lang="json">
{
	"meta": {
		"layout": "admin",
		"name": "new moments"
	}
}
</route>
