import { Container } from "@/shared/ui/container";

const brands = ["Mercedes-Benz", "BMW", "Audi", "Porsche", "McLaren", "Ferrari", "Lamborghini", "Bentley"];

export function Brands() {
    return (
        <section className="border-t border-white/10 py-12">
            <Container>
                <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:gap-16">
                    {brands.map((brand) => (
                        <div key={brand} className="text-xl font-bold text-white/50 hover:text-white">
                            {brand}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
