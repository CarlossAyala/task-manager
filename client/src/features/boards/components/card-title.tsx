import { useState } from "react";
import { Button, Skeleton } from "@/shared/ui";
import { useGetCard } from "@/features/cards";
import { useCard } from "../providers/card.provider";
import { CardEdit } from "./card-edit";

export const CardTitle = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { listId, cardId } = useCard();

	const card = useGetCard({ listId, cardId });

	return card.isPending ? (
		<Skeleton className="h-5 w-full" />
	) : card.isError ? (
		<div>
			<p className="text-sm text-destructive">Error loading card</p>
		</div>
	) : (
		<>
			<Button
				variant="link"
				className="line-clamp-3 h-auto text-wrap p-0 text-left leading-tight underline-offset-2"
				onClick={() => setIsOpen(true)}
			>
				{card.data.title}
			</Button>
			<CardEdit open={isOpen} onOpenChange={setIsOpen} />
		</>
	);
};
