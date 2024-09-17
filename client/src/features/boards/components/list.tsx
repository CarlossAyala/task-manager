import { getBgColor } from "@/shared/tailwind";
import { cn } from "@/shared/utils";
import { IList } from "@/features/lists";
import { useGetCards } from "@/features/cards";
import { ListActions } from "./list-actions";
import { CardCreate } from "./card-create";
import { Card } from "./card";

// TODO: Add card order to cards
export const List = ({ list }: { list: IList }) => {
	const { data: cards, error, isPending, isError } = useGetCards(list.id);

	const bg = getBgColor(list.color);

	return (
		<div className="flex w-72 max-w-72 shrink-0 flex-col border">
			<div className="flex items-center justify-between px-3 pt-1">
				<div className="flex items-center gap-2">
					<div className={cn("h-6 w-1.5 shrink-0 grow-0 rounded-full", bg)}></div>
					<h2 className="font-medium">{list.name}</h2>
				</div>
				<div className="-mr-2 flex shrink-0 gap-2">
					<CardCreate listId={list.id} />
					<ListActions list={list} />
				</div>
			</div>
			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : cards.length === 0 ? (
				<div className="grid h-full place-content-center p-3 text-center text-sm text-muted-foreground">
					No cards here.
				</div>
			) : (
				<ol className="flex h-full flex-col gap-2 overflow-y-auto overflow-x-hidden p-3">
					{cards.map((card) => (
						<li key={card.id}>
							<Card key={card.id} listId={list.id} card={card} />
						</li>
					))}
				</ol>
			)}
		</div>
	);
};
