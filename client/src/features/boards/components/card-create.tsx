import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
	Avatar,
	AvatarFallback,
	Badge,
	Button,
	Calendar,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Textarea,
} from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { cn } from "@/shared/utils";
import { useGetMembers } from "@/features/members";
import { createCardDefaultValues, CreateCardDto, createCardSchema, useCreateCard } from "@/features/cards";

enum Modals {
	Aside = "aside",
	Assignees = "assignees",
}

const languages = [
	{ id: 1, label: "English" },
	{ id: 2, label: "French" },
	{ id: 3, label: "German" },
	{ id: 4, label: "Spanish" },
	{ id: 5, label: "Portuguese" },
	{ id: 6, label: "Russian" },
	{ id: 7, label: "Japanese" },
	{ id: 8, label: "Korean" },
	{ id: 9, label: "Chinese" },
	{ id: 10, label: "Arabic" },
] as const;

// TODO: Add attachments

export const CardCreate = ({ listId }: { listId: string }) => {
	const [modals, setModals] = useState<Modals[]>([]);

	const form = useForm<CreateCardDto>({
		resolver: zodResolver(createCardSchema),
		defaultValues: createCardDefaultValues,
	});

	const checklists = useFieldArray({
		name: "checklists",
		control: form.control,
	});

	const { mutate, isPending } = useCreateCard();
	const members = useGetMembers();

	const handleSubmit = (values: CreateCardDto) => {
		mutate(
			{
				listId,
				values,
			},
			{
				onSuccess() {
					toast.success("Card created successfully");
					setModals([]);
				},
			},
		);
	};

	const handleAddChecklist = () => {
		checklists.append({
			name: "",
			description: "",
		});
	};

	return (
		<Sheet
			open={modals.includes(Modals.Aside)}
			onOpenChange={(open) => {
				setModals(open ? [Modals.Aside] : []);
				form.reset();
			}}
		>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" onClick={() => setModals([Modals.Aside])}>
					<PlusIcon className="size-4" />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-4 overflow-y-auto">
				<SheetHeader className="space-y-0">
					<SheetTitle>New Card</SheetTitle>
					<SheetDescription>Create a new card to organize your board.</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col gap-3">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="My list" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="My list description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="assignees"
							render={({ field }) => (
								<FormItem className="grid gap-1.5 space-y-0">
									<FormLabel>Assignees</FormLabel>
									{field.value.length > 0 ? (
										<div className="flex flex-wrap gap-2">
											{members.data
												?.filter((member) => field.value.includes(member.id))
												.map((member) => (
													<button
														key={member.id}
														onClick={() =>
															form.setValue(
																"assignees",
																field.value.filter((memberId) => memberId !== member.id),
															)
														}
														className="group"
													>
														<Avatar className="relative border hover:border-primary">
															<AvatarFallback className="text-sm group-hover:text-transparent">
																{member.user.initials}
															</AvatarFallback>
															<XMarkIcon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" />
														</Avatar>
													</button>
												))}
										</div>
									) : null}
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant="outline" size="icon">
													<PlusIcon className="size-4" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="max-w-sm space-y-2 p-0" align="start" portal={false}>
											<Command>
												<CommandInput placeholder="Search members..." />
												<CommandList>
													{members.isPending ? (
														<div className="py-6">
															<Spinner className="mx-auto size-5" />
														</div>
													) : members.isError ? (
														<div className="py-6 text-center text-sm">
															<p>Error loading members.</p>
														</div>
													) : (
														<>
															<CommandEmpty>No members found.</CommandEmpty>
															<CommandGroup>
																{members.data.map((member) => {
																	const isActive = field.value.includes(member.id);

																	return (
																		<CommandItem
																			key={member.id}
																			value={member.user.fullName}
																			onSelect={() => {
																				if (isActive) {
																					form.setValue(
																						"assignees",
																						field.value.filter((userId) => userId !== member.id),
																					);
																				} else {
																					form.setValue("assignees", field.value.concat(member.id));
																				}
																			}}
																			className="flex items-start justify-between gap-2"
																		>
																			<p className="text-wrap">{member.user.fullName}</p>
																			<CheckIcon
																				className={cn("size-4 shrink-0", isActive ? "opacity-100" : "opacity-0")}
																			/>
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
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="labels"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-1.5 space-y-0">
									<FormLabel>Labels</FormLabel>
									<Popover>
										<div className="grid gap-2">
											{field.value.length > 0 ? (
												<div className="flex flex-wrap gap-1">
													{languages
														.filter((l) => field.value.includes(l.id))
														.map((l) => (
															<button
																key={l.id}
																className="group"
																onClick={() =>
																	form.setValue(
																		"labels",
																		field.value.filter((labelId) => labelId !== l.id),
																	)
																}
															>
																<Badge variant="slate" className="relative group-hover:text-transparent">
																	{l.label}
																	<XMarkIcon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
																</Badge>
															</button>
														))}
												</div>
											) : null}
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant="outline" size="icon" onClick={handleAddChecklist}>
														<PlusIcon className="size-4" />
													</Button>
												</FormControl>
											</PopoverTrigger>
										</div>
										<PopoverContent className="mt-0 p-0" align="start" portal={false}>
											<Command>
												<CommandInput placeholder="Search labels..." />
												<CommandList>
													<CommandEmpty>No labels found.</CommandEmpty>
													<CommandGroup>
														{languages.map((l) => {
															const isActive = field.value.includes(l.id);

															return (
																<CommandItem
																	key={l.id}
																	value={String(l.id)}
																	onSelect={() => {
																		form.setValue(
																			"labels",
																			isActive ? field.value.filter((id) => id !== l.id) : field.value.concat(l.id),
																		);
																	}}
																>
																	{l.label}
																	<CheckIcon
																		className={cn("ml-auto h-4 w-4", isActive ? "opacity-100" : "opacity-0")}
																	/>
																</CommandItem>
															);
														})}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid space-y-1.5">
							<Label>Checklists</Label>

							{checklists.fields.length > 0 ? (
								<ol className="space-y-2">
									{checklists.fields.map((field, index) => {
										return (
											<li key={field.id} className="space-y-2 border-l-4 pl-2">
												<FormField
													control={form.control}
													name={`checklists.${index}.name`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Name</FormLabel>
															<FormControl>
																<Input placeholder="Checklist" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`checklists.${index}.description`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Description</FormLabel>
															<FormControl>
																<Textarea placeholder="Checklist description" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<div className="flex justify-end">
													<Button
														variant="destructive"
														size="icon"
														className="h-8 w-8"
														onClick={() => checklists.remove(index)}
													>
														<XMarkIcon className="size-4" />
													</Button>
												</div>
											</li>
										);
									})}
								</ol>
							) : null}

							<Button type="button" variant="outline" size="icon" onClick={handleAddChecklist}>
								<PlusIcon className="size-4" />
							</Button>
						</div>

						{/* TODO: Add hour picker */}
						<FormField
							control={form.control}
							name="dueDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Due date</FormLabel>
									<Popover>
										<div className="flex items-center gap-2">
											<PopoverTrigger asChild>
												<FormControl className="grow">
													<Button
														type="button"
														variant="outline"
														className={cn(
															"justify-start pl-3 text-left font-normal",
															!field.value && "text-muted-foreground",
														)}
													>
														{field.value ? new Date(field.value).toLocaleDateString() : <span>Pick a date</span>}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<Button
												type="button"
												variant="outline"
												size="icon"
												className="shrink-0"
												disabled={!field.value}
												onClick={() => field.onChange(undefined)}
											>
												<XMarkIcon className="size-5" />
											</Button>
										</div>
										<PopoverContent align="start" className="w-auto p-0">
											<Calendar
												mode="single"
												selected={field.value ? new Date(field.value) : undefined}
												onSelect={(date) => field.onChange(date?.toISOString())}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* TODO: Add more granularity to reminder time*/}
						<FormField
							control={form.control}
							name="reminderDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Reminder time</FormLabel>
									<Select
										value={field.value}
										onValueChange={(value) => {
											const PRESETS = new Map<number, Date>([
												[0, new Date()],
												[1, new Date(new Date().getTime() + 1000 * 60 * 60 * 24)],
												[3, new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3)],
												[7, new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)],
											]);
											field.onChange(PRESETS.get(+value) as Date);
										}}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select" />
											</SelectTrigger>
										</FormControl>
										<SelectContent position="popper">
											<SelectItem value="0">Today</SelectItem>
											<SelectItem value="1">Tomorrow</SelectItem>
											<SelectItem value="3">In 3 days</SelectItem>
											<SelectItem value="7">In a week</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<SheetFooter className="mt-auto">
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									setModals([]);
									form.reset();
								}}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isPending}>
								Create
								{isPending && <Spinner className="ml-2" />}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};
