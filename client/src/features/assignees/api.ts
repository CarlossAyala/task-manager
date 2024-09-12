import { fetcher } from "@/shared/utils";
import { CreateAssigneeDto, IAssignee } from "./types";

export const create = (
	accessToken: string,
	{
		boardId,
		listId,
		cardId,
	}: {
		boardId: number;
		listId: number;
		cardId: number;
	},
	values: CreateAssigneeDto,
) => {
	return fetcher<IAssignee>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/assignees`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
	});
};

export const findAll = (
	accessToken: string,
	{ boardId, listId, cardId }: { boardId: number; listId: number; cardId: number },
) => {
	return fetcher<IAssignee[]>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/assignees`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const findOne = (
	accessToken: string,
	{
		boardId,
		listId,
		cardId,
	}: {
		boardId: number;
		listId: number;
		cardId: number;
	},
	id: number,
) => {
	return fetcher<IAssignee>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/assignees/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const remove = (
	accessToken: string,
	{
		boardId,
		listId,
		cardId,
	}: {
		boardId: number;
		listId: number;
		cardId: number;
	},
	id: number,
) => {
	return fetcher<void>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/assignees/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
