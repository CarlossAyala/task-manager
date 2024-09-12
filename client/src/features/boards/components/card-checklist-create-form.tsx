import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { ICard } from "@/features/cards";
import { IList } from "@/features/lists";
import { ChecklistDto, checklistSchema, useCreateChecklist } from "@/features/checklists";

type Props = {
	listId: IList["id"];
	cardId: ICard["id"];
};

export const CardChecklistCreateForm = ({ listId, cardId }: Props) => {
	const [isCreate, setIsCreate] = useState<boolean>(false);

	const form = useForm<ChecklistDto>({
		resolver: zodResolver(checklistSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const { mutate, isPending } = useCreateChecklist({ listId, cardId });

	const handleSubmit = (values: ChecklistDto) => {
		mutate(values, {
			onSuccess() {
				toast.success("Card created successfully");
				form.reset();
				setTimeout(() => form.setFocus("name"), 0);
			},
		});
	};

	const handleCreate = () => {
		setIsCreate(true);
		setTimeout(() => form.setFocus("name"), 0);
	};

	const handleCancel = () => {
		setIsCreate(false);
		form.reset();
	};

	return isCreate ? (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-3 border-l-4 border-green-600/20 pl-2">
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
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancel
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
