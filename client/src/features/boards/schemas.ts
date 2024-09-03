import { z } from "zod";

export const createBoardSchema = z.object({
	name: z.string().min(2).max(60).default(""),
	description: z.string().min(2).max(255).default(""),
	dueDate: z.string().default(""),
});

export const createBoardDefaultValues = createBoardSchema.safeParse({
	name: "My board " + Math.random().toString(36).slice(2),
	description: "My board description",
	dueDate: new Date().toISOString(),
}).data;
