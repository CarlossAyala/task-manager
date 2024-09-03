import { z } from "zod";
import { Entity } from "@/shared/types";
import { baseSignInSchema, baseSignUnSchema } from "./schemas";

export type IUser = Entity<{
	firstName: string;
	lastName: string;
	fullName: string;
	initials: string;
	email: string;
}>;

export type SignUpDto = z.infer<typeof baseSignUnSchema>;
export interface SignUpResponse {
	message: string;
}

export type SignInDto = z.infer<typeof baseSignInSchema>;
export interface SignInResponse {
	accessToken: string;
	user: IUser;
}
