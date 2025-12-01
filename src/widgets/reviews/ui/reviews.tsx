import { Container } from "@/shared/ui/container";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Jan Novák",
        role: "CEO, TechCorp",
        content: "Naprosto profesionální přístup. Koupě mého nového vozu byla zážitkem od začátku do konce.",
        rating: 5,
    },
    {
        id: 2,
        name: "Petra Svobodová",
        role: "Architektka",
        content: "Apex Motors nabízí vozy, které jinde nenajdete. Skvělý servis a poradenství.",
        rating: 5,
    },
    {
        id: 3,
        name: "Martin Dvořák",
        role: "Investo",
        content: "Rychlé jednání, transparentní podmínky a vůz v perfektním stavu. Doporučuji.",
        rating: 5,
    },
];

export function Reviews() {
    return (
        <section className="bg-white/5 py-24">
            <Container>
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-white md:text-4xl">
                    Co říkají naši klienti
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {reviews.map((review) => (
                        <div key={review.id} className="rounded-xl border border-white/10 bg-black/20 p-8 backdrop-blur-sm">
                            <div className="mb-4 flex text-primary">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-current" />
                                ))}
                            </div>
                            <p className="mb-6 text-muted-foreground">"{review.content}"</p>
                            <div>
                                <div className="font-bold text-white">{review.name}</div>
                                <div className="text-sm text-muted-foreground">{review.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
