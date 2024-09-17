import { Checkbox } from "@/shared/ui";
import { IChecklist, useUpdateChecklist } from "@/features/checklists";
import { useCard } from "../providers/card.provider";

// TODO: Implement re-order
export const CardChecklistCheckbox = ({ checklist }: { checklist: IChecklist }) => {
	const { listId, cardId } = useCard();

	const { mutate, isPending } = useUpdateChecklist({ listId, cardId });

	// TODO: Implement optimistic update
	const handleChange = () => {
		mutate({
			id: checklist.id,
			values: {
				isChecked: !checklist.isChecked,
			},
		});
	};

	return (
		<Checkbox
			checked={checklist.isChecked}
			onCheckedChange={handleChange}
			disabled={isPending}
			className="mx-2 mt-2.5 shrink-0"
		/>
	);
};
