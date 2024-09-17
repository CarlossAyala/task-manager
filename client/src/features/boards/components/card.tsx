import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";
import { CardProvider } from "../providers/card.provider";
import { CardHeader } from "./card-header";
import { CardFooter } from "./card-footer";
import { CardTitle } from "./card-title";
import { CardMenu } from "./card-menu";

export const Card = ({ listId, card }: { listId: IList["id"]; card: ICard }) => {
	return (
		<CardProvider listId={listId} card={card}>
			<article className="group relative grid gap-3 border p-2">
				<CardHeader />
				<CardTitle />
				<CardFooter />
				<CardMenu />
			</article>
		</CardProvider>
	);
};
