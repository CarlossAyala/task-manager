import { toast } from "sonner";
import { IColorsName } from "@/shared/tailwind";
import { Badge } from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { useCreateCardLabel } from "@/features/card-labels";
import { IBoardLabel } from "@/features/board-labels";
import { IList } from "@/features/lists";
import { ICard } from "@/features/cards";

type Props = {
	listId: IList["id"];
	cardId: ICard["id"];
	label: IBoardLabel;
};

export const CardLabelsCreate = ({ listId, cardId, label }: Props) => {
	const { mutate, isPending } = useCreateCardLabel({ listId, cardId });

	const handleCreateLabel = (labelId: number) => {
		mutate(
			{
				labelId,
			},
			{
				onSuccess() {
					toast.success("Label created successfully");
				},
			},
		);
	};

	return (
		<button
			key={label.id}
			type="button"
			className="disabled:pointer-events-none disabled:opacity-50"
			onClick={() => handleCreateLabel(label.id)}
			disabled={isPending}
		>
			<Badge variant={label.color as IColorsName} className="text-wrap">
				{label.name}
				{isPending ? <Spinner className="ml-1.5" /> : null}
			</Badge>
		</button>
	);
};
