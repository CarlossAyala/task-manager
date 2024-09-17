import { IColorsName } from "@/shared/tailwind";
import { Badge, Skeleton, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui";
import { useGetCardLabels } from "@/features/card-labels";
import { useGetBoardLabels } from "@/features/board-labels";
import { useCard } from "../providers/card.provider";
import { TagIcon } from "@heroicons/react/24/outline";

export const CardHeader = () => {
	const { listId, cardId } = useCard();

	// TODO: combine into one hook
	const labels = useGetBoardLabels();
	const labelsId = useGetCardLabels({ listId, cardId });

	return labels.isPending || labelsId.isPending ? (
		<div className="grid grid-cols-4 gap-1">
			{new Array(4).fill(null).map((_, index) => (
				<Skeleton key={index} className="h-5 w-full" />
			))}
		</div>
	) : labels.isError || labelsId.isError ? (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="size-5">
					<TagIcon className="text-destructive" />
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<p>Error loading labels</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	) : labelsId.data.length > 0 ? (
		<div className="flex flex-wrap items-center gap-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger className="size-5 shrink-0 text-muted-foreground">
						<TagIcon />
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<p>Labels</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			{labels.data
				.filter((label) => labelsId.data.find((l) => l.labelId === label.id))
				.map((label) => (
					<Badge key={label.id} variant={label.color as IColorsName} className="text-wrap">
						{label.name}
					</Badge>
				))}
		</div>
	) : null;
};
