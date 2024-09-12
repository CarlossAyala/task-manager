import { ExclamationCircleIcon, ListBulletIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/shared/ui";
import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";
import { useGetAssignees } from "@/features/assignees";
import { Spinner } from "@/shared/components";
import { useGetChecklists } from "@/features/checklists";
import { useGetCardLabels } from "@/features/card-labels";
import { IColorsName } from "@/shared/tailwind";
import { useGetBoardLabels } from "@/features/board-labels";

type Props = {
	listId: IList["id"];
	card: ICard;
};

export const CardDetails = ({ listId, card }: Props) => {
	const assignees = useGetAssignees({ listId, cardId: card.id });
	const checklists = useGetChecklists({ listId, cardId: card.id });
	const labelsId = useGetCardLabels({ listId, cardId: card.id });
	const labels = useGetBoardLabels();

	return (
		<article className="grid gap-2 p-2">
			{labels.isPending || labelsId.isPending ? (
				<div>Loading...</div>
			) : labels.isError || labelsId.isError ? (
				<div>Error loading labels</div>
			) : labelsId.data.length > 0 ? (
				<div className="flex flex-wrap gap-1">
					{labels.data
						.filter((label) => labelsId.data.find((l) => l.labelId === label.id))
						.map((label) => (
							<Badge key={label.id} variant={label.color as IColorsName} className="text-wrap">
								{label.name}
							</Badge>
						))}
				</div>
			) : null}
			<div>
				<h3 className="text-sm font-medium leading-4">{card.title}</h3>
			</div>
			<div className="flex gap-4">
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<UsersIcon className="size-4 shrink-0" />
					{assignees.isPending ? (
						<Spinner />
					) : assignees.isError ? (
						<ExclamationCircleIcon className="text-destructive" />
					) : assignees.data.length === 0 ? (
						<div className="text-sm">TBD</div>
					) : (
						<div className="text-sm">{assignees.data.length}</div>
					)}
				</div>
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<ListBulletIcon className="size-4 shrink-0" />
					{checklists.isPending ? (
						<Spinner />
					) : checklists.isError ? (
						<ExclamationCircleIcon className="text-destructive" />
					) : (
						<div className="text-sm">
							{checklists.data.length === 0
								? "TBD"
								: checklists.data.every((checklist) => checklist.isChecked)
									? [
											"Completed (",
											checklists.data.filter((checklist) => checklist.isChecked).length,
											"/",
											checklists.data.length,
											")",
										].join("")
									: [
											checklists.data.filter((checklist) => checklist.isChecked).length,
											"/",
											checklists.data.length,
										].join("")}
						</div>
					)}
				</div>
			</div>
		</article>
	);
};
