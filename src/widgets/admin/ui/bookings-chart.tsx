"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useMemo } from "react";
import { format, subDays, isSameDay, startOfDay } from "date-fns";
import { cs } from "date-fns/locale";

interface BookingsChartProps {
    data: any[];
}

export function BookingsChart({ data }: BookingsChartProps) {
    const chartData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i);
            return {
                date: date,
                label: format(date, "d.M.", { locale: cs }),
                count: 0,
            };
        });

        data.forEach((booking) => {
            const bookingDate = new Date(booking.createdAt);
            const day = last7Days.find((d) => isSameDay(d.date, bookingDate));
            if (day) {
                day.count++;
            }
        });

        return last7Days;
    }, [data]);

    return (
        <Card className="border-white/10 bg-card text-white">
            <CardHeader>
                <CardTitle>Rezervace za posledních 7 dní</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis
                                dataKey="label"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                                itemStyle={{ color: "#fff" }}
                                cursor={{ fill: "rgba(255,255,255,0.1)" }}
                            />
                            <Bar
                                dataKey="count"
                                fill="currentColor"
                                radius={[4, 4, 0, 0]}
                                className="fill-primary"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
