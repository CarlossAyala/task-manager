import { fetcher } from "@/shared/utils";
import { CardLabelDto, ICardLabel } from "./types";
import { IBoard } from "../boards";
import { IList } from "../lists";
import { ICard } from "../cards/types";

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
	values: CardLabelDto,
) => {
	return fetcher<ICardLabel>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/labels`, {
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
	return fetcher<ICardLabel[]>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/labels`, {
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
		boardId: IBoard["id"];
		listId: IList["id"];
		cardId: ICard["id"];
	},
	id: ICardLabel["id"],
) => {
	return fetcher<ICardLabel>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/labels/${id}`, {
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
		boardId: IBoard["id"];
		listId: IList["id"];
		cardId: ICard["id"];
	},
	id: ICardLabel["id"],
) => {
	return fetcher<void>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/labels/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
