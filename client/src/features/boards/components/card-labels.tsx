import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { useGetBoardLabels } from "@/features/board-labels";
import { useGetCardLabels } from "@/features/card-labels";
import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";
import { CardLabelsCreate } from "./card-labels-create";
import { CardLabelsRemove } from "./card-labels-remove";

type Props = {
	listId: IList["id"];
	cardId: ICard["id"];
};

export const CardLabels = ({ listId, cardId }: Props) => {
	const [search, setSearch] = useState("");
	const labels = useGetBoardLabels();
	const labelsId = useGetCardLabels({ listId, cardId });

	const unselectedLabels = labels.data?.filter((label) => !labelsId.data?.find((l) => l.labelId === label.id));

	const filtered = unselectedLabels?.filter((label) => label.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<section className="grid gap-1.5">
			<p className="text-sm font-medium leading-4">Labels</p>

			{labels.isPending || labelsId.isPending ? (
				<div>Loading...</div>
			) : labels.isError || labelsId.isError ? (
				<div>Error loading labels</div>
			) : labelsId.data.length > 0 ? (
				<div className="flex flex-wrap gap-1">
					{labels.data
						.filter((label) => labelsId.data.find((l) => l.labelId === label.id))
						.map((label) => {
							const cardLabel = labelsId.data.find((l) => l.labelId === label.id);

							return (
								<CardLabelsRemove key={label.id} listId={listId} cardId={cardId} label={label} cardLabel={cardLabel!} />
							);
						})}
				</div>
			) : null}

			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="icon">
						<PlusIcon className="size-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="grid gap-2 p-2" align="start" portal={false}>
					<div className="grid w-full items-center gap-1.5">
						<Label htmlFor="search">Search</Label>
						<Input
							id="text"
							type="text"
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					{labels.isPending || labelsId.isPending ? (
						<div className="py-6">
							<Spinner className="mx-auto size-5" />
						</div>
					) : labels.isError || labelsId.isError ? (
						<div className="py-6 text-center text-sm">
							<p>Error loading labels.</p>
						</div>
					) : labels.data.length === 0 ? (
						<div className="py-6 text-center text-sm">
							<p>No labels found. Create a new one to get started.</p>
						</div>
					) : labels.data.length === labelsId.data.length ? (
						<div className="py-6 text-center text-sm">
							<p>All labels selected.</p>
						</div>
					) : filtered?.length === 0 ? (
						<div className="py-6 text-center text-sm">
							<p>No matching for "{search}".</p>
						</div>
					) : (
						<div className="flex flex-wrap gap-1">
							{filtered?.map((label) => (
								<CardLabelsCreate key={label.id} listId={listId} cardId={cardId} label={label} />
							))}
						</div>
					)}
				</PopoverContent>
			</Popover>
		</section>
	);
};
