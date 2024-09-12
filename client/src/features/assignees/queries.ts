import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne, remove } from "./api";
import { CreateAssigneeDto, IAssignee } from "./types";

export const assigneeKeys = {
	key: () => ["assignees"],
	findAll: ({ boardId, listId, cardId }: { boardId: number; listId: number; cardId: number }) => [
		...assigneeKeys.key(),
		"find-all",
		{ boardId, listId, cardId },
	],
	findOne: (id: number) => [...assigneeKeys.key(), "find-one", id],
};

export const useGetAssignees = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: assigneeKeys.findAll({
			boardId: +boardId!,
			listId,
			cardId,
		}),
		queryFn: () => findAll(accessToken!, { boardId: +boardId!, listId, cardId }),
	});
};

export const useGetAssignee = ({ listId, cardId, id }: { listId: number; cardId: number; id: number }) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: assigneeKeys.findOne(id),
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

export const useRemoveAssignee = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (id: number) => remove(accessToken!, { boardId: +boardId!, listId, cardId }, id),
		onSuccess: (_, id) => {
			queryClient.setQueryData<IAssignee[]>(assigneeKeys.findAll({ boardId: +boardId!, listId, cardId }), (old) => {
				if (!old) return old;
				return old.filter((assignee) => assignee.id !== id);
			});

			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: assigneeKeys.findOne(id),
				}),
			]);
		},
		meta: {
			title: "Remove assignee",
		},
	});
};

export const useCreateAssignee = ({ listId, cardId }: { listId: number; cardId: number }) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (values: CreateAssigneeDto) =>
			create(
				accessToken!,
				{
					boardId: +boardId!,
					listId,
					cardId,
				},
				values,
			),
		onSuccess: (assignee) => {
			queryClient.setQueryData<IAssignee[]>(assigneeKeys.findAll({ boardId: +boardId!, listId, cardId }), (old) => {
				if (!old) return old;
				return [...old, assignee];
			});
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: assigneeKeys.findOne(assignee.id),
				}),
			]);
		},
		meta: {
			title: "Create assignee",
		},
	});
};
