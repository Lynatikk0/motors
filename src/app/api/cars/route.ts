import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const priceMax = searchParams.get("priceMax");
    const year = searchParams.get("year");

    const where: any = {};

    if (brand) {
        where.brand = brand;
    }

    if (priceMax) {
        where.price = {
            lte: parseInt(priceMax),
        };
    }

    if (year) {
        where.year = parseInt(year);
    }

    try {
        const cars = await prisma.car.findMany({
            where,
        });

        // Parse features from JSON string
        const parsedCars = cars.map((car: any) => ({
            ...car,
            features: JSON.parse(car.features),
        }));

        return NextResponse.json(parsedCars);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { features, ...rest } = body;

        const car = await prisma.car.create({
            data: {
                ...rest,
                features: JSON.stringify(features),
            },
        });

        return NextResponse.json(car);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
    }
}
