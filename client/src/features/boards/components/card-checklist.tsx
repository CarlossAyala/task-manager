import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";
import { useGetChecklists } from "@/features/checklists";
import { CardChecklistCreateForm } from "./card-checklist-create-form";
import { CardChecklistUpdateForm } from "./card-checklist-update-form";

type Props = {
	listId: IList["id"];
	cardId: ICard["id"];
};

export const CardChecklist = ({ listId, cardId }: Props) => {
	const { data: checklists, isPending, isError } = useGetChecklists({ listId, cardId });

	return (
		<section className="grid gap-1.5">
			<p className="text-sm font-medium leading-4">Checklists</p>
			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error loading checklists</div>
			) : checklists.length > 0 ? (
				<ol className="space-y-2">
					{checklists.map((checklist) => (
						<li key={checklist.id} className="border-l-4 pl-2">
							<CardChecklistUpdateForm listId={listId} cardId={cardId} checklist={checklist} />
						</li>
					))}
				</ol>
			) : null}
			<CardChecklistCreateForm listId={listId} cardId={cardId} />
		</section>
	);
};
