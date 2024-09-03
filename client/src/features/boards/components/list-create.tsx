import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	RadioGroup,
	RadioGroupItem,
	Textarea,
} from "@/shared/ui";
import { createListDefaultValues, CreateListDto, createListSchema, useCreateList } from "@/features/lists";
import { COLOR_NAMES, getBgColor } from "@/shared/tailwind";
import { cn } from "@/shared/utils";
import { Spinner } from "@/shared/components";

export const ListCreate = () => {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<CreateListDto>({
		resolver: zodResolver(createListSchema),
		defaultValues: createListDefaultValues,
	});

	const { mutate, isPending } = useCreateList();

	const handleSubmit = (values: CreateListDto) => {
		mutate(values, {
			onSuccess() {
				toast.success("List created successfully");
				setIsOpen(false);
			},
		});
	};

	const color = form.watch("color");

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New List</DialogTitle>
						<DialogDescription>Create a new list to organize your board.</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
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
								name="color"
								render={({ field }) => (
									<FormItem className="space-y-0">
										<FormLabel>Color</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-wrap gap-2"
											>
												{Object.keys(COLOR_NAMES).map((_color) => {
													const bg = getBgColor(_color as keyof typeof COLOR_NAMES);

													const isActive = color === _color;

													return (
														<FormItem key={_color} className="">
															<FormControl>
																<RadioGroupItem className="sr-only" value={_color} />
															</FormControl>
															<FormLabel
																className={cn(
																	"flex items-center gap-2 rounded-md border bg-popover p-2 hover:bg-accent hover:text-accent-foreground",
																	isActive && "border-primary",
																)}
															>
																<div className={cn("size-4 shrink-0 rounded-full", bg)}>
																	{isActive ? <CheckIcon className="h-4 w-4 text-primary" /> : null}
																</div>
															</FormLabel>
														</FormItem>
													);
												})}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button type="submit" disabled={isPending}>
									Create
									{isPending && <Spinner className="ml-2" />}
								</Button>
								<Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
									Cancel
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>

			<Button variant="outline" size="icon" className="shrink-0" onClick={() => setIsOpen(true)}>
				<PlusIcon className="size-4" />
			</Button>
		</>
	);
};
