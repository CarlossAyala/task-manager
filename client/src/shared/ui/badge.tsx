import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const badgeVariants = cva(
	"inline-flex items-center border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline: "text-foreground",

				member: "shrink-0 border-secondary-foreground/60 bg-secondary text-secondary-foreground hover:bg-secondary/80",

				slate: "border-slate-500 bg-slate-100 text-slate-800 shadow hover:bg-slate-200",
				gray: "border-gray-500 bg-gray-100 text-gray-800 shadow hover:bg-gray-200",
				zinc: "border-zinc-500 bg-zinc-100 text-zinc-800 shadow hover:bg-zinc-200",
				neutral: "border-neutral-500 bg-neutral-100 text-neutral-800 shadow hover:bg-neutral-200",
				stone: "border-stone-500 bg-stone-100 text-stone-800 shadow hover:bg-stone-200",
				red: "border-red-500 bg-red-100 text-red-800 shadow hover:bg-red-200",
				orange: "border-orange-500 bg-orange-100 text-orange-800 shadow hover:bg-orange-200",
				amber: "border-amber-500 bg-amber-100 text-amber-800 shadow hover:bg-amber-200",
				yellow: "border-yellow-500 bg-yellow-100 text-yellow-800 shadow hover:bg-yellow-200",
				lime: "border-lime-500 bg-lime-100 text-lime-800 shadow hover:bg-lime-200",
				green: "border-green-500 bg-green-100 text-green-800 shadow hover:bg-green-200",
				emerald: "border-emerald-500 bg-emerald-100 text-emerald-800 shadow hover:bg-emerald-200",
				teal: "border-teal-500 bg-teal-100 text-teal-800 shadow hover:bg-teal-200",
				cyan: "border-cyan-500 bg-cyan-100 text-cyan-800 shadow hover:bg-cyan-200",
				sky: "border-sky-500 bg-sky-100 text-sky-800 shadow hover:bg-sky-200",
				blue: "border-blue-500 bg-blue-100 text-blue-800 shadow hover:bg-blue-200",
				indigo: "border-indigo-500 bg-indigo-100 text-indigo-800 shadow hover:bg-indigo-200",
				violet: "border-violet-500 bg-violet-100 text-violet-800 shadow hover:bg-violet-200",
				purple: "border-purple-500 bg-purple-100 text-purple-800 shadow hover:bg-purple-200",
				fuchsia: "border-fuchsia-500 bg-fuchsia-100 text-fuchsia-800 shadow hover:bg-fuchsia-200",
				pink: "border-pink-500 bg-pink-100 text-pink-800 shadow hover:bg-pink-200",
				rose: "border-rose-500 bg-rose-100 text-rose-800 shadow hover:bg-rose-200",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
