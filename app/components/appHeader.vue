<template>
	<div class="w-163 mx-auto flex items-center justify-between max-md:w-screen max-md:px-4">
		<NuxtImg :src="config.site.favicon" alt="avatar" width="32" height="32" />
		<ul class="flex items-center gap-2 text-gray-500" v-if="navigation">
			<li v-for="(item, index) in navigation" :key="item.path" class="flex items-center gap-2">
				<NuxtLink :to="item.path" :class="{ 'font-bold': item.path === '/' ? route.path === '/' : route.path.includes(item.path) }">
					{{ item.title }}
				</NuxtLink>
				<span class="text-sm" v-if="index < navigation.length - 1">/</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const config = useAppConfig();
const route = useRoute();
const { data: navigation } = await useAsyncData("navigation", () => {
	return queryCollectionNavigation("page").where("isPage", "=", true).where("order", ">=", 0).order("order", "ASC");
});
</script>
