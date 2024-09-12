import { z } from "zod";
import { Entity } from "@/shared/types";
import { IBoard } from "../boards/types";
import { BoardLabelSchema } from "./schemas";

export type IBoardLabel = Entity<{
	name: string;
	color: string;
	boardId: IBoard["id"];
}>;

export type BoardLabelDto = z.infer<typeof BoardLabelSchema>;
