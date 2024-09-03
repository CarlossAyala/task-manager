export const fetcher = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
	const request = await fetch(input, init);
	const response = await request.json();

	if (!request.ok) {
		throw new Error(response?.message ?? request.statusText);
	}

	return response;
};
