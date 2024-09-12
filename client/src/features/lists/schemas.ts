import { z } from "zod";
import { COLORS_NAME } from "@/shared/tailwind";
import { getEnumValues } from "@/shared/utils";

export const createListSchema = z.object({
	name: z.string().min(1).max(60).default(""),
	description: z.string().min(1).max(255).default(""),
	color: z.enum(getEnumValues(COLORS_NAME)).default(""),
});

export const createListDefaultValues = createListSchema.safeParse({
	name: "To Do",
	description: "My list description",
	color: COLORS_NAME.slate,
}).data;

export const updateListSchema = z.object({
	name: z.string().min(1).max(60).default(""),
	description: z.string().min(1).max(255).default(""),
	color: z.enum(getEnumValues(COLORS_NAME)).default(""),
});
