import { z } from "zod";
import { COLOR_NAMES } from "@/shared/tailwind";
import { getEnumValues } from "@/shared/utils";

export const createListSchema = z.object({
	name: z.string().min(1).max(60).default(""),
	description: z.string().min(1).max(255).default(""),
	color: z.enum(getEnumValues(COLOR_NAMES)).default(""),
});

export const createListDefaultValues = createListSchema.safeParse({
	name: "To Do",
	description: "My list description",
	color: COLOR_NAMES.slate,
}).data;

export const updateListSchema = z.object({
	name: z.string().min(1).max(60).default(""),
	description: z.string().min(1).max(255).default(""),
	color: z.enum(getEnumValues(COLOR_NAMES)).default(""),
});
