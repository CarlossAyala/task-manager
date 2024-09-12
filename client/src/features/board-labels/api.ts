import { fetcher } from "@/shared/utils";
import { BoardLabelDto, IBoardLabel } from "./types";

export const create = (accessToken: string, boardId: number, values: BoardLabelDto) => {
	return fetcher<IBoardLabel>(`/boards/${boardId}/labels`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const findAll = (accessToken: string, boardId: number) => {
	return fetcher<IBoardLabel[]>(`/boards/${boardId}/labels`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const findOne = (accessToken: string, boardId: number, id: number) => {
	return fetcher<IBoardLabel>(`/boards/${boardId}/labels/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const update = (accessToken: string, boardId: number, id: number, values: BoardLabelDto) => {
	return fetcher<void>(`/boards/${boardId}/labels/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const remove = (accessToken: string, boardId: number, id: number) => {
	return fetcher<void>(`/boards/${boardId}/labels/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
