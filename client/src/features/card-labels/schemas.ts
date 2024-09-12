import { z } from "zod";

export const checklistSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(255).optional(),
});

export const checklistsSchema = z.object({
	checklists: z.array(checklistSchema).default([]),
});

export const updateChecklistSchema = z
	.object({
		isChecked: z.boolean(),
	})
	.and(checklistSchema);
