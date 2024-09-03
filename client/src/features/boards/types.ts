import { z } from "zod";
import { Entity } from "@/shared/types";
import { createBoardSchema } from "./schemas";

export type IBoard = Entity<{
	name: string;
	description: string;
	dueDate: string;
}>;

export type CreateBoardDto = z.infer<typeof createBoardSchema>;
