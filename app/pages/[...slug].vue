<template>
	<div class="mx-auto flex w-screen max-md:flex-col-reverse max-md:px-4">
		<div class="h-full min-h-screen grow max-md:min-h-0"></div>
		<div class="w-172 shrink-0 max-md:w-full">
			<template v-if="page">
				<template v-if="route.path.includes('/blog/')">
					<ProseHeader :meta="ProseMeta" />
					<ProseTocs :toc="ProseToc" class="md:hidden" />
				</template>
				<ContentRenderer :value="page" class="prose mx-auto max-w-none" />
				<template v-if="route.path.includes('/blog/')">
					<ClientOnly>
						<Comment />
					</ClientOnly>
				</template>
			</template>
			<template v-else>
				<div class="flex flex-col items-center justify-center gap-2">
					<p class="text-2xl font-bold">404: Page not found</p>
					<NuxtLink to="/" class="underline">Go back to home</NuxtLink>
				</div>
			</template>
		</div>
		<div class="relative h-full min-h-screen grow max-md:min-h-0">
			<template v-if="route.path.includes('/blog/')">
				<ProseTocs :toc="ProseToc" class="max-md:hidden" />
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
const config = useAppConfig();
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryCollection("page").path(route.path).first());

const ProseMeta = computed(() => {
	if (!page.value) return {};
	return {
		title: page.value.title,
		description: page.value.description,
		classify: page.value.classify,
		tags: page.value.tags,
		date: page.value.date,
		update: page.value.update,
	};
});
const ProseToc = computed(() => {
	if (!page.value) return {};
	return {
		toc: page.value.body.toc,
	};
});

useSeoMeta({
	title: `${page.value?.title || config.site.name}`,
	ogTitle: `${page.value?.title || config.site.name}`,
	description: `${page.value?.description || config.site.description}`,
	ogDescription: `${page.value?.description || config.site.description}`,
	twitterCard: "summary_large_image",
});
defineOgImageComponent("NuxtSeo", {
	title: `${page.value?.title || config.site.name}`,
	description: `${page.value?.description || config.site.description}`,
	theme: "#ebbcba",
});
</script>
