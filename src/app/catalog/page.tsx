import { Container } from "@/shared/ui/container";
import { FilterSidebar } from "@/features/filter-cars/ui/filter-sidebar";
import { CarGrid } from "@/widgets/car-list/ui/car-grid";
import { Suspense } from "react";

interface CatalogPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage(props: CatalogPageProps) {
    const searchParams = await props.searchParams;

    // Construct query string
    const params = new URLSearchParams();
    if (searchParams.brand) params.set("brand", searchParams.brand as string);
    if (searchParams.priceMax) params.set("priceMax", searchParams.priceMax as string);
    if (searchParams.year) params.set("year", searchParams.year as string);

    // Fetch data from API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    let filteredCars = [];

    try {
        const res = await fetch(`${apiUrl}/api/cars?${params.toString()}`, {
            cache: "no-store",
        });
        if (res.ok) {
            filteredCars = await res.json();
        } else {
            console.error("Failed to fetch cars:", res.statusText);
        }
    } catch (error) {
        console.error("Error fetching cars:", error);
    }

    return (
        <div className="min-h-screen py-12">
            <Container>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tighter text-white">
                        Nabídka vozů
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Prohlédněte si naši aktuální nabídku prémiových vozů.
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    <aside className="lg:w-64 flex-shrink-0">
                        <Suspense fallback={<div className="text-white">Načítání filtrů...</div>}>
                            <FilterSidebar />
                        </Suspense>
                    </aside>
                    <main className="flex-1">
                        <CarGrid cars={filteredCars} />
                    </main>
                </div>
            </Container>
        </div>
    );
}
