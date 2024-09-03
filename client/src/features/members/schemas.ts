import { z } from "zod";
import { MemberRole } from "./types";

export const createMemberSchema = z.object({
	userId: z.number(),
	role: z.nativeEnum(MemberRole),
});

export const updateMemberSchema = z.object({
	role: z.nativeEnum(MemberRole),
});
