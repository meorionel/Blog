export default defineAppConfig({
	info: {
		author: "Alice Clodia",
		avatar: "https://gravatar.meorion.moe/avatar/me",
	},
	site: {
		url: "https://blog.meorion.moe",
		favicon: "/favicon.gif",
		name: "Meorion's Blog",
		description: "基于 Nuxt 制作的博客模版",
		defaultLocale: "zh-CN",
	},
	switch: {
		comment: true, // 是否启用评论区
	},
	comment: {
		repo: "meorionel/Blog", // 这里要填你的博客的github地址
		issue_term: "title", // 可选项: pathname, url, title, og:title, [ENTER ISSUE NUMBER HERE], [ENTER TERM HERE]
	},
	rss: {
		link: "blog.meorion.moe",
	},
});
