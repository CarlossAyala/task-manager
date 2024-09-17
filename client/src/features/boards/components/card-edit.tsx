import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/ui";
import { CardBaseForm } from "./card-base-form";
import { CardAssignees } from "./card-assignees";
import { CardLabels } from "./card-labels";
import { CardChecklist } from "./card-checklist";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const CardEdit = ({ open, onOpenChange }: Props) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="flex flex-col gap-4 overflow-y-auto">
				<SheetHeader>
					<SheetTitle>Card Details</SheetTitle>
					<SheetDescription>Edit the details of the card to organize your board.</SheetDescription>
				</SheetHeader>

				<CardBaseForm />
				<CardAssignees />
				<CardLabels />
				<CardChecklist />
			</SheetContent>
		</Sheet>
	);
};
