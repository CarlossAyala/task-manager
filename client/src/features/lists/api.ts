import { fetcher } from "@/shared/utils";
import { IBoard } from "../boards";
import { CreateListDto, IList, UpdateListDto } from "./types";

export const create = (accessToken: string, boardId: IBoard["id"], values: CreateListDto) => {
	return fetcher<IList>(`/boards/${boardId}/lists`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const findAll = (accessToken: string, boardId: IBoard["id"]) => {
	return fetcher<IList[]>(`/boards/${boardId}/lists`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const findOne = (accessToken: string, boardId: IBoard["id"], id: IList["id"]) => {
	return fetcher<IList>(`/boards/${boardId}/lists/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const update = (accessToken: string, boardId: IBoard["id"], id: IList["id"], values: UpdateListDto) => {
	return fetcher<void>(`/boards/${boardId}/lists/${id}`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const remove = (accessToken: string, boardId: IList["id"], id: IList["id"]) => {
	return fetcher<void>(`/boards/${boardId}/lists/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
