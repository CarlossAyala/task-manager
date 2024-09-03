import { z } from "zod";
import { Entity } from "@/shared/types";
import { IUser } from "../auth/types";
import { createMemberSchema, updateMemberSchema } from "./schemas";

export enum MemberRole {
	ProjectManager = "project-manager",
	Member = "member",
}

export type IMember = Entity<{
	boardId: number;
	userId: number;
	user: IUser;
	role: MemberRole;
}>;

export type CreateMemberDto = z.infer<typeof createMemberSchema>;

export type UpdateMemberDto = z.infer<typeof updateMemberSchema>;
