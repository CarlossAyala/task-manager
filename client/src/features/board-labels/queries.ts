import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne, remove, update } from "./api";
import { BoardLabelDto, IBoardLabel } from "./types";
import { IList, listKeys } from "../lists";
import { cardKeys, ICard } from "../cards";
import { cardLabelKeys, ICardLabel } from "../card-labels";

export const boardLabelKeys = {
	key: () => ["board-labels"],
	findAll: (boardId: number) => [...boardLabelKeys.key(), "find-all", boardId],
	findOne: (id: number) => [...boardLabelKeys.key(), "find-one", id],
};

export const useGetBoardLabels = () => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: boardLabelKeys.findAll(+boardId!),
		queryFn: () => findAll(accessToken!, +boardId!),
	});
};

export const useGetBoardLabel = (id: number) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: boardLabelKeys.findOne(id),
		queryFn: () => findOne(accessToken!, +boardId!, id),
	});
};

export const useRemoveBoardLabel = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (id: number) => remove(accessToken!, +boardId!, id),
		onSuccess: (_, id) => {
			// Remove card-labels from all cards by accessing the board lists > cards > card-labels
			const lists = queryClient.getQueryData<IList[]>(listKeys.findAll(+boardId!)) ?? [];
			for (const list of lists) {
				const cards =
					queryClient.getQueryData<ICard[]>(cardKeys.findAll({ boardId: +boardId!, listId: list.id })) ?? [];
				for (const card of cards) {
					const cardLabels =
						queryClient.getQueryData<ICardLabel[]>(
							cardLabelKeys.findAll({ boardId: +boardId!, listId: list.id, cardId: card.id }),
						) ?? [];
					const newLabels = cardLabels.filter((l) => l.labelId !== id);
					queryClient.setQueryData<ICardLabel[]>(
						cardLabelKeys.findAll({ boardId: +boardId!, listId: list.id, cardId: card.id }),
						newLabels,
					);
				}
			}

			queryClient.setQueryData<IBoardLabel[]>(boardLabelKeys.findAll(+boardId!), (old) => {
				if (!old) return old;
				return old.filter((l) => l.id !== id);
			});
			queryClient.removeQueries({
				queryKey: boardLabelKeys.findOne(id),
			});
		},
		meta: {
			title: "Remove board label",
		},
	});
};

export const useCreateBoardLabel = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (values: BoardLabelDto) => create(accessToken!, +boardId!, values),
		onSuccess: (label) => {
			queryClient.setQueryData<IBoardLabel[]>(boardLabelKeys.findAll(+boardId!), (old) => {
				if (!old) return old;
				return [...old, label];
			});
			queryClient.setQueryData<IBoardLabel>(boardLabelKeys.findOne(label.id), label);
		},
		meta: {
			title: "Create board label",
		},
	});
};

export const useUpdateBoardLabel = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ id, values }: { id: number; values: BoardLabelDto }) => update(accessToken!, +boardId!, id, values),
		onSuccess: (_, { id, values }) => {
			queryClient.setQueryData<IBoardLabel[]>(boardLabelKeys.findAll(+boardId!), (old) => {
				if (!old) return old;
				return old.map((c) => (c.id === id ? { ...c, ...values } : c));
			});
			queryClient.setQueryData<IBoardLabel>(boardLabelKeys.findOne(id), (old) => (old ? { ...old, ...values } : old));
		},
		meta: {
			title: "Update board label",
		},
	});
};
