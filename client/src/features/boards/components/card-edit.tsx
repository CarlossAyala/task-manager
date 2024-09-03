import { PropsWithChildren, useState } from "react";
import { Button, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";
import { ICardFull } from "@/features/cards";
import { CardBaseForm } from "./card-base-form";

type CardEditFormProps = PropsWithChildren<{ listId: string; card: ICardFull }>;

export const CardEdit = ({ listId, card, children }: CardEditFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="auto" className="block w-full text-start">
					{children}
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-4 overflow-y-auto">
				<SheetHeader className="space-y-0">
					<SheetTitle>Edit card</SheetTitle>
					<SheetDescription>Edit the details of the card to organize your board.</SheetDescription>
				</SheetHeader>

				<CardBaseForm listId={listId} card={card} />
			</SheetContent>
		</Sheet>
	);
};
