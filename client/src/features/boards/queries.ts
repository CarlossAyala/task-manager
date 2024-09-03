import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne } from "./api";
import type { IBoard, CreateBoardDto } from "./types";

export const boardKeys = {
	key: () => ["boards"],
	findAll: () => [...boardKeys.key(), "find-all"],
	findOne: (id: string) => [...boardKeys.key(), "find-one", id],
};

export const useGetBoards = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: boardKeys.findAll(),
		queryFn: () => findAll(accessToken!),
	});
};

export const useGetBoard = (id: string) => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: boardKeys.findOne(id),
		queryFn: () => findOne(accessToken!, id),
	});
};

export const useUpdateBoard = () => {
	// TODO: Implement
};

export const useRemoveBoard = () => {
	// TODO: Implement
};

export const useCreateBoard = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (values: CreateBoardDto) => create(accessToken!, values),
		onSuccess: (board) => {
			queryClient.setQueryData(boardKeys.findOne(String(board.id)), board);
			queryClient.setQueryData(boardKeys.findAll(), (oldData: IBoard[] | undefined) => {
				if (!oldData) {
					return [board];
				}

				return [...oldData, board];
			});
		},
		meta: {
			title: "Create board",
		},
	});
};
