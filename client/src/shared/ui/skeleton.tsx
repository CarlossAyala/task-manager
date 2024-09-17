import { cn } from "../utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("animate-pulse bg-primary/10", className)} {...props} />;
}
