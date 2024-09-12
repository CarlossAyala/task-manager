import { Entity } from "@/shared/types";
import { IBoardLabel } from "../board-labels";

export type ICardLabel = Entity<{
	cardId: number;
	labelId: number;
}>;

export type CardLabelDto = {
	labelId: IBoardLabel["id"];
};
