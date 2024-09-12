import { z } from "zod";
import { Entity } from "@/shared/types";
import { IAssignee } from "../assignees";
import { IChecklist } from "../checklists";
import { ICardLabel } from "../card-labels";
import { cardSchema, createCardSchema } from "./schemas";

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

export type UpdateCardBaseDto = z.infer<typeof cardSchema>;
