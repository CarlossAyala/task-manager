import { toast } from "sonner";
import { IColorsName } from "@/shared/tailwind";
import { Badge } from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { ICardLabel, useRemoveCardLabel } from "@/features/card-labels";
import { IBoardLabel } from "@/features/board-labels";
import { IList } from "@/features/lists";
import { ICard } from "@/features/cards";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
	listId: IList["id"];
	cardId: ICard["id"];
	label: IBoardLabel;
	cardLabel: ICardLabel;
};

export const CardLabelsRemove = ({ listId, cardId, label, cardLabel }: Props) => {
	const { mutate, isPending } = useRemoveCardLabel({ listId, cardId });

	const handleRemoveLabel = (cardLabelId: number) => {
		mutate(cardLabelId, {
			onSuccess() {
				toast.success("Label removed successfully");
			},
		});
	};

	return (
		<Badge key={label.id} variant={label.color as IColorsName} className="text-wrap">
			{label.name}
			<button
				type="button"
				className="ml-1 disabled:pointer-events-none disabled:opacity-50"
				onClick={() => handleRemoveLabel(cardLabel.id)}
				disabled={isPending}
			>
				{isPending ? <Spinner /> : <XMarkIcon className="size-4" />}
			</button>
		</Badge>
	);
};
