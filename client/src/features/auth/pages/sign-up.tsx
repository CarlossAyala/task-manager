import { Link } from "react-router-dom";
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
import { signUpDefaultValues, baseSignUnSchema } from "../schemas";
import { useSignUp } from "../queries";
import { SignUpDto } from "../types";

export const SignUp = () => {
	const form = useForm<SignUpDto>({
		resolver: zodResolver(baseSignUnSchema),
		defaultValues: signUpDefaultValues,
	});

	const signup = useSignUp();

	const handleSubmit = (values: SignUpDto) => {
		signup.mutate(values, {
			onSuccess() {
				toast.success("Account created successfully");
			},
		});
	};

	return (
		<main className="container mx-auto flex h-full max-w-none flex-col items-center justify-center gap-6 sm:max-w-md">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-semibold">Sign up</h1>
				<p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full gap-3">
					<div className="grid gap-3 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input placeholder="Luke" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input placeholder="Skywalker" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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

					<Button type="submit" className="mt-2 w-full uppercase">
						Sign up
					</Button>
				</form>

				<div className="text-center text-sm">
					Already have an account?{" "}
					<Link to="/signin" className={buttonVariants({ variant: "link", size: "flat" })}>
						Sign in
					</Link>
				</div>
			</Form>
		</main>
	);
};
