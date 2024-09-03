import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne, remove, update } from "./api";
import { CreateListDto, UpdateListDto } from "./types";

export const listKeys = {
	key: () => ["lists"],
	findAll: (boardId: string) => [...listKeys.key(), "find-all", boardId],
	findOne: (id: string) => [...listKeys.key(), "find-one", id],
};

export const useGetLists = () => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: listKeys.findAll(boardId!),
		queryFn: () => findAll(accessToken!, boardId!),
	});
};

export const useGetList = (id: string) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: listKeys.findOne(id),
		queryFn: () => findOne(accessToken!, boardId!, id),
	});
};

export const useUpdateList = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ listId, values }: { listId: string; values: UpdateListDto }) =>
			update(accessToken!, boardId!, listId, values),
		onSuccess: (_, { listId }) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: listKeys.findAll(boardId!),
				}),
				queryClient.invalidateQueries({
					queryKey: listKeys.findOne(listId),
				}),
			]);
		},
		meta: {
			title: "Update list",
		},
	});
};

export const useRemoveList = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (id: string) => remove(accessToken!, boardId!, id),
		onSuccess: (_, id) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: listKeys.findAll(boardId!),
				}),
				queryClient.invalidateQueries({
					queryKey: listKeys.findOne(id),
				}),
			]);
		},
		meta: {
			title: "Remove list",
		},
	});
};

export const useCreateList = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (values: CreateListDto) => create(accessToken!, boardId!, values),
		onSuccess: (list) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: listKeys.findAll(boardId!),
				}),
				queryClient.invalidateQueries({
					queryKey: listKeys.findOne(String(list.id)),
				}),
			]);
		},
		meta: {
			title: "Create list",
		},
	});
};
