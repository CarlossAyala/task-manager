import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
	Button,
	buttonVariants,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui";
import { BoardCreateForm } from "../components/board-create-form";
import { useGetBoards } from "../queries";

export const Boards = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: boards, error, isPending, isError } = useGetBoards();

	return (
		<Fragment>
			<section className="flex items-center gap-4">
				<h1 className="text-2xl font-bold">Boards</h1>
				<Button size="icon" onClick={() => setIsOpen(true)}>
					<PlusIcon className="size-4" />
				</Button>
			</section>

			<section>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Description</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isPending ? (
							<TableRow>
								<TableCell colSpan={2}>Loading...</TableCell>
							</TableRow>
						) : isError ? (
							<TableRow>
								<TableCell colSpan={2}>Error: {error.message}</TableCell>
							</TableRow>
						) : boards.length === 0 ? (
							<TableRow>
								<TableCell colSpan={2}>No boards found</TableCell>
							</TableRow>
						) : (
							boards.map((board) => (
								<TableRow key={board.id}>
									<TableCell className="font-medium">
										<Link to={`/app/boards/${board.id}`} className={buttonVariants({ variant: "link", size: "flat" })}>
											{board.name}
										</Link>
									</TableCell>
									<TableCell>{board.description}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</section>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create board</DialogTitle>
						<DialogDescription className="sr-only" />
					</DialogHeader>
					<BoardCreateForm />
				</DialogContent>
			</Dialog>
		</Fragment>
	);
};
