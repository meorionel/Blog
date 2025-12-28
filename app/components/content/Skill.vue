<template>
	<div class="flex flex-col gap-3 text-4xl">
		<ClientOnly>
			<div class="grid grid-cols-13 flex-wrap gap-3 max-sm:flex">
				<template v-for="item in icon.frontEndSkills" :key="item">
					<Icon :name="item" />
				</template>
			</div>
			<div class="grid grid-cols-13 flex-wrap gap-3 max-sm:flex">
				<template v-for="item in icon.backEndSkills" :key="item">
					<Icon :name="item" />
				</template>
			</div>
		</ClientOnly>
	</div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const handleIconColor = (name: string) => {
	return colorMode.preference === "dark" ? `skill-icons:${name}-dark` : `skill-icons:${name}-light`;
};

const frontEndSkills = [
	{
		name: "javascript",
		isDark: false,
	},
	{
		name: "typescript",
		isDark: false,
	},
	{
		name: "vuejs",
		isDark: true,
	},
	{
		name: "nuxtjs",
		isDark: true,
	},
	{
		name: "pinia",
		isDark: true,
	},
	{
		name: "sass",
		isDark: false,
	},
	{
		name: "tailwindcss",
		isDark: true,
	},
	{
		name: "nodejs",
		isDark: true,
	},
	{
		name: "bun",
		isDark: true,
	},
];
const backEndSkills = [
	{
		name: "expressjs",
		isDark: true,
	},
	{
		name: "elysia",
		isDark: true,
	},
	{
		name: "python",
		isDark: true,
	},
	{
		name: "java",
		isDark: true,
	},
	{
		name: "spring",
		isDark: true,
	},
	{
		name: "mysql",
		isDark: true,
	},
];

const icon = computed(() => {
	return {
		frontEndSkills: frontEndSkills.map((skill) => {
			if (skill.isDark) {
				return handleIconColor(skill.name);
			}
			return `skill-icons:${skill.name}`;
		}),
		backEndSkills: backEndSkills.map((skill) => {
			if (skill.isDark) {
				return handleIconColor(skill.name);
			}
			return `skill-icons:${skill.name}`;
		}),
	};
});
</script>
