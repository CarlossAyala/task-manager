import { useGetChecklists } from "@/features/checklists";
import { useCard } from "../providers/card.provider";
import { CardChecklistCreateForm } from "./card-checklist-create-form";
import { CardChecklistItem } from "./card-checklist-item";

export const CardChecklist = () => {
	const { listId, cardId } = useCard();
	const { data: checklists, isPending, isError } = useGetChecklists({ listId, cardId });

	return (
		<section className="grid gap-1.5">
			<div>
				<p className="text-sm font-medium leading-4">Checklists</p>
			</div>

			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error loading checklists</div>
			) : checklists.length > 0 ? (
				<ol className="space-y-2">
					{checklists.map((checklist) => (
						<li key={checklist.id} className="border-l-4">
							<CardChecklistItem checklist={checklist} />
						</li>
					))}
				</ol>
			) : null}
			<CardChecklistCreateForm />
		</section>
	);
};
