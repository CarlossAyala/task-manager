import { useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/shared/ui";
import { CardMenuRemove } from "./card-menu-remove";
import { CardEdit } from "./card-edit";
import { cn } from "@/shared/utils";

const MODALS = {
	EDIT: "EDIT",
	REMOVE: "REMOVE",
};

export const CardMenu = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [modal, setModal] = useState<string | null>(null);

	return (
		<>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className={cn("invisible absolute right-2 top-2 h-8 w-8 group-hover:visible", isOpen ? "visible" : "")}
					>
						<EllipsisHorizontalIcon className="size-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Card</DropdownMenuLabel>
					<DropdownMenuItem onSelect={() => setModal(MODALS.EDIT)}>Edit</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setModal(MODALS.REMOVE)}>Remove</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<CardEdit open={modal === MODALS.EDIT} onOpenChange={(open) => setModal(open ? MODALS.EDIT : null)} />
			<CardMenuRemove
				open={modal === MODALS.REMOVE}
				onOpenChange={(open) => setModal(open ? MODALS.REMOVE : null)}
				onRemove={() => setIsOpen(false)}
			/>
		</>
	);
};
