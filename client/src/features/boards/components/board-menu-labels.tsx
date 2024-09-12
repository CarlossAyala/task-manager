import { useState } from "react";
import { Input, Label } from "@/shared/ui";
import { useGetBoardLabels } from "@/features/board-labels";
import { BoardLabelsCreate } from "./board-labels-create";
import { BoardLabelsUpdate } from "./board-labels-update";

export const BoardMenuLabels = () => {
	const [search, setSearch] = useState<string>("");
	const { data, isPending, isError } = useGetBoardLabels();

	const labels = data?.filter((label) => label.name.toLowerCase().includes(search.toLowerCase())) ?? [];

	return (
		<section className="grid gap-2">
			<div className="grid w-full gap-1.5">
				<Label htmlFor="search">Search</Label>
				<Input
					id="search"
					type="text"
					name="search"
					placeholder="Name"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div className="py-2 text-center">
					<p className="text-sm text-muted-foreground">Could not load labels.</p>
				</div>
			) : data.length === 0 ? (
				<div className="py-2 text-center">
					<p className="text-sm text-muted-foreground">No labels found. Create a new one to get started.</p>
				</div>
			) : labels.length === 0 && search.length > 0 ? (
				<div className="py-2 text-center">
					<p className="text-sm text-muted-foreground">
						No labels found for <span className="font-bold">{search}</span>. Try a different search.
					</p>
				</div>
			) : labels.length > 0 ? (
				<div className="flex flex-wrap gap-1">
					{labels.map((label) => (
						<BoardLabelsUpdate key={label.id} label={label} />
					))}
				</div>
			) : null}

			<BoardLabelsCreate />
		</section>
	);
};
