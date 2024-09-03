import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessToken, profile, signIn, signOut, signUp } from "./api";

export const authKeys = {
	key: () => ["auth"],
	accessToken: () => [...authKeys.key(), "access-token"],
	profile: () => [...authKeys.key(), "profile"],
};

export const useAuth = () => {
	const {
		data: accessToken,
		isLoading,
		isError,
	} = useQuery({
		queryKey: authKeys.accessToken(),
		queryFn: getAccessToken,
		refetchInterval: 1000 * 60 * 55, // 55 minutes
		refetchIntervalInBackground: true,
	});

	const isAuthenticated = !!accessToken;

	return {
		isAuthenticated,
		accessToken,
		isLoading,
		isError,
	};
};

export const useGetProfile = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: authKeys.profile(),
		queryFn: () => profile(accessToken!),
		enabled: !!accessToken,
	});
};

export const useSignUp = () => {
	return useMutation({
		mutationFn: signUp,
		meta: {
			title: "Sign up",
		},
	});
};

export const useSignIn = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: signIn,
		onSuccess({ accessToken, user }) {
			queryClient.setQueryData(authKeys.accessToken(), accessToken);
			queryClient.setQueryData(authKeys.profile(), user);
		},
		meta: {
			title: "Sign in",
		},
	});
};

export const useSignOut = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: signOut,
		onSuccess() {
			queryClient.setQueryData(authKeys.accessToken(), null);
			queryClient.setQueryData(authKeys.profile(), null);
		},
		meta: {
			title: "Sign out",
		},
	});
};
