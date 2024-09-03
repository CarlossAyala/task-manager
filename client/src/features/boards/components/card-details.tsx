import { Badge } from "@/shared/ui";
import { ICardFull } from "@/features/cards";
import { ListBulletIcon, UsersIcon } from "@heroicons/react/24/outline";

export const CardDetails = ({ card }: { card: ICardFull }) => {
	const { assignees, checklists, title } = card;

	return (
		<article className="grid gap-2 p-2">
			{/* TODO: Replace with labels and lebel component */}
			{[1, 2, 3, 4, 5, 6, 7].length > 0 ? (
				<div className="flex flex-wrap gap-1">
					{[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
						<Badge key={index}>{index}</Badge>
					))}
				</div>
			) : null}
			<div>
				<h3 className="text-sm font-medium leading-4">{title}</h3>
			</div>
			<div className="flex gap-4">
				<div className="flex items-center gap-1 text-muted-foreground">
					<UsersIcon className="size-4 shrink-0" />
					<div className="text-sm">{assignees.length}</div>
				</div>
				<div className="flex items-center gap-1 text-muted-foreground">
					<ListBulletIcon className="size-4 shrink-0" />
					<div className="text-sm">
						{checklists.length > 0
							? checklists.filter((checklist) => checklist.isChecked).length + "/" + checklists.length
							: 0}
					</div>
				</div>
			</div>
		</article>
	);
};
