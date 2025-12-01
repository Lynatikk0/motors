"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useMemo } from "react";

interface PopularCarsChartProps {
    data: any[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export function PopularCarsChart({ data }: PopularCarsChartProps) {
    const chartData = useMemo(() => {
        const carCounts: Record<string, number> = {};

        data.forEach((booking) => {
            if (booking.car) {
                const carName = `${booking.car.brand} ${booking.car.model}`;
                carCounts[carName] = (carCounts[carName] || 0) + 1;
            }
        });

        return Object.entries(carCounts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Top 5
    }, [data]);

    return (
        <Card className="border-white/10 bg-card text-white">
            <CardHeader>
                <CardTitle>Populární vozy</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                                itemStyle={{ color: "#fff" }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
