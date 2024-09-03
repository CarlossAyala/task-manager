import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
	Textarea,
} from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { useCreateBoard } from "../queries";
import { IBoard, CreateBoardDto } from "../types";
import { createBoardDefaultValues, createBoardSchema } from "../schemas";

export const BoardCreateForm = ({ onCreate }: { onCreate?: (board: IBoard) => void }) => {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<CreateBoardDto>({
		resolver: zodResolver(createBoardSchema),
		defaultValues: createBoardDefaultValues,
	});

	const createBoard = useCreateBoard();

	const handleSubmit = (values: CreateBoardDto) => {
		createBoard.mutate(values, {
			onSuccess(board) {
				toast.success("Board created");
				if (onCreate) onCreate(board);
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="My board" {...field} />
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
								<Textarea placeholder="My board description" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dueDate"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Date</FormLabel>
							<Popover open={isOpen} onOpenChange={setIsOpen}>
								<FormControl>
									<PopoverTrigger asChild>
										<Button
											type="button"
											variant="outline"
											className="w-full justify-start"
											onClick={() => setIsOpen(true)}
										>
											{field.value ? (
												new Date(field.value).toLocaleDateString()
											) : (
												<span className="font-normal text-muted-foreground">Select date</span>
											)}
										</Button>
									</PopoverTrigger>
								</FormControl>

								<PopoverContent className="w-auto p-0" align="end">
									<Calendar
										mode="single"
										selected={field.value ? new Date(field.value) : undefined}
										onSelect={(value) => {
											field.onChange(value?.toISOString());
											setIsOpen(false);
										}}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="uppercase" disabled={createBoard.isPending}>
					Submit
					{createBoard.isPending && <Spinner className="ml-2" />}
				</Button>
			</form>
		</Form>
	);
};
