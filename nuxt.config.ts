import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: ["@nuxt/content", "@nuxt/hints", "@nuxt/image", "nuxt-shiki", "@nuxtjs/color-mode", "@nuxtjs/seo", "@nuxt/icon", "nuxt-oneko"],

	css: ["~/assets/tailwind.css", "~/assets/main.css"],
	vite: {
		plugins: [tailwindcss()],
	},
	app: {
		head: {
			link: [
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/favicon.gif",
				},
			],
		},
	},

	content: {
		renderer: {
			anchorLinks: { h2: false, h3: false, h4: false },
		},
	},
	colorMode: {
		classPrefix: "",
		classSuffix: "",
	},
	shiki: {
		defaultTheme: {
			light: "min-light",
			dark: "ayu-dark",
		},
	},
	site: {
		url: "https://pinkline.s22y.moe",
		name: "PinkLine",
		description: "基于 Nuxt 制作的博客模版",
		defaultLocale: "zh-CN",
	},
});
