<template>
	<div class="my-8 border-b border-gray-200 pb-4 max-md:mb-4 dark:border-gray-700">
		<NuxtLink to="/blog" class="text-default/75 flex items-center gap-1 text-sm"><IconArrowUturnCcwLeft class="inline-block size-3.5" /> <span>返回列表</span></NuxtLink>
		<h1 class="mt-4 mb-1 text-2xl font-bold">
			{{ props.meta.title }}
		</h1>
		<div class="flex items-center gap-2 text-sm">
			<span><NuxtTime :datetime="props.meta.date" /></span>
			<span class="text-default/6 text-xs">•</span>
			<span>{{ props.meta.classify }}</span>
			<span class="text-default/6 text-xs">•</span>
			<span v-for="tag in props.meta.tags" :key="tag">{{ tag }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	meta: {
		type: Object,
		default: () => ({}),
	},
});
</script>
