import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BreakpointIndicator } from "@/shared/components";
import { queryClient } from "@/shared/libs";
import { Toaster } from "@/shared/ui";

type Props = {
	children: ReactNode;
};

export const Providers = ({ children }: Props) => {
	return (
		<Fragment>
			<BreakpointIndicator />
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left" />
			</QueryClientProvider>
			<Toaster />
		</Fragment>
	);
};
