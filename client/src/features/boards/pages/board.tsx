import { Fragment } from "react/jsx-runtime";
import { useParams, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { BoardTab } from "../components/board-tab";
import { ListTab } from "../components/list-tab";
import { CalendarTab } from "../components/calendar-tab";
import { useGetBoard } from "../queries";

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
	const { boardId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const { data: board, error, isPending, isError } = useGetBoard(boardId!);

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
					<section>
						<h1 className="text-3xl font-medium">{board.name}</h1>
						<p className="text-muted-foreground">{board.description}</p>
					</section>

					<Tabs value={tab.value} onValueChange={setTab} className="">
						<TabsList>
							{TABS_OPTIONS.map((t) => (
								<TabsTrigger key={t.value} value={t.value}>
									{t.label}
								</TabsTrigger>
							))}
						</TabsList>
						{TABS_VALUES.map((t) => (
							<TabsContent key={t.value} value={t.value} className="mt-4">
								{t.content}
							</TabsContent>
						))}
					</Tabs>
				</>
			)}
		</Fragment>
	);
};
