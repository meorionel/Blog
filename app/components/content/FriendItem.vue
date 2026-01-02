<template>
	<li class="flex items-center gap-4 rounded-xl transition">
		<div class="size-18 shrink-0">
			<NuxtImg :src="props.avatar" :alt="props.avatar" class="m-0 size-18 rounded-full" />
		</div>
		<div class="flex min-w-0 flex-col">
			<span class="text-default text-lg font-bold">
				<slot name="name" mdc-unwrap="p" />
			</span>
			<span class="text-default/75 truncate text-sm">
				<slot name="bio" mdc-unwrap="p" />
			</span>
			<NuxtLink :to="props.url" target="_blank" class="text-default/40 truncate text-sm">
				{{ props.url }}
			</NuxtLink>
		</div>
	</li>
</template>

<script setup>
const props = defineProps({ avatar: { type: String, default: "/" }, url: { type: String, default: "/" } });
</script>
