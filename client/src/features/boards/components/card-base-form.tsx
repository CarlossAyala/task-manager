import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/shared/utils";
import {
	Button,
	Calendar,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { UpdateCardBaseDto, updateCardSchema, useUpdateCard } from "@/features/cards";
import { useCard } from "../providers/card.provider";

// type Props = {
// 	listId: IList["id"];
// 	card: ICard;
// };

export const CardBaseForm = () => {
	const { listId, card } = useCard();

	const form = useForm<UpdateCardBaseDto>({
		resolver: zodResolver(updateCardSchema),
		defaultValues: {
			title: card.title,
			description: card.description,
			dueDate: card.dueDate ?? undefined,
			reminderDate: card.reminderDate ?? undefined,
		},
	});

	const { mutate, isPending } = useUpdateCard();

	const handleSubmit = (values: UpdateCardBaseDto) => {
		mutate({
			listId,
			cardId: card.id,
			values,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-3">
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

				<div className="flex justify-end">
					<Button type="submit" disabled={isPending}>
						Save
						{isPending && <Spinner className="ml-2" />}
					</Button>
				</div>
			</form>
		</Form>
	);
};
