import { Fragment } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { BoardTab } from "../components/board-tab";
import { ListTab } from "../components/list-tab";
import { CalendarTab } from "../components/calendar-tab";
import { useGetBoard } from "../queries";
import { BoardMenu } from "../components/board-menu";

const TAB_KEY = "tab";
const TABS_OPTIONS = [
	{ label: "Board", value: "board" },
	{ label: "List", value: "list" },
	{ label: "Calendar", value: "calendar" },
];
const DEFAULT_TAB = TABS_OPTIONS[0];
const TABS_VALUES = [
	{
		value: "board",
		content: <BoardTab />,
	},
	{
		value: "list",
		content: <ListTab />,
	},
	{
		value: "calendar",
		content: <CalendarTab />,
	},
];

export const Board = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { data: board, error, isPending, isError } = useGetBoard();

	const getTab = (tab: string | null) => {
		if (!tab) {
			return DEFAULT_TAB;
		}
		return TABS_OPTIONS.find((t) => t.value === tab) || DEFAULT_TAB;
	};
	const setTab = (tab: string) => {
		const nextSearchParams = new URLSearchParams(searchParams);
		nextSearchParams.set(TAB_KEY, getTab(tab).value);
		setSearchParams(nextSearchParams);
	};

	const tab = getTab(searchParams.get(TAB_KEY));

	return (
		<Fragment>
			{isPending ? (
				<section>
					<p>Loading...</p>
				</section>
			) : isError ? (
				<section>
					<p>Error: {error.message}</p>
				</section>
			) : (
				<>
					<section className="flex justify-between gap-2">
						<div>
							<h1 className="text-3xl font-semibold">{board.name}</h1>
						</div>
						<div className="flex gap-2">
							<BoardMenu />
						</div>
					</section>

					<Tabs value={tab.value} onValueChange={setTab} className="flex flex-1 flex-col justify-start">
						<TabsList className="flex w-fit justify-start">
							{TABS_OPTIONS.map((t) => (
								<TabsTrigger key={t.value} value={t.value}>
									{t.label}
								</TabsTrigger>
							))}
						</TabsList>
						{TABS_VALUES.map((t) => (
							<TabsContent key={t.value} value={t.value} className="mt-5 flex-1">
								{t.content}
							</TabsContent>
						))}
					</Tabs>
				</>
			)}
		</Fragment>
	);
};
