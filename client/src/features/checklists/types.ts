import { z } from "zod";
import { Entity } from "@/shared/types";
import { checklistSchema, checklistsSchema, updateChecklistSchema } from "./schemas";

export type IChecklist = Entity<{
	name: string;
	description: string | null;
	isChecked: boolean;
	order: number;
	cardId: number;
}>;

export type ChecklistDto = z.infer<typeof checklistSchema>;
export type ChecklistsDto = z.infer<typeof checklistsSchema>;
export type UpdateChecklistDto = z.infer<typeof updateChecklistSchema>;
