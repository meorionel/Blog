<template>
	<div class="pt-6">
		<div class="not-prose">
			<NuxtImg :src="config.info.avatar" :alt="config.info.author" width="128" height="128" class="border-default mb-2 rounded-full! border" />
			<div class="text-4xl font-bold">
				<slot name="title" />
			</div>
			<div class="text-default-2 my-2 flex items-center gap-3 text-sm">
				<div class="flex items-center gap-1">
					<Icon name="gravity-ui:location-arrow" />
					<slot name="location" mdc-unwrap="p" />
				</div>
				<NuxtLink to="/rss.xml" target="_blank" class="text-default-2! flex items-center">
					<Icon name="lucide:rss" />
				</NuxtLink>
			</div>
		</div>
		<div class="mt-4 *:my-2!">
			<slot name="description" />
		</div>
	</div>
</template>

<script lang="ts" setup>
const config = useAppConfig();
</script>
