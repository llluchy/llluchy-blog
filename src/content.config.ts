import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.string().default('general'),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.object({ en: z.string(), zh: z.string() }),
		github: z.string().url(),
		tags: z.array(z.string()),
		icon: z.string().default('📁'),
		featured: z.boolean().default(false),
		order: z.number().default(0),
	}),
});

const skills = defineCollection({
	loader: glob({ base: './src/content/skills', pattern: '**/*.md' }),
	schema: z.object({
		categories: z.array(
			z.object({
				name: z.object({ en: z.string(), zh: z.string() }),
				icon: z.string(),
				items: z.array(z.string()),
			}),
		),
		orbitalTags: z.array(z.string()).default([]),
		aboutSkills: z.array(
			z.object({
				name: z.object({ en: z.string(), zh: z.string() }),
				level: z.number(),
			}),
		).default([]),
	}),
});

const about = defineCollection({
	loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
	schema: z.object({
		intro: z.object({ en: z.string(), zh: z.string() }),
		details: z.object({ en: z.array(z.string()), zh: z.array(z.string()) }),
		bullets: z.object({ en: z.array(z.string()), zh: z.array(z.string()) }),
		contactEmail: z.string(),
	}),
});

const timeline = defineCollection({
	loader: glob({ base: './src/content/timeline', pattern: '**/*.md' }),
	schema: z.object({
		year: z.string(),
		title: z.object({ en: z.string(), zh: z.string() }),
		description: z.object({ en: z.string(), zh: z.string() }),
		order: z.number(),
	}),
});

const hobbies = defineCollection({
	loader: glob({ base: './src/content/hobbies', pattern: '**/*.md' }),
	schema: z.object({
		icon: z.string(),
		name: z.object({ en: z.string(), zh: z.string() }),
		description: z.object({ en: z.string(), zh: z.string() }),
		order: z.number(),
	}),
});

export const collections = { blog, projects, skills, about, timeline, hobbies };