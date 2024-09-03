import { fetcher } from "@/shared/utils";
import type { IBoard, CreateBoardDto } from "./types";

export const create = (accessToken: string, values: CreateBoardDto) => {
	return fetcher<IBoard>("/boards", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const findAll = (accessToken: string) => {
	return fetcher<IBoard[]>("/boards", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const findOne = (accessToken: string, id: string) => {
	return fetcher<IBoard>(`/boards/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const update = (
	accessToken: string,
	id: number,
	values: { name: string; description: string; dueDate: string },
) => {
	return fetcher<void>(`/boards/${id}`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const remove = (accessToken: string, id: number) => {
	return fetcher<void>(`/boards/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
