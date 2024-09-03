import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn, SignUp } from "./features/auth";
import { Landing } from "./features/landing";
import { AppLayout } from "./shared/layouts";
import { Board, Boards } from "./features/boards";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/app",
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: "Home",
			},
			{
				path: "boards",
				element: <Boards />,
			},
			{
				path: "boards/:boardId",
				element: <Board />,
			},
		],
	},
	{
		path: "/signin",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
]);

export const Routes = () => {
	return <RouterProvider router={routes} />;
};
