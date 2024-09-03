import { ICardFull } from "@/features/cards";
import { CardDetails } from "./card-details";
import { CardEdit } from "./card-edit";

export const Card = ({ listId, card }: { listId: string; card: ICardFull }) => {
	return (
		<CardEdit listId={listId} card={card}>
			<CardDetails card={card} />
		</CardEdit>
	);
};
