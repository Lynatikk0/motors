"use client";

import { Button } from "@/shared/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/ui/container";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials");
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <Container>
                <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-card p-8">
                    <h1 className="mb-6 text-2xl font-bold text-center text-white">Admin Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Username</label>
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <Button className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
