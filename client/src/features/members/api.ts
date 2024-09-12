import { fetcher } from "@/shared/utils";
import { IBoard } from "../boards";
import { CreateMemberDto, IMember, UpdateMemberDto } from "./types";

export const create = (accessToken: string, boardId: IBoard["id"], values: CreateMemberDto) => {
	return fetcher<IMember>(`/boards/${boardId}/members`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const findAll = (accessToken: string, boardId: IBoard["id"]) => {
	return fetcher<IMember[]>(`/boards/${boardId}/members`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const findOne = (accessToken: string, boardId: IBoard["id"], id: IMember["id"]) => {
	return fetcher<IMember>(`/boards/${boardId}/members/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const update = (accessToken: string, boardId: IBoard["id"], id: IMember["id"], values: UpdateMemberDto) => {
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

export const remove = (accessToken: string, boardId: IBoard["id"], id: IMember["id"]) => {
	return fetcher<void>(`/boards/${boardId}/members/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
