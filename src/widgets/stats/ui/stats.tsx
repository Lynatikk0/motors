import { Container } from "@/shared/ui/container";

const stats = [
    { label: "Luxusních vozů", value: "200+" },
    { label: "Spokojenost klientů", value: "98%" },
    { label: "Let Dokonalosti", value: "10+" },
    { label: "Hodnocení", value: "4.8★" },
];

export function Stats() {
    return (
        <section className="border-y border-white/5 bg-black/40 py-12 backdrop-blur-sm">
            <Container>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-4xl font-bold tracking-tighter text-white md:text-5xl">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
