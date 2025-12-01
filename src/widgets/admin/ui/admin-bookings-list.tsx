"use client";

import { useEffect, useState } from "react";
import { Car } from "@/entities/car/model/types";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

export interface TestDrive {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    carId: string | null;
    car: Car | null;
    createdAt: string;
    status: string;
    isRead: boolean;
}

import { Button } from "@/shared/ui/button";
import { Check, Eye } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface AdminBookingListProps {
    bookings: TestDrive[];
    onUpdate?: () => void;
}

export function AdminBookingList({ bookings, onUpdate }: AdminBookingListProps) {
    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const body: any = { id, status };
            if (status === "PROCESSED") {
                body.isRead = true;
            }

            await fetch("/api/test-drive", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            onUpdate?.();
        } catch (error) {
            console.error("Failed to update status");
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await fetch("/api/test-drive", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, isRead: true }),
            });
            onUpdate?.();
        } catch (error) {
            console.error("Failed to mark as read");
        }
    };

    if (bookings.length === 0) {
        return <div className="text-muted-foreground">Žádné rezervace.</div>;
    }

    return (
        <div className="rounded-xl border border-white/10 bg-card">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="border-b border-white/10 text-xs uppercase text-white">
                        <tr>
                            <th className="px-4 py-3">Datum</th>
                            <th className="px-4 py-3">Stav</th>
                            <th className="px-4 py-3">Jméno</th>
                            <th className="px-4 py-3">Kontakt</th>
                            <th className="px-4 py-3">Vůz</th>
                            <th className="px-4 py-3 text-right">Akce</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                className={cn(
                                    "hover:bg-white/5 transition-colors",
                                    !booking.isRead && "bg-blue-500/10 hover:bg-blue-500/20"
                                )}
                            >
                                <td className="px-4 py-3">
                                    {format(new Date(booking.createdAt), "d. MMMM yyyy HH:mm", { locale: cs })}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={cn(
                                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                        booking.status === "PROCESSED"
                                            ? "bg-green-400/10 text-green-400 ring-green-400/20"
                                            : "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20"
                                    )}>
                                        {booking.status === "PROCESSED" ? "Vyřešeno" : "Nové"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-white">
                                    {booking.name}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col">
                                        <span>{booking.phone}</span>
                                        <span className="text-xs opacity-70">{booking.email}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {booking.car ? (
                                        <span className="text-primary">
                                            {booking.car.brand} {booking.car.model}
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground italic">Neznámý vůz</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end space-x-2">
                                        {!booking.isRead && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Označit jako přečtené"
                                                onClick={() => handleMarkAsRead(booking.id)}
                                            >
                                                <Eye className="h-4 w-4 text-blue-400" />
                                            </Button>
                                        )}
                                        {booking.status !== "PROCESSED" && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Označit jako vyřešené"
                                                onClick={() => handleStatusUpdate(booking.id, "PROCESSED")}
                                            >
                                                <Check className="h-4 w-4 text-green-400" />
                                            </Button>
                                        )}
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
