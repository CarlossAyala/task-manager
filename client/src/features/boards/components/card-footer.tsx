import { ClockIcon, ListBulletIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Badge, Skeleton, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui";
import { useGetAssignees } from "@/features/assignees";
import { useGetChecklists } from "@/features/checklists";
import { useCard } from "../providers/card.provider";
import { useGetMembers } from "@/features/members";
import { useGetCard } from "@/features/cards";

export const CardFooter = () => {
	const { listId, cardId } = useCard();

	const card = useGetCard({ listId, cardId });

	// TODO: combine assignees and members in one hook
	const members = useGetMembers();
	const assignees = useGetAssignees({ listId, cardId });

	const checklists = useGetChecklists({ listId, cardId });

	return (
		<section className="grid gap-2">
			{assignees.isPending || members.isPending ? (
				<div className="grid grid-cols-4 gap-1">
					{new Array(4).fill(null).map((_, index) => (
						<Skeleton key={index} className="h-5 w-full" />
					))}
				</div>
			) : assignees.isError || members.isError ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="size-5">
							<UserGroupIcon className="text-destructive" />
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>Error loading assignees</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : assignees.data.length > 0 ? (
				<div className="flex flex-wrap items-center gap-1">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="size-5 shrink-0 text-muted-foreground">
								<UserGroupIcon />
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Assignees</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{members.data
						.filter((member) => {
							return assignees.data.find((a) => a.memberId === member.id);
						})
						.map((member) => (
							<Badge key={member.id} variant="member" className="">
								{member.user.fullName}
							</Badge>
						))}
				</div>
			) : null}
			<div className="flex items-start gap-4">
				<div className="flex w-full flex-wrap gap-2">
					{checklists.isPending ? (
						<Skeleton className="h-5 w-10" />
					) : checklists.isError ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="size-5">
									<ListBulletIcon className="text-destructive" />
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p>Error loading checklists</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : checklists.data.length > 0 ? (
						<div className="flex items-center gap-0.5 text-muted-foreground">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="size-4 text-muted-foreground">
										<ListBulletIcon />
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Checklists</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<div>
								<p className="text-xs">
									{checklists.data.filter((checklist) => checklist.isChecked).length}/{checklists.data.length}
								</p>
							</div>
						</div>
					) : null}
				</div>

				{card.isPending ? (
					<Skeleton className="ml-auto h-5 w-10" />
				) : card.isError ? (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="ml-auto size-5">
								<ClockIcon className="text-destructive" />
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Error loading due date</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : card.data.createdAt ? (
					<div className="ml-auto flex items-center gap-0.5 text-muted-foreground">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="size-4">
									<ClockIcon />
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p>Due date</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<div>
							{/* TODO: Show remaining time to due date */}
							<p className="text-xs">4d</p>
						</div>
					</div>
				) : null}
			</div>
		</section>
	);
};
