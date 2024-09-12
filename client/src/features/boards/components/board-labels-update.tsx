import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/shared/components";
import {
	FormMessage,
	Badge,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Button,
} from "@/shared/ui";
import { COLORS_NAME, IColorsName } from "@/shared/tailwind";
import {
	BoardLabelDto,
	BoardLabelSchema,
	IBoardLabel,
	useRemoveBoardLabel,
	useUpdateBoardLabel,
} from "@/features/board-labels";
import { toast } from "sonner";

// TODO: Add delete button

export const BoardLabelsUpdate = ({ label }: { label: IBoardLabel }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const form = useForm<BoardLabelDto>({
		resolver: zodResolver(BoardLabelSchema),
		values: {
			name: label.name,
			color: label.color,
		},
	});

	const update = useUpdateBoardLabel();
	const remove = useRemoveBoardLabel();

	const handleSubmit = (values: BoardLabelDto) => {
		update.mutate(
			{
				id: label.id,
				values,
			},
			{
				onSuccess() {
					toast.success("Label updated");
				},
			},
		);
	};

	const handleRemove = () => {
		remove.mutate(label.id, {
			onSuccess() {
				toast.success("Label deleted");
				setIsOpen(false);
			},
		});
	};

	const values = form.watch();

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button type="button" className="">
					<Badge variant={label.color as IColorsName} className="text-wrap">
						{label.name}
					</Badge>
				</button>
			</PopoverTrigger>
			<PopoverContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
						<div className="grid gap-1.5">
							<div>
								<p className="text-sm font-medium leading-4">Edit label</p>
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
							<Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<Button
								type="button"
								variant="destructive"
								size="sm"
								onClick={handleRemove}
								disabled={remove.isPending || update.isPending}
							>
								Delete
							</Button>
							<Button type="submit" size="sm" disabled={update.isPending || remove.isPending}>
								Save
								{update.isPending ? <Spinner /> : null}
							</Button>
						</div>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
};
