import { useState } from "react";
import { ChevronLeftIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Tabs,
	TabsContent,
} from "@/shared/ui";
import { BoardMenuLabels } from "./board-menu-labels";

const OPTIONS = [
	{
		tab: {
			label: "Board",
			value: "board",
		},
		menu: {
			title: "Menu",
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		},
		isRoot: true,
	},
	{
		tab: {
			label: "Labels",
			value: "labels",
		},
		menu: {
			title: "Labels",
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		},
	},
	{
		tab: {
			label: "Members",
			value: "members",
		},
		menu: {
			title: "Members",
			description: "Add or remove members from the board.",
		},
	},
];

export const BoardMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [tab, setTab] = useState<string>("board");

	const currentMenu = OPTIONS.find((o) => o.tab.value === tab);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<EllipsisVerticalIcon className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent overlay={false} className="flex flex-col gap-2 shadow-md">
				<SheetHeader className="gap-2 space-y-0">
					{!currentMenu?.isRoot ? (
						<Button variant="ghost" size="icon" onClick={() => setTab("board")} className="absolute left-2 top-2">
							<ChevronLeftIcon className="size-4" />
						</Button>
					) : null}
					<SheetTitle className="text-center">{currentMenu?.menu.title}</SheetTitle>
					<SheetDescription>{currentMenu?.menu.description}</SheetDescription>
				</SheetHeader>
				<Tabs value={tab} className="flex flex-1 flex-col">
					<TabsContent value="board">
						<div className="grid">
							{OPTIONS.filter((t) => !t.isRoot).map((t) => (
								<Button
									key={t.tab.value}
									variant="ghost"
									className="flex w-full justify-start"
									onClick={() => setTab(t.tab.value)}
								>
									{t.tab.label}
								</Button>
							))}
						</div>
					</TabsContent>
					<TabsContent value="labels">
						<BoardMenuLabels />
					</TabsContent>
					<TabsContent value="members">
						<BoardMenuLabels />
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	);
};
