import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { IBoard } from "../boards";
import { create, findAll, findOne, remove, update } from "./api";
import { CreateListDto, IList, UpdateListDto } from "./types";

export const listKeys = {
	key: () => ["lists"],
	findAll: (boardId: IBoard["id"]) => [...listKeys.key(), "find-all", boardId],
	findOne: (id: IList["id"]) => [...listKeys.key(), "find-one", id],
};

export const useGetLists = () => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: listKeys.findAll(+boardId!),
		queryFn: () => findAll(accessToken!, +boardId!),
	});
};

export const useGetList = (id: IList["id"]) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: listKeys.findOne(id),
		queryFn: () => findOne(accessToken!, +boardId!, id),
	});
};

export const useUpdateList = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ listId, values }: { listId: IList["id"]; values: UpdateListDto }) =>
			update(accessToken!, +boardId!, listId, values),
		onSuccess: (_, { listId }) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: listKeys.findAll(+boardId!),
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
		mutationFn: (id: IList["id"]) => remove(accessToken!, +boardId!, id),
		onSuccess: (_, id) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: listKeys.findAll(+boardId!),
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
		mutationFn: (values: CreateListDto) => create(accessToken!, +boardId!, values),
		onSuccess: (list) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: listKeys.findAll(+boardId!),
				}),
				queryClient.invalidateQueries({
					queryKey: listKeys.findOne(list.id),
				}),
			]);
		},
		meta: {
			title: "Create list",
		},
	});
};
