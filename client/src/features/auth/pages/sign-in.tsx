import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	Button,
	buttonVariants,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@/shared/ui";
import { Spinner } from "@/shared/components";
import { SignInDto } from "../types";
import { baseSignInSchema, signInDefaultValues } from "../schemas";
import { useSignIn } from "../queries";

export const SignIn = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const form = useForm<SignInDto>({
		resolver: zodResolver(baseSignInSchema),
		defaultValues: signInDefaultValues,
	});

	const signIn = useSignIn();

	const handleSubmit = (values: SignInDto) => {
		signIn.mutate(values, {
			onSuccess() {
				toast.success("Signed in successfully");

				const to = location.state?.from?.pathname || "/app";
				navigate(to);
			},
		});
	};

	return (
		<main className="container mx-auto flex h-full max-w-none flex-col items-center justify-center gap-6 sm:max-w-md">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-semibold">Sign in</h1>
				<p className="text-balance text-sm text-muted-foreground">Enter your email below to sign in to your account</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="m@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full uppercase" disabled={signIn.isPending}>
						Sign in
						{signIn.isPending && <Spinner className="ml-2" />}
					</Button>
				</form>
			</Form>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/signup" className={buttonVariants({ variant: "link", size: "flat" })}>
					Sign up
				</Link>
			</div>
		</main>
	);
};
