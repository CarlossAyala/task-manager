import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth";
import { create, findAll, findOne, remove, update } from "./api";
import { CreateMemberDto, UpdateMemberDto } from "./types";

export const memberKeys = {
	key: () => ["members"],
	findAll: (boardId: string) => [...memberKeys.key(), "find-all", boardId],
	findOne: (id: string) => [...memberKeys.key(), "find-one", id],
};

export const useGetMembers = () => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: memberKeys.findAll(boardId!),
		queryFn: () => findAll(accessToken!, boardId!),
	});
};

export const useGetMember = (memberId: string) => {
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useQuery({
		queryKey: memberKeys.findOne(memberId),
		queryFn: () => findOne(accessToken!, boardId!, memberId),
	});
};

export const useUpdateMember = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: ({ memberId, values }: { memberId: string; values: UpdateMemberDto }) =>
			update(accessToken!, boardId!, memberId, values),
		onSuccess: (_, { memberId }) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: memberKeys.findAll(boardId!),
				}),
				queryClient.invalidateQueries({
					queryKey: memberKeys.findOne(memberId),
				}),
			]);
		},
		meta: {
			title: "Update member",
		},
	});
};

export const useRemoveMember = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (memberId: string) => remove(accessToken!, boardId!, memberId),
		onSuccess: (_, memberId) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: memberKeys.findAll(boardId!),
				}),
				queryClient.invalidateQueries({
					queryKey: memberKeys.findOne(memberId),
				}),
			]);
		},
		meta: {
			title: "Remove member",
		},
	});
};

export const useCreateMember = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { boardId } = useParams();

	return useMutation({
		mutationFn: (values: CreateMemberDto) => create(accessToken!, boardId!, values),
		onSuccess: (member) => {
			return Promise.all([
				queryClient.invalidateQueries({
					queryKey: memberKeys.findAll(boardId!),
				}),
				queryClient.setQueryData(memberKeys.findOne(String(member.id)), member),
			]);
		},
		meta: {
			title: "Create member",
		},
	});
};
