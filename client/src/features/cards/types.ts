import { z } from "zod";
import { Entity } from "@/shared/types";
import { cardSchema, createCardSchema } from "./schemas";

export type IAssignee = Entity<{
	cardId: number;
	memberId: number;
}>;

export type ICardLabel = Entity<{
	cardId: number;
	labelId: number;
}>;

export type IChecklist = Entity<{
	name: string;
	description: string | null;
	isChecked: boolean;
	order: number;
	cardId: number;
}>;

export type ICard = Entity<{
	title: string;
	description: string;
	dueDate: string | null;
	reminderDate: string | null;
}>;
export type ICardFull = Entity<
	ICard & {
		assignees: IAssignee[];
		labels: ICardLabel[];
		checklists: IChecklist[];
	}
>;

export type CreateCardDto = z.infer<typeof createCardSchema>;

export type UpdateCardDto = z.infer<typeof cardSchema>;
