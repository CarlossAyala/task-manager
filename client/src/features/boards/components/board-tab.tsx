import { useGetLists } from "@/features/lists";
import { ListCreate } from "./list-create";
import { List } from "./list";

export const BoardTab = () => {
	const { data: lists, error, isPending, isError } = useGetLists();

	return (
		<div className="flex gap-2">
			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				lists.map((list) => <List key={list.id} list={list} />)
			)}
			<ListCreate />
		</div>
	);
};
