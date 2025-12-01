import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/db";

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const car = await prisma.car.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...car,
            features: JSON.parse(car.features),
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await prisma.car.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json({ message: "Car deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const { features, ...rest } = body;

        const car = await prisma.car.update({
            where: {
                id: params.id,
            },
            data: {
                ...rest,
                features: JSON.stringify(features),
            },
        });

        return NextResponse.json({
            ...car,
            features: JSON.parse(car.features),
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
    }
}
