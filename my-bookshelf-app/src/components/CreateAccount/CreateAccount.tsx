import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/untitled-components/base/buttons/button";
import { Input } from "@/untitled-components/base/input/input";
import { Label } from "@/untitled-components/base/input/label";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:8000/my-bookshelf/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error((await response.text()) || "Sign-up failed.");
            }

            navigate("/sign-in", {
                replace: true,
                state: { message: "Account created. Check your email and verify your address before signing in." },
            });
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Sign-up failed.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="min-h-screen bg-primary px-4 py-12 sm:bg-secondary md:px-8 md:pt-24">
            <div className="flex w-full flex-col gap-6 bg-primary sm:mx-auto sm:max-w-110 sm:rounded-2xl sm:px-10 sm:py-8 sm:shadow-sm">
                <div className="flex flex-col gap-2">
                    <h1 className="text-display-md font-semibold text-primary">Create your account</h1>
                    <p className="text-md text-tertiary">Sign up to start building your bookshelf.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            isRequired
                            autoComplete="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={setEmail}
                        />

                        <Label>Password</Label>
                        <Input
                            type="password"
                            isRequired
                            autoComplete="new-password"
                            value={password}
                            placeholder="Create password"
                            onChange={setPassword}
                        />

                        <Label>Confirm password</Label>
                        <Input
                            type="password"
                            isRequired
                            autoComplete="new-password"
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={setConfirmPassword}
                        />
                    </div>

                    {error && <p role="alert" className="text-sm text-error-primary">{error}</p>}

                    <Button type="submit" className="login-btn" isDisabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <Button href="/sign-in" color="link-color" size="md">
                    Already have an account? Sign in
                </Button>
            </div>
        </section>
    );
}