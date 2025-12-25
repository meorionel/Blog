<template>
	<div class="group border-default rounded-lg border">
		<div v-if="filename || language" class="border-default flex items-center justify-between rounded-t-lg border-b bg-gray-200/25 dark:bg-gray-800/25 px-5 py-2">
			<code class="text-default! bg-transparent! p-0!">{{ filename || language }}</code>
			<button
				@click="copyCode"
				class="text-default flex size-6 cursor-pointer items-center justify-center rounded-md pt-0.5 text-sm text-(--tw-prose-code) opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-gray-200/75 dark:hover:bg-gray-700/25"
			>
				<IconCopy class="size-4" v-if="!copied" />
				<IconCopyCheck class="size-4" v-else />
			</button>
		</div>
		<pre :class="$props.class"><slot /></pre>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	code: { type: String, default: "" },
	language: { type: String, default: null },
	filename: { type: String, default: null },
	highlights: { type: Array as PropType<number[]>, default: () => [] },
	meta: { type: String, default: null },
	class: { type: String, default: null },
});

const copied = ref(false);

const copyCode = async () => {
	await navigator.clipboard.writeText(props.code);
	copied.value = true;
	setTimeout(() => {
		copied.value = false;
	}, 2000);
};
</script>

<style scoped>
:deep(pre) {
	padding: 1rem !important;
	margin: 0;
	white-space: pre;
	overflow-x: auto;
}

:deep(code) {
	display: block;
	padding: 0;
	background: transparent;
}

:deep(.line) {
	display: block;
	min-height: 1rem;
	padding: 0;
}
</style>
