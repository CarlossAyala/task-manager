import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { LoadingPage } from "../components";

export const AppLayout = () => {
	const location = useLocation();

	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}

	return (
		<main className="grid h-full md:grid-cols-5">
			<aside className="col-span-1">
				<ol>
					{[
						{
							name: "Home",
							to: "/app",
						},
						{
							name: "Boards",
							to: "/app/boards",
						},
					].map((item) => (
						<li key={item.name}>
							<Link to={item.to}>{item.name}</Link>
						</li>
					))}
				</ol>
			</aside>
			<div className="col-span-4 flex flex-col gap-4 border-l px-4 py-6 lg:px-8">
				<Outlet />
			</div>
		</main>
	);
};
