<template>
	<li>
		<div class="mt-6 flex flex-col">
			<span class="text-default text-lg font-bold"><slot name="name" mdc-unwrap="p" /></span>
			<span class="text-default/75 truncate text-sm"><slot name="description" mdc-unwrap="p" /></span>
			<NuxtLink :to="props.url" target="_blank" class="text-default/40 truncate text-sm">
				{{ props.url }}
			</NuxtLink>
		</div>
	</li>
</template>

<script lang="ts" setup>
const props = defineProps({
	url: {
		type: String,
		default: "/",
	},
});
</script>
