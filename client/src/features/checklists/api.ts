import { fetcher } from "@/shared/utils";
import { ChecklistDto, IChecklist, UpdateChecklistDto } from "./types";

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
	values: ChecklistDto,
) => {
	return fetcher<IChecklist>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists`, {
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
	return fetcher<IChecklist[]>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists`, {
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
	return fetcher<IChecklist>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists/${id}`, {
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
	values: UpdateChecklistDto,
) => {
	return fetcher<void>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(values),
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
	return fetcher<void>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
