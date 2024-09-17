import { IChecklist } from "@/features/checklists";
import { CardChecklistCheckbox } from "./card-checklist-checkbox";
import { CardChecklistInputs } from "./card-checklist-inputs";

type Props = {
	checklist: IChecklist;
};

export const CardChecklistItem = ({ checklist }: Props) => {
	return (
		<div className="flex w-full items-start">
			<CardChecklistCheckbox checklist={checklist} />
			<CardChecklistInputs checklist={checklist} />
		</div>
	);
};
