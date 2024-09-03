import "@tanstack/react-query";

interface CustomMeta extends Record<string, unknown> {
	title: string;
	description?: string;
}

declare module "@tanstack/react-query" {
	interface Register {
		mutationMeta: CustomMeta;
		queryMeta: CustomMeta;
	}
}
