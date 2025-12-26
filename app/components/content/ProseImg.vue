<template>
	<NuxtImg :src="src" :alt="alt" :width="width" :height="height" class="w-full" data-zoomable />
</template>

<script lang="ts" setup>
const props = defineProps({
	src: {
		type: String,
		default: "",
	},
	alt: {
		type: String,
		default: "",
	},
	width: {
		type: [String, Number],
		default: undefined,
	},
	height: {
		type: [String, Number],
		default: undefined,
	},
});

const { $zoom } = useNuxtApp();
onMounted(() => {
	$zoom.attach("[data-zoomable]");
});
</script>
