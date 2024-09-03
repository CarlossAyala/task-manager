import { fetcher } from "@/shared/utils";
import { CreateCardDto, ICardFull, UpdateCardDto } from "./types";

export const create = (
	accessToken: string,
	{ boardId, listId }: { boardId: string; listId: string },
	values: CreateCardDto,
) => {
	return fetcher<ICardFull>(`/boards/${boardId}/lists/${listId}/cards`, {
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
	{
		boardId,
		listId,
	}: {
		boardId: string;
		listId: string;
	},
) => {
	return fetcher<ICardFull[]>(`/boards/${boardId}/lists/${listId}/cards`, {
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
	}: {
		boardId: string;
		listId: string;
	},
	id: string,
) => {
	return fetcher<ICardFull>(`/boards/${boardId}/lists/${listId}/cards/${id}`, {
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
	}: {
		boardId: string;
		listId: string;
	},
	id: string,
	values: UpdateCardDto,
) => {
	return fetcher<void>(`/boards/${boardId}/lists/${listId}/cards/${id}`, {
		method: "PATCH",
		credentials: "include",
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
	}: {
		boardId: string;
		listId: string;
	},
	id: string,
) => {
	return fetcher<void>(`/boards/${boardId}/lists/${listId}/cards/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
