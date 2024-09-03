import { fetcher } from "@/shared/utils";
import { CreateMemberDto, IMember, UpdateMemberDto } from "./types";

export const create = (accessToken: string, boardId: string, values: CreateMemberDto) => {
	return fetcher<IMember>(`/boards/${boardId}/members`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const findAll = (accessToken: string, boardId: string) => {
	return fetcher<IMember[]>(`/boards/${boardId}/members`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const findOne = (accessToken: string, boardId: string, id: string) => {
	return fetcher<IMember>(`/boards/${boardId}/members/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const update = (accessToken: string, boardId: string, id: string, values: UpdateMemberDto) => {
	return fetcher<void>(`/boards/${boardId}/members/${id}`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const remove = (accessToken: string, boardId: string, id: string) => {
	return fetcher<void>(`/boards/${boardId}/members/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
