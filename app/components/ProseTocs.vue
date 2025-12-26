<template>
	<template v-if="props.toc.toc.links.length > 0">
		<ul
			class="fixed top-1/2 flex w-64 -translate-y-1/2 transform flex-col gap-2 truncate pl-24 max-md:relative max-md:top-0 max-md:w-full max-md:translate-0 max-md:p-0 max-md:pb-6"
		>
			<li v-for="link in props.toc.toc.links" :key="link.id">
				<NuxtLink :to="`#${link.id}`" class="group flex items-center gap-2">
					<div class="h-1 w-4 shrink-0 rounded-xl bg-gray-400/50! duration-200 group-hover:bg-gray-500!" :class="{ 'bg-gray-500!': activeId === link.id }"></div>
					<span class="text-sm opacity-0 duration-200 group-hover:opacity-100 max-md:opacity-100" :class="{ 'opacity-100': activeId === link.id }">{{ link.text }}</span>
				</NuxtLink>
			</li>
		</ul>
	</template>
</template>

<script lang="ts" setup>
const props = defineProps({
	toc: {
		type: Object,
		default: () => ({}),
	},
});

const activeId = ref<string | null>(null);
let observer: IntersectionObserver | null = null;

const handleIntersect: IntersectionObserverCallback = (entries) => {
	const visibleEntries = entries.filter((entry) => entry.isIntersecting);

	if (visibleEntries.length > 0) {
		const first = visibleEntries[0];
		if (first && (first.target as HTMLElement).id) {
			activeId.value = (first.target as HTMLElement).id;
		} else {
			activeId.value = null;
		}
	}
};

onMounted(() => {
	observer = new IntersectionObserver(handleIntersect, {
		rootMargin: "0px 0px 60% 0px",
		threshold: 0,
	});

	const headers = document.querySelectorAll("h2[id]");

	headers.forEach((header) => {
		observer?.observe(header);
	});
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>
