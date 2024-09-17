import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { ChecklistDto, checklistInputsSchema, useCreateChecklist } from "@/features/checklists";
import { useCard } from "../providers/card.provider";

export const CardChecklistCreateForm = () => {
	const [isCreateMode, setIsCreateMode] = useState<boolean>(false);

	const form = useForm<ChecklistDto>({
		resolver: zodResolver(checklistInputsSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const { listId, cardId } = useCard();

	const { mutate, isPending } = useCreateChecklist({ listId, cardId });

	const handleSubmit = (values: ChecklistDto) => {
		mutate(values, {
			onSuccess() {
				toast.success("Card created successfully");
			},
		});
	};

	const handleCreate = () => {
		setIsCreateMode(true);
		setTimeout(() => form.setFocus("name"), 0);
	};

	const handleCancel = () => {
		setIsCreateMode(false);
		form.reset();
	};

	useEffect(() => {
		if (isCreateMode) form.setFocus("name");
	}, [form, isCreateMode]);

	return isCreateMode ? (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-3 border-l-4 pl-2">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
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

				<div className="flex justify-end gap-2">
					<Button type="button" variant="outline" size="icon" onClick={handleCancel}>
						<XMarkIcon className="size-5" />
					</Button>
					<Button type="submit" disabled={isPending}>
						Create
						{isPending && <Spinner className="ml-2" />}
					</Button>
				</div>
			</form>
		</Form>
	) : (
		<Button variant="outline" size="icon" onClick={handleCreate}>
			<PlusIcon className="size-4" />
		</Button>
	);
};
