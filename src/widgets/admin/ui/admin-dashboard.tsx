"use client";

import { Container } from "@/shared/ui/container";
import { AdminCarList } from "@/widgets/admin/ui/admin-car-list";
import { AdminBookingList, TestDrive } from "@/widgets/admin/ui/admin-bookings-list";
import { BookingsChart } from "@/widgets/admin/ui/bookings-chart";
import { PopularCarsChart } from "@/widgets/admin/ui/popular-cars-chart";
import { StatsCard } from "@/shared/ui/stats-card";
import { Button } from "@/shared/ui/button";
import { Calendar, Car as CarIcon, Users, TrendingUp, LayoutDashboard, List, LogOut } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { NotificationBell } from "@/widgets/admin/ui/notification-bell";
import { signOut } from "next-auth/react";

interface AdminDashboardProps {
    user?: {
        name?: string | null;
        email?: string | null;
    };
}

export function AdminDashboard({ user }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<"cars" | "bookings">("bookings");
    const [bookings, setBookings] = useState<TestDrive[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookings = useCallback(async () => {
        try {
            const res = await fetch("/api/test-drive");
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();

        // Poll every 5 seconds for real-time updates
        const interval = setInterval(fetchBookings, 5000);
        return () => clearInterval(interval);
    }, [fetchBookings]);

    const totalBookings = bookings.length;
    const totalCars = new Set(bookings.map(b => b.carId).filter(Boolean)).size;
    const activeBookings = bookings.filter(b => b.status !== "PROCESSED").length;

    return (
        <div className="min-h-screen py-12">
            <Container>
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter text-white">Admin Panel</h1>
                        <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                            <span>Vítejte, <span className="text-white font-medium">{user?.name || "Admin"}</span></span>
                            <NotificationBell />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={activeTab === "bookings" ? "default" : "outline"}
                            onClick={() => setActiveTab("bookings")}
                            className={activeTab === "bookings" ? "" : "border-white/10 text-white hover:bg-white/10"}
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Přehled
                        </Button>
                        <Button
                            variant={activeTab === "cars" ? "default" : "outline"}
                            onClick={() => setActiveTab("cars")}
                            className={activeTab === "cars" ? "" : "border-white/10 text-white hover:bg-white/10"}
                        >
                            <List className="mr-2 h-4 w-4" />
                            Vozy
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {activeTab === "bookings" && (
                    <div className="space-y-8">
                        {/* KPI Cards */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                title="Celkem rezervací"
                                value={totalBookings}
                                icon={Calendar}
                                description="Všechny poptávky"
                            />
                            <StatsCard
                                title="Unikátní vozy"
                                value={totalCars}
                                icon={CarIcon}
                                description="Počet žádaných modelů"
                            />
                            <StatsCard
                                title="Aktivní poptávky"
                                value={activeBookings}
                                icon={TrendingUp}
                                description="Ke zpracování"
                            />
                            <StatsCard
                                title="Zákazníci"
                                value={totalBookings}
                                icon={Users}
                                description="Celkový počet kontaktů"
                            />
                        </div>

                        {/* Charts */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <div className="col-span-4">
                                <BookingsChart data={bookings} />
                            </div>
                            <div className="col-span-3">
                                <PopularCarsChart data={bookings} />
                            </div>
                        </div>

                        {/* Recent Bookings List */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-white">Poslední rezervace</h2>
                            <AdminBookingList bookings={bookings} onUpdate={fetchBookings} />
                        </div>
                    </div>
                )}

                {activeTab === "cars" && (
                    <AdminCarList />
                )}
            </Container>
        </div>
    );
}
