import { z } from "zod";
import { checklistsSchema } from "../checklists";

export const cardSchema = z.object({
	title: z.string().min(1).max(60),
	description: z.string().max(255),
	dueDate: z.string().datetime().optional(),
	reminderDate: z.string().datetime().optional(),
});

export const assignSchema = z.object({
	assignees: z.array(z.number()).default([]),
});

export const labelSchema = z.object({
	labels: z.array(z.number()).default([]),
});

export const createCardSchema = cardSchema.and(assignSchema).and(labelSchema).and(checklistsSchema);
export const createCardDefaultValues = createCardSchema.safeParse({
	title: "New Task",
	description: "My task description",
}).data;

export const updateCardSchema = cardSchema;
