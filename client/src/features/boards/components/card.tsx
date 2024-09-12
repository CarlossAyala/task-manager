import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";
import { CardDetails } from "./card-details";
import { CardEdit } from "./card-edit";

export const Card = ({ listId, card }: { listId: IList["id"]; card: ICard }) => {
	return (
		<CardEdit listId={listId} card={card}>
			<CardDetails listId={listId} card={card} />
		</CardEdit>
	);
};
