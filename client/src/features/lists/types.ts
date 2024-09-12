import { z } from "zod";
import { Entity } from "@/shared/types";
import { COLORS_NAME } from "@/shared/tailwind";
import { createListSchema } from "./schemas";

export type IList = Entity<{
	name: string;
	description: string;
	color: keyof typeof COLORS_NAME;
}>;

export type CreateListDto = z.infer<typeof createListSchema>;

export type UpdateListDto = Pick<CreateListDto, "name" | "description" | "color">;
