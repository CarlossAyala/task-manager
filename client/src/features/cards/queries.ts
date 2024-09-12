import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne, remove, update } from "./api";
import { CreateCardDto, ICard, UpdateCardBaseDto } from "./types";
import { IBoard } from "../boards";
import { IList } from "../lists";

export const cardKeys = {
	key: () => ["cards"],
	findAll: ({ boardId, listId }: { boardId: IBoard["id"]; listId?: IList["id"] }) => [
		...cardKeys.key(),
		"find-all",
		{ boardId, listId },
	],
	findOne: (id: ICard["id"]) => [...cardKeys.key(), "find-one", id],
};

export const useGetCards = (listId: IList["id"]) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: cardKeys.findAll({ boardId: +boardId!, listId }),
		queryFn: () => findAll(accessToken!, { boardId: +boardId!, listId }),
	});
};

export const useGetCard = ({ listId, cardId }: { listId: IList["id"]; cardId: ICard["id"] }) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: cardKeys.findOne(cardId),
		queryFn: () =>
			findOne(
				accessToken!,
				{
					boardId: +boardId!,
					listId,
				},
				cardId,
			),
	});
};

export const useUpdateCard = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ listId, cardId, values }: { listId: IList["id"]; cardId: ICard["id"]; values: UpdateCardBaseDto }) =>
			update(
				accessToken!,
				{
					boardId: +boardId!,
					listId,
				},
				cardId,
				values,
			),
		onSuccess: (_, { listId, cardId }) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: cardKeys.findAll({ boardId: +boardId!, listId }),
				}),
				queryClient.invalidateQueries({
					queryKey: cardKeys.findOne(cardId),
				}),
			]);
		},
		meta: {
			title: "Update card",
		},
	});
};

export const useRemoveCard = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ listId, cardId }: { listId: IList["id"]; cardId: ICard["id"] }) =>
			remove(accessToken!, { boardId: +boardId!, listId }, cardId),
		onSuccess: (_, { listId, cardId }) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: cardKeys.findAll({ boardId: +boardId!, listId }),
				}),
				queryClient.invalidateQueries({
					queryKey: cardKeys.findOne(cardId),
				}),
			]);
		},
		meta: {
			title: "Remove card",
		},
	});
};

export const useCreateCard = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ listId, values }: { listId: IList["id"]; values: CreateCardDto }) =>
			create(accessToken!, { boardId: +boardId!, listId }, values),
		onSuccess: (list, { listId }) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: cardKeys.findAll({ boardId: +boardId!, listId }),
				}),
				queryClient.setQueryData(cardKeys.findOne(list.id), list),
			]);
		},
		meta: {
			title: "Create card",
		},
	});
};
