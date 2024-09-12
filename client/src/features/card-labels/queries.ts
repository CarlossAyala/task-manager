import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { IBoard } from "../boards";
import { IList } from "../lists";
import { ICard } from "../cards";
import { CardLabelDto, ICardLabel } from "./types";
import { create, findAll, findOne, remove } from "./api";

export const cardLabelKeys = {
	key: () => ["card-labels"],
	findAll: ({ boardId, listId, cardId }: { boardId: IBoard["id"]; listId?: IList["id"]; cardId?: ICard["id"] }) => [
		...cardLabelKeys.key(),
		"find-all",
		{ boardId, listId, cardId },
	],
	findOne: (id: ICardLabel["id"]) => [...cardLabelKeys.key(), "find-one", id],
};

export const useGetCardLabels = ({ listId, cardId }: { listId: IList["id"]; cardId: ICard["id"] }) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: cardLabelKeys.findAll({
			boardId: +boardId!,
			listId,
			cardId,
		}),
		queryFn: () => findAll(accessToken!, { boardId: +boardId!, listId, cardId }),
	});
};

export const useGetCardLabel = ({ listId, cardId, id }: { listId: number; cardId: number; id: number }) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: cardLabelKeys.findOne(id),
		queryFn: () =>
			findOne(
				accessToken!,
				{
					boardId: +boardId!,
					listId,
					cardId,
				},
				id,
			),
	});
};

export const useRemoveCardLabel = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (id: number) => remove(accessToken!, { boardId: +boardId!, listId, cardId }, id),
		onSuccess: (_, id) => {
			queryClient.setQueryData<ICardLabel[]>(cardLabelKeys.findAll({ boardId: +boardId!, listId, cardId }), (old) => {
				if (!old) return old;
				return old.filter((checklist) => checklist.id !== id);
			});

			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: cardLabelKeys.findOne(id),
				}),
			]);
		},
		meta: {
			title: "Remove card label",
		},
	});
};

export const useCreateCardLabel = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (values: CardLabelDto) =>
			create(
				accessToken!,
				{
					boardId: +boardId!,
					listId,
					cardId,
				},
				values,
			),
		onSuccess: (checklist) => {
			queryClient.setQueryData<ICardLabel[]>(cardLabelKeys.findAll({ boardId: +boardId!, listId, cardId }), (old) => {
				if (!old) return old;
				return [...old, checklist];
			});
			queryClient.setQueryData<ICardLabel>(cardLabelKeys.findOne(checklist.id), checklist);
		},
		meta: {
			title: "Create card label",
		},
	});
};
