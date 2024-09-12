import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne, remove, update } from "./api";
import { ChecklistDto, IChecklist, UpdateChecklistDto } from "./types";

export const checklistKeys = {
	key: () => ["checklists"],
	findAll: ({ boardId, listId, cardId }: { boardId: number; listId: number; cardId: number }) => [
		...checklistKeys.key(),
		"find-all",
		{ boardId, listId, cardId },
	],
	findOne: (id: number) => [...checklistKeys.key(), "find-one", id],
};

export const useGetChecklists = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: checklistKeys.findAll({
			boardId: +boardId!,
			listId,
			cardId,
		}),
		queryFn: () => findAll(accessToken!, { boardId: +boardId!, listId, cardId }),
	});
};

export const useGetChecklist = ({ listId, cardId, id }: { listId: number; cardId: number; id: number }) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: checklistKeys.findOne(id),
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

export const useRemoveChecklist = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (id: number) => remove(accessToken!, { boardId: +boardId!, listId, cardId }, id),
		onSuccess: (_, id) => {
			queryClient.setQueryData<IChecklist[]>(checklistKeys.findAll({ boardId: +boardId!, listId, cardId }), (old) => {
				if (!old) return old;
				return old.filter((checklist) => checklist.id !== id);
			});

			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: checklistKeys.findOne(id),
				}),
			]);
		},
		meta: {
			title: "Remove checklist",
		},
	});
};

export const useCreateChecklist = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (values: ChecklistDto) =>
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
			queryClient.setQueryData<IChecklist[]>(checklistKeys.findAll({ boardId: +boardId!, listId, cardId }), (old) => {
				if (!old) return old;
				return [...old, checklist];
			});
			queryClient.setQueryData<IChecklist>(checklistKeys.findOne(checklist.id), checklist);
		},
		meta: {
			title: "Create checklist",
		},
	});
};

export const useUpdateChecklist = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ id, values }: { id: number; values: UpdateChecklistDto }) =>
			update(
				accessToken!,
				{
					boardId: +boardId!,
					listId,
					cardId,
				},
				id,
				values,
			),
		onSuccess: (_, { id, values }) => {
			queryClient.setQueryData<IChecklist[]>(checklistKeys.findAll({ boardId: +boardId!, listId, cardId }), (old) => {
				if (!old) return old;
				return old.map((c) => (c.id === id ? { ...c, ...values } : c));
			});
			queryClient.setQueryData<IChecklist>(checklistKeys.findOne(id), (old) => (old ? { ...old, ...values } : old));
		},
		meta: {
			title: "Update checklist",
		},
	});
};
