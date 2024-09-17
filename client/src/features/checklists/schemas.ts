import { z } from "zod";

export const checklistInputsSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(255).optional(),
});

export const checklistsSchema = z.object({
	checklists: z.array(checklistInputsSchema).default([]),
});

const checklistCheckboxSchema = z.object({
	isChecked: z.boolean(),
});

export const updateChecklistSchema = checklistCheckboxSchema
	.or(checklistInputsSchema)
	.or(checklistInputsSchema.and(checklistCheckboxSchema));
