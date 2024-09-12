import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne } from "./api";
import type { IBoard, CreateBoardDto } from "./types";

export const boardKeys = {
	key: () => ["boards"],
	findAll: () => [...boardKeys.key(), "find-all"],
	findOne: (id: IBoard["id"]) => [...boardKeys.key(), "find-one", id],
};

export const useGetBoards = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: boardKeys.findAll(),
		queryFn: () => findAll(accessToken!),
	});
};

export const useGetBoard = () => {
	const { boardId } = useParams();
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: boardKeys.findOne(+boardId!),
		queryFn: () => findOne(accessToken!, +boardId!),
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
			queryClient.setQueryData(boardKeys.findOne(board.id), board);
			queryClient.setQueryData<IBoard[]>(boardKeys.findAll(), (oldData) => {
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
