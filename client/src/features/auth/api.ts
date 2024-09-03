import { fetcher } from "@/shared/utils";
import { IUser, SignInDto, SignInResponse, SignUpDto } from "./types";

export const signUp = (values: SignUpDto): Promise<{ message: string }> => {
	return fetcher<{ message: string }>("/auth/sign-up", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
};

export const signIn = (values: SignInDto): Promise<SignInResponse> => {
	return fetcher<SignInResponse>("/auth/sign-in", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
};

export const signOut = async (): Promise<void> => {
	await fetcher("/auth/sign-out", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const profile = (accessToken: string): Promise<IUser> => {
	return fetcher<IUser>("/auth/profile", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getAccessToken = async (): Promise<string> => {
	const { accessToken } = await fetcher<{ accessToken: string }>("/auth/refresh-token", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return accessToken;
};
