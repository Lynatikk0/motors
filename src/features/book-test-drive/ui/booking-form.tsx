"use client";

import { Button } from "@/shared/ui/button";
import { useState } from "react";

interface BookingFormProps {
    carId?: string;
}

export function BookingForm({ carId }: BookingFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            carId,
        };

        try {
            const res = await fetch("/api/test-drive", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to submit");
            }

            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="rounded-xl border border-green-500/50 bg-green-500/10 p-6 text-center">
                <h3 className="mb-2 text-xl font-bold text-green-200">Děkujeme!</h3>
                <p className="text-green-200/80">
                    Vaše poptávka byla odeslána. Brzy se vám ozveme.
                </p>
                <Button
                    onClick={() => setSuccess(false)}
                    variant="outline"
                    className="mt-4 border-green-500/50 text-green-200 hover:bg-green-500/20"
                >
                    Odeslat další
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-white/10 bg-card p-6">
            <h3 className="mb-4 text-xl font-bold text-white">Máte zájem?</h3>
            <p className="mb-6 text-sm text-muted-foreground">
                Vyplňte formulář a my se vám ozveme s nabídkou nebo termínem testovací jízdy.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Jméno a příjmení</label>
                    <input
                        name="name"
                        required
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                        placeholder="Jan Novák"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Telefon</label>
                    <input
                        name="phone"
                        required
                        type="tel"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                        placeholder="+420 123 456 789"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Email</label>
                    <input
                        name="email"
                        type="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                        placeholder="jan@example.com"
                    />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Odesílání..." : "Odeslat poptávku"}
                </Button>
            </form>
        </div>
    );
}
