import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BoardLabelDto, BoardLabelSchema, useCreateBoardLabel } from "@/features/board-labels";
import { Spinner } from "@/shared/components";
import { COLORS_NAME, IColorsName } from "@/shared/tailwind";
import {
	Badge,
	Button,
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
} from "@/shared/ui";
import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";

const LABELS_CORE = [
	{
		name: "Mobile",
		description: "Mobile development",
		color: "green",
	},
	{
		name: "Desktop",
		description: "Desktop development",
		color: "red",
	},
	{
		name: "SaaS",
		description: "SaaS development",
		color: "blue",
	},
	{
		name: "Frontend",
		description: "Frontend development",
		color: "amber",
	},
	{
		name: "Backend",
		description: "Backend development",
		color: "violet",
	},
	{
		name: "DevOps",
		description: "DevOps development",
		color: "pink",
	},
	{
		name: "QA",
		description: "QA development",
		color: "stone",
	},
	{
		name: "Design",
		description: "Design development",
		color: "cyan",
	},
];

export const BoardLabelsCreate = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const form = useForm<BoardLabelDto>({
		resolver: zodResolver(BoardLabelSchema),
		defaultValues: {
			name: "",
			description: "",
			color: COLORS_NAME.slate,
		},
		mode: "onSubmit",
	});

	const create = useCreateBoardLabel();

	const handleSubmit = (values: BoardLabelDto) => {
		create.mutate(values, {
			onSuccess() {
				toast.success("Label created successfully");
				form.reset();
				setTimeout(() => form.setFocus("name"), 0);
			},
		});
	};

	const handleCancel = () => {
		setIsOpen(false);
		form.reset();
	};

	const handleSetLabel = (label: (typeof LABELS_CORE)[number]) => {
		form.setValue("name", label.name);
		form.setValue("description", label.description);
		form.setValue("color", label.color);
	};

	const values = form.watch();

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-60 p-2" align="start">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
						<div className="grid gap-1.5">
							<div>
								<p className="text-sm font-medium leading-4">Create a new label</p>
							</div>
							<div className="grid place-content-center gap-1.5 overflow-auto bg-muted py-4">
								<Badge variant={values.color as IColorsName} className="text-wrap">
									{values.name}
								</Badge>
							</div>
						</div>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid gap-1.5">
							<div>
								<p className="text-sm font-medium leading-3">Suggestions</p>
							</div>
							<div className="flex flex-wrap gap-1">
								{LABELS_CORE.map((label) => (
									<button type="button" key={label.name} onClick={() => handleSetLabel(label)}>
										<Badge variant={label.color as IColorsName} className="flex">
											{label.name}
										</Badge>
									</button>
								))}
							</div>
						</div>
						<div className="grid gap-1.5">
							<div>
								<p className="text-sm font-medium leading-3">Colors</p>
							</div>
							<div className="grid grid-cols-5 gap-1">
								{Object.values(COLORS_NAME).map((color) => (
									<button type="button" key={color} onClick={() => form.setValue("color", color)}>
										<Badge variant={color as IColorsName} className="h-5 w-full" />
									</button>
								))}
							</div>
						</div>

						<div className="flex justify-end gap-2">
							<Button type="button" variant="outline" size="sm" onClick={handleCancel}>
								Cancel
							</Button>
							<Button type="submit" size="sm" disabled={create.isPending}>
								Create
								{create.isPending ? <Spinner /> : null}
							</Button>
						</div>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
};
