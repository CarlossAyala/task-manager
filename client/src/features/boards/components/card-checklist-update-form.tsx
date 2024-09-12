import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	Button,
	Checkbox,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
} from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";
import {
	IChecklist,
	UpdateChecklistDto,
	updateChecklistSchema,
	useRemoveChecklist,
	useUpdateChecklist,
} from "@/features/checklists";

type Props = {
	listId: IList["id"];
	cardId: ICard["id"];
	checklist: IChecklist;
};

export const CardChecklistUpdateForm = ({ listId, cardId, checklist }: Props) => {
	const form = useForm<UpdateChecklistDto>({
		resolver: zodResolver(updateChecklistSchema),
		values: {
			isChecked: checklist.isChecked,
			name: checklist.name,
			description: checklist.description ?? "",
		},
	});

	const update = useUpdateChecklist({ listId, cardId });
	const remove = useRemoveChecklist({ listId, cardId });

	const handleSubmit = (values: UpdateChecklistDto) => {
		update.mutate(
			{
				id: checklist.id,
				values,
			},
			{
				onSuccess() {
					toast.success("Card checklists updated successfully");
				},
			},
		);
	};

	const handleRemove = () => {
		remove.mutate(checklist.id, {
			onSuccess() {
				toast.success("Card checklist removed successfully");
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-2">
				<div className="flex w-full items-start gap-2">
					<section className="shrink-0">
						<FormField
							control={form.control}
							name="isChecked"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>
					</section>
					<section className="-mt-1 grid grow gap-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="leading-none">Title</FormLabel>
									<FormControl>
										<Input placeholder="My checklist" {...field} />
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
										<Textarea placeholder="My checklist description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</section>
				</div>

				<div className="flex justify-end gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={() => form.reset()}
						disabled={!form.formState.isDirty || update.isPending || remove.isPending}
					>
						Reset
					</Button>
					<Button
						type="button"
						variant="destructive"
						onClick={handleRemove}
						disabled={remove.isPending || update.isPending}
					>
						Remove
						{remove.isPending && <Spinner className="ml-2" />}
					</Button>
					<Button type="submit" disabled={update.isPending || !form.formState.isDirty || remove.isPending}>
						Update
						{update.isPending && <Spinner className="ml-2" />}
					</Button>
				</div>
			</form>
		</Form>
	);
};
