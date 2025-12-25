import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
	collections: {
		page: defineCollection({
			type: "page",
			source: "**/**.md",
			schema: z.object({
				title: z.string(),
				description: z.string().optional(null),
				classify: z.string(),
				tags: z.array(z.string()),
				date: z.date(),
				update: z.date().optional(null),
				isPage: z.boolean().default(false),
				order: z.number().default(9999),
			}),
		}),
		blog: defineCollection({
			type: "page",
			source: "blog/**.md",
			schema: z.object({
				title: z.string(),
				description: z.string().optional(null),
				classify: z.string(),
				tags: z.array(z.string()),
				date: z.date(),
				update: z.date().optional(null),
			}),
		}),
	},
});
