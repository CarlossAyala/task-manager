import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	buttonVariants,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
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
import { Spinner } from "@/shared/components";
import { IList, UpdateListDto, updateListSchema, useRemoveList, useUpdateList } from "@/features/lists";
import { COLORS_NAME, getBgColor } from "@/shared/tailwind";
import { cn } from "@/shared/utils";

enum Modals {
	Menu = "menu",
	Edit = "edit",
	Remove = "remove",
}

export const ListActions = ({ list }: { list: IList }) => {
	const [modals, setModals] = useState<Modals | null>(null);

	const remove = useRemoveList();
	const update = useUpdateList();

	const form = useForm<UpdateListDto>({
		resolver: zodResolver(updateListSchema),
		values: updateListSchema.safeParse(list).data,
	});

	const handleUpdate = (values: UpdateListDto) => {
		update.mutate(
			{
				listId: list.id,
				values,
			},
			{
				onSuccess() {
					setModals(null);
					toast.success("List updated");
				},
			},
		);
	};

	const handleRemoveList = () => {
		remove.mutate(list.id, {
			onSuccess() {
				setModals(null);
				toast.success("List removed");
			},
		});
	};

	return (
		<>
			<DropdownMenu open={modals === Modals.Menu} onOpenChange={() => setModals(null)}>
				<DropdownMenuTrigger asChild onClick={() => setModals(Modals.Menu)}>
					<Button variant="ghost" size="icon">
						<span className="sr-only">Open menu</span>
						<EllipsisVerticalIcon className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Cards</DropdownMenuLabel>
					<DropdownMenuItem>Remove all</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuLabel>List</DropdownMenuLabel>
					<DropdownMenuItem onSelect={() => setModals(Modals.Edit)}>Edit</DropdownMenuItem>
					<DropdownMenuItem
						disabled={remove.isPending}
						onSelect={(e) => {
							e.preventDefault();
							handleRemoveList();
						}}
					>
						Remove
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={modals === Modals.Remove} onOpenChange={() => setModals(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your list.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							disabled={remove.isPending}
							onClick={handleRemoveList}
							className={cn(buttonVariants({ variant: "destructive" }), "gap-2")}
						>
							Remove
							{remove.isPending && <Spinner className="-mb-px" />}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Dialog open={modals === Modals.Edit} onOpenChange={() => setModals(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit List</DialogTitle>
						<DialogDescription>Edit the list details.</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleUpdate)} className="grid gap-4">
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
											<RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-2">
												{Object.keys(COLORS_NAME).map((color) => {
													const bg = getBgColor(color as keyof typeof COLORS_NAME);

													const isActive = form.watch("color") === color;

													return (
														<FormItem key={color} className="">
															<FormControl>
																<RadioGroupItem className="sr-only" value={color} />
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
								<Button type="submit" disabled={update.isPending}>
									Update
									{update.isPending && <Spinner className="ml-2" />}
								</Button>
								<Button type="button" variant="outline" onClick={() => setModals(null)}>
									Cancel
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
};
