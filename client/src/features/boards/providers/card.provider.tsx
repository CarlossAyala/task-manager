/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";

export type CardContextType = {
	card: ICard;
	listId: IList["id"];
	cardId: ICard["id"];
	paramListId: string | null;
	paramCardId: string | null;
	setParamsId: ({ listId, cardId }: { listId: IList["id"]; cardId: ICard["id"] }) => void;
	removeParamsId: () => void;
};

export const LIST_ID_PARAM_KEY = "listId";
export const CARD_ID_PARAM_KEY = "cardId";

const CardContext = createContext<CardContextType | null>(null);

type Props = PropsWithChildren<{
	listId: IList["id"];
	card: ICard;
}>;

export const CardProvider = ({ listId, card, children }: Props) => {
	const [params, setParams] = useSearchParams();

	const setParamsId = ({ listId, cardId }: { listId: IList["id"]; cardId: ICard["id"] }) => {
		const nextParams = new URLSearchParams(params);
		nextParams.set(LIST_ID_PARAM_KEY, String(listId));
		nextParams.set(CARD_ID_PARAM_KEY, String(cardId));
		setParams(nextParams);
	};

	const removeParamsId = () => {
		const nextParams = new URLSearchParams(params);
		nextParams.delete(LIST_ID_PARAM_KEY);
		nextParams.delete(CARD_ID_PARAM_KEY);
		setParams(nextParams);
	};

	const paramListId = params.get(LIST_ID_PARAM_KEY);
	const paramCardId = params.get(CARD_ID_PARAM_KEY);

	const cardId = card.id;

	return (
		<CardContext.Provider
			value={{
				card,
				listId,
				cardId,
				paramListId,
				paramCardId,
				setParamsId,
				removeParamsId,
			}}
		>
			{children}
		</CardContext.Provider>
	);
};

export const useCard = () => {
	const values = useContext(CardContext);

	if (!values) {
		throw new Error("useCard must be used within a CardProvider");
	}

	return values;
};
