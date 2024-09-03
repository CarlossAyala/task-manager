import { z } from "zod";

export const baseSignUnSchema = z.object({
	firstName: z.string().min(2).max(60).default(""),
	lastName: z.string().min(2).max(60).default(""),
	email: z.string().email().default(""),
	password: z.string().min(8).max(255).default(""),
});

export const signUpDefaultValues = baseSignUnSchema.safeParse({
	firstName: "Luke",
	lastName: "Skywalker",
	email: "m@example.com",
	password: "12345678",
}).data;

export const baseSignInSchema = z.object({
	email: z.string().email().default(""),
	password: z.string().min(8).max(255).default(""),
});

export const signInDefaultValues = baseSignInSchema.safeParse({
	email: "m@example.com",
	password: "12345678",
}).data;
