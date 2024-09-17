import { toast } from "sonner";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/shared/utils";
import {
	Badge,
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { IMember, useGetMembers } from "@/features/members";
import { useCreateAssignee, useGetAssignees, useRemoveAssignee } from "@/features/assignees";
import { useCard } from "../providers/card.provider";

export const CardAssignees = () => {
	const { listId, cardId } = useCard();

	const assignees = useGetAssignees({ listId, cardId });
	const create = useCreateAssignee({ listId, cardId });
	const remove = useRemoveAssignee({ listId, cardId });
	const members = useGetMembers();

	const handleCreateAssignee = (memberId: number) => {
		create.mutate(
			{
				memberId,
			},
			{
				onSuccess() {
					toast.success("Assignee added successfully");
				},
			},
		);
	};

	const handleRemoveAssignee = (memberId: IMember["id"]) => {
		remove.mutate(memberId, {
			onSuccess() {
				toast.success("Assignee removed successfully");
			},
		});
	};

	return (
		<section className="grid gap-1.5">
			<p className="text-sm font-medium leading-4">Assignees</p>
			{assignees.isPending || members.isPending ? (
				<div>Loading...</div>
			) : assignees.isError || members.isError ? (
				<div>Could not load assignees</div>
			) : assignees.data.length > 0 ? (
				<div className="flex flex-wrap gap-2">
					{members.data
						.filter((member) => {
							return assignees.data.find((assignee) => assignee.memberId === member.id);
						})
						.map((member) => (
							<Badge key={member.id} variant="outline" className="shrink-0 py-1">
								{member.user.fullName}
							</Badge>
						))}
				</div>
			) : null}
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="icon">
						<PlusIcon className="size-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="max-w-sm space-y-2 p-0" align="start" portal={false}>
					<Command>
						<CommandInput placeholder="Search members..." />
						<CommandList>
							{assignees.isPending || members.isPending ? (
								<div className="py-6">
									<Spinner className="mx-auto size-5" />
								</div>
							) : assignees.isError || members.isError ? (
								<div className="py-6 text-center text-sm">
									<p>Error loading members.</p>
								</div>
							) : (
								<>
									<CommandEmpty>No members found.</CommandEmpty>
									<CommandGroup>
										{members.data.map((member) => {
											const assignee = assignees.data.find((assignee) => assignee.memberId === member.id);

											return (
												<CommandItem
													key={member.id}
													value={member.user.fullName}
													onSelect={() => {
														if (assignee) handleRemoveAssignee(assignee.id);
														else handleCreateAssignee(member.id);
													}}
													disabled={create.isPending || remove.isPending}
													className="flex items-start justify-between gap-2"
												>
													<p className="text-wrap">{member.user.fullName}</p>
													<CheckIcon
														className={cn(
															"size-4 shrink-0",
															assignee ? "opacity-100" : "opacity-0",
															create.isPending || remove.isPending ? "hidden" : "",
														)}
													/>
													{create.isPending || remove.isPending ? <Spinner className="-mb-px" /> : null}
												</CommandItem>
											);
										})}
									</CommandGroup>
								</>
							)}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</section>
	);
};
