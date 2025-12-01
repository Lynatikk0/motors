"use client";

import { Car } from "@/entities/car/model/types";
import { Button } from "@/shared/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminCarList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCars = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/cars", { cache: "no-store" });
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            setCars(data);
        } catch (error) {
            console.error("Failed to fetch cars", error);
            setError("Nepodařilo se načíst seznam vozů. Zkuste to prosím znovu.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Opravdu chcete smazat tento vůz?")) return;

        try {
            const res = await fetch(`/api/cars/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setCars(cars.filter((car) => car.id !== id));
            } else {
                alert("Chyba při mazání vozu");
            }
        } catch (error) {
            console.error("Failed to delete car", error);
        }
    };

    if (isLoading) {
        return <div className="text-white">Načítání...</div>;
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-6 text-center">
                <p className="mb-4 text-red-200">{error}</p>
                <Button onClick={fetchCars} variant="outline" className="border-red-500/50 text-red-200 hover:bg-red-500/20">
                    Zkusit znovu
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-white/10 bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Správa vozů</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Přidat vůz
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="border-b border-white/10 text-xs uppercase text-white">
                        <tr>
                            <th className="px-4 py-3">Název</th>
                            <th className="px-4 py-3">Cena</th>
                            <th className="px-4 py-3">Rok</th>
                            <th className="px-4 py-3 text-right">Akce</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {cars.map((car) => (
                            <tr key={car.id} className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">
                                    {car.brand} {car.model}
                                </td>
                                <td className="px-4 py-3">
                                    {new Intl.NumberFormat("cs-CZ", {
                                        style: "currency",
                                        currency: "CZK",
                                        maximumFractionDigits: 0,
                                    }).format(car.price)}
                                </td>
                                <td className="px-4 py-3">{car.year}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(car.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
