import { Entity } from "@/shared/types";

export type IAssignee = Entity<{
	cardId: number;
	memberId: number;
}>;

export type CreateAssigneeDto = {
	memberId: number;
};
