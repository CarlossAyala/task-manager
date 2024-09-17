import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { cn } from "@/shared/utils";
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input, Textarea } from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { IChecklist, UpdateChecklistDto, updateChecklistSchema, useUpdateChecklist } from "@/features/checklists";
import { useCard } from "../providers/card.provider";

export const CardChecklistInputs = ({ checklist }: { checklist: IChecklist }) => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	const form = useForm<UpdateChecklistDto>({
		resolver: zodResolver(updateChecklistSchema),
		values: {
			name: checklist.name,
			description: checklist.description ?? undefined,
		},
	});

	const { listId, cardId } = useCard();

	const { mutate, isPending } = useUpdateChecklist({ listId, cardId });

	const handleSubmit = (values: UpdateChecklistDto) => {
		mutate(
			{
				id: checklist.id,
				values,
			},
			{
				onSuccess() {
					toast.success("Checklist updated successfully");
					setIsEditMode(false);
				},
			},
		);
	};

	const handleCancel = () => {
		setIsEditMode(false);
		form.reset();
	};

	const startEditing = () => {
		setIsEditMode(true);
		setTimeout(() => form.setFocus("name"), 0);
	};

	return isEditMode ? (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full gap-1.5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Name" {...field} />
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
							<FormControl>
								<Textarea placeholder="Description" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					<Button type="submit" disabled={isPending || !form.formState.isDirty}>
						Save
						{isPending ? <Spinner className="ml-2" /> : null}
					</Button>
					<Button variant="ghost" size="icon" onClick={handleCancel}>
						<XMarkIcon className="size-5" />
					</Button>
				</div>
			</form>
		</Form>
	) : (
		<div className="grid w-full gap-1.5">
			<Button variant="ghost" onClick={startEditing} className="w-full justify-start">
				{checklist.name}
			</Button>
			<Button
				variant="ghost"
				onClick={startEditing}
				className={cn("w-full justify-start", checklist.description ? "" : "font-normal text-muted-foreground")}
			>
				{checklist.description ? checklist.description : "No description"}
			</Button>
		</div>
	);
};
