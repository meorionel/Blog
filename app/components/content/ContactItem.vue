<template>
	<div class="not-prose flex items-center px-3 py-1 max-sm:px-0">
		<Icon :name="icon" class="mr-2 text-5xl" v-if="icon" />
		<div class="w-full">
			<p class="text-lg font-bold">{{ props.type }}</p>
			<p class="text-sm opacity-75">@<slot name="name" mdc-unwrap="p" /></p>
		</div>
		<template v-if="props.url">
			<NuxtLink :to="props.url" target="_blank">
				<Icon name="gravity-ui:arrow-up-right-from-square" />
			</NuxtLink>
		</template>
		<template v-else-if="props.username">
			<Icon :name="isCopy" class="cursor-pointer text-2xl" @click="copyUsername" />
		</template>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({ type: { type: String, default: "x" }, url: { type: String }, username: { type: String } });

const icon = computed(() => {
	return {
		github: "streamline-logos:github-logo-2-block",
		X: "streamline-logos:x-twitter-logo-block",
		discord: "streamline-logos:discord-logo-2-block",
		email: "streamline-logos:email-logo-block",
	}[props.type];
});

const isCopy = ref<string>("gravity-ui:copy");
const copyUsername = () => {
	if (!props.username) return;
	navigator.clipboard.writeText(props.username);
	isCopy.value = "gravity-ui:copy-check";
	setTimeout(() => {
		isCopy.value = "gravity-ui:copy";
	}, 3000);
};
</script>
