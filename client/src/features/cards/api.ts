import { fetcher } from "@/shared/utils";
import { CreateCardDto, ICard, ICardFull, UpdateCardBaseDto } from "./types";
import { IBoard } from "../boards";
import { IList } from "../lists";

export const create = (
	accessToken: string,
	{ boardId, listId }: { boardId: IBoard["id"]; listId: IList["id"] },
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
		boardId: IBoard["id"];
		listId: IList["id"];
	},
) => {
	return fetcher<ICard[]>(`/boards/${boardId}/lists/${listId}/cards`, {
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
		boardId: IBoard["id"];
		listId: IList["id"];
	},
	id: ICard["id"],
) => {
	return fetcher<ICard>(`/boards/${boardId}/lists/${listId}/cards/${id}`, {
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
		boardId: IBoard["id"];
		listId: IList["id"];
	},
	id: ICard["id"],
	values: UpdateCardBaseDto,
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
		boardId: IBoard["id"];
		listId: IList["id"];
	},
	id: ICard["id"],
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
