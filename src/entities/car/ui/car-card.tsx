"use strict";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/entities/car/model/types";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Gauge, Zap, Calendar } from "lucide-react";

interface CarCardProps {
    car: Car;
    className?: string;
}

export function CarCard({ car, className }: CarCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-white/10 bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
                className
            )}
        >
            {/* Image Container */}
            <div className="relative aspect-[16/9] overflow-hidden bg-black/50">
                {/* Placeholder for actual image if not available */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-muted-foreground">
                    {/* In a real app, we would use next/image here. Using a colored block for now if image fails or is placeholder */}
                    <span className="text-xs">Image: {car.model}</span>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{car.brand} {car.model}</h3>
                    <p className="text-sm text-primary">{car.year}</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div className="flex flex-col items-center gap-1 rounded-md bg-white/5 p-2">
                        <Gauge className="h-4 w-4 text-primary" />
                        <span>{car.power} HP</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-md bg-white/5 p-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>{car.acceleration}s</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-md bg-white/5 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{car.year}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-white">
                        {new Intl.NumberFormat("cs-CZ", {
                            style: "currency",
                            currency: "CZK",
                            maximumFractionDigits: 0,
                        }).format(car.price)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href={`/catalog/${car.id}`}>Detail</Link>
                    </Button>
                    <Button className="w-full">Rezervovat</Button>
                </div>
            </div>
        </div>
    );
}
