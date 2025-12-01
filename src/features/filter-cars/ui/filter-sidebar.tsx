"use client";

import { Button } from "@/shared/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Local state for immediate UI feedback (especially for range slider)
    const [price, setPrice] = useState(searchParams.get("priceMax") || "10000000");

    // Create a new URLSearchParams object to update the URL
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (name: string, value: string) => {
        router.push("/catalog?" + createQueryString(name, value));
    };

    // Debounce price update to avoid too many URL updates
    const handlePriceChange = (value: string) => {
        setPrice(value);
    };

    const applyPriceFilter = () => {
        handleFilterChange("priceMax", price);
    };

    return (
        <div className="w-full space-y-6 rounded-xl border border-white/10 bg-card p-6 lg:w-64">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Filtrovat</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Značka</label>
                        <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                            value={searchParams.get("brand") || ""}
                            onChange={(e) => handleFilterChange("brand", e.target.value)}
                        >
                            <option value="">Všechny značky</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                            <option value="BMW">BMW</option>
                            <option value="Audi">Audi</option>
                            <option value="Porsche">Porsche</option>
                            <option value="McLaren">McLaren</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Cena do</label>
                        <input
                            type="range"
                            min="1000000"
                            max="10000000"
                            step="100000"
                            className="w-full accent-primary"
                            value={price}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            onMouseUp={applyPriceFilter} // Apply on release
                            onTouchEnd={applyPriceFilter}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{(parseInt(price) / 1000000).toFixed(1)} mil.</span>
                            <span>10 mil.</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Rok výroby</label>
                        <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                            value={searchParams.get("year") || ""}
                            onChange={(e) => handleFilterChange("year", e.target.value)}
                        >
                            <option value="">Všechny roky</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                </div>
            </div>
            <Button className="w-full" onClick={() => router.push("/catalog")}>
                Resetovat filtry
            </Button>
        </div>
    );
}
