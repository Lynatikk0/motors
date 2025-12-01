import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { CarCard } from "@/entities/car/ui/car-card";
import { MOCK_CARS } from "@/shared/const/cars";
import { ArrowRight } from "lucide-react";

export function FeaturedCars() {
    // Show only first 3 cars
    const featuredCars = MOCK_CARS.slice(0, 3);

    return (
        <section className="py-24">
            <Container>
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                            Vybrané Modely
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Exkluzivní výběr toho nejlepšího, co máme v nabídce.
                        </p>
                    </div>
                    <Button variant="ghost" className="hidden md:inline-flex" asChild>
                        <Link href="/catalog">
                            Všechny vozy <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="ghost" asChild>
                        <Link href="/catalog">
                            Všechny vozy <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
