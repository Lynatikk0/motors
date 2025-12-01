import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    try {
        const where = unreadOnly ? { isRead: false } : {};

        const testDrives = await prisma.testDrive.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                car: true,
            },
        });

        return NextResponse.json(testDrives);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch test drives" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, isRead } = body;

        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        const data: any = {};
        if (status !== undefined) data.status = status;
        if (isRead !== undefined) data.isRead = isRead;

        const testDrive = await prisma.testDrive.update({
            where: { id },
            data,
        });

        return NextResponse.json(testDrive);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update test drive" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, carId } = body;

        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone are required" },
                { status: 400 }
            );
        }

        const testDrive = await prisma.testDrive.create({
            data: {
                name,
                phone,
                email,
                carId,
            },
        });

        return NextResponse.json(testDrive);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to book test drive" },
            { status: 500 }
        );
    }
}
