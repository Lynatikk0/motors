import { CarDetails } from "@/entities/car/ui/car-details";
import { Container } from "@/shared/ui/container";
import { notFound } from "next/navigation";

interface CarPageProps {
    params: Promise<{ id: string }>;
}

export default async function CarPage(props: CarPageProps) {
    const params = await props.params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    let car = null;
    try {
        const res = await fetch(`${apiUrl}/api/cars/${params.id}`, {
            cache: "no-store",
        });
        if (res.ok) {
            car = await res.json();
        }
    } catch (error) {
        console.error("Error fetching car:", error);
    }

    if (!car) {
        notFound();
    }

    return (
        <div className="min-h-screen py-12">
            <Container>
                <CarDetails car={car} />
            </Container>
        </div>
    );
}
