import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
} from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { useRemoveCard } from "@/features/cards";
import { useCard } from "../providers/card.provider";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onRemove: () => void;
};

export const CardMenuRemove = ({ open, onOpenChange, onRemove }: Props) => {
	const { listId, cardId } = useCard();

	const { mutate, isPending } = useRemoveCard();

	const handleRemove = () => {
		mutate(
			{ listId, cardId },
			{
				onSuccess() {
					toast.success("Card removed");
					onRemove();
				},
			},
		);
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This card will no longer be accessible by you or others.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button variant="destructive" disabled={isPending} onClick={handleRemove}>
						Remove
						{isPending ? <Spinner className="ml-2" /> : null}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
