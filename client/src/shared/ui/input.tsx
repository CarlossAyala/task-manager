import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";
