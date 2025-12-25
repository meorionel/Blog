<template>
	<div>
		<ul class="flex items-center gap-2 p-0">
			<li v-for="(m, index) in Object.values(mode)" :key="m" class="flex cursor-pointer list-none items-center gap-2 p-0">
				<span @click="currentMode = m" :class="{ 'font-bold': currentMode === m }">{{ m }}</span>
				<span class="text-sm" v-if="index < Object.values(mode).length - 1">/</span>
			</li>
		</ul>
		<div v-for="group in articleList" :key="group.title">
			<h2 class="text-2xl font-bold">{{ group.title }}</h2>
			<ul class="flex flex-col gap-4">
				<li v-for="article in group.articles" :key="article.id">
					<NuxtLink
						:to="article.path"
						class="hover:border-base-moon/90 hover:dark:border-base-dawn/75 my-0 border-b-2 border-transparent text-lg font-bold no-underline duration-200"
					>
						{{ article.title }}
					</NuxtLink>
					<p class="text-default/80 my-2! text-sm">{{ article.description }}</p>
					<div class="flex items-center gap-2 text-sm">
						<span><NuxtTime :datetime="article.date" /></span>
						<span class="text-default/6 text-xs">•</span>
						<span>{{ article.classify }}</span>
						<span class="text-default/6 text-xs">•</span>
						<span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { data: list } = await useAsyncData("articleList", () => {
	return queryCollection("page")
		.select("title", "description", "classify", "tags", "date", "update", "isPage", "path", "id")
		.where("isPage", "=", false)
		.order("date", "DESC")
		.all();
});

enum mode {
	time = "Time",
	classify = "Classify",
}
const currentMode = ref(mode.time);

const articlesByYear = computed(() => {
	if (!list.value?.length) return [];

	const groups = new Map();

	for (const article of list.value) {
		const date = new Date(article.date);
		if (isNaN(date.getTime())) continue;

		const year = date.getFullYear().toString();
		if (!groups.has(year)) groups.set(year, []);
		groups.get(year)!.push(article);
	}

	return Array.from(groups.entries())
		.sort(([a], [b]) => Number(b) - Number(a))
		.map(([year, articles]) => ({ title: year, articles }));
});
const articlesByClassify = computed(() => {
	if (!list.value?.length) return [];

	const groups = new Map();

	for (const article of list.value) {
		const key = article.classify?.trim() || "未分类";
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key)!.push(article);
	}

	return Array.from(groups.entries()).map(([classify, articles]) => ({
		title: classify,
		articles,
	}));
});

const articleList = computed(() => {
	if (!list.value) return [];

	switch (currentMode.value) {
		case mode.time:
			return articlesByYear.value;
		case mode.classify:
			return articlesByClassify.value;
		default:
			return [];
	}
});
</script>
