import { Container } from "@/shared/ui/container";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen py-12">
            <Container>
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">O nás</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Příběh vášně pro dokonalost a rychlost.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Naše Mise</h2>
                        <p className="text-muted-foreground">
                            V Apex Motors věříme, že nákup vozu není jen transakce, ale začátek nové cesty. Naším cílem je poskytovat klientům přístup k těm nejexkluzivnějším vozům na světě s servisem, který odpovídá jejich kvalitě.
                        </p>
                        <p className="text-muted-foreground">
                            Od roku 2010 jsme pomohli stovkám klientů najít jejich vysněný vůz. Specializujeme se na prémiové značky jako Mercedes-Benz, BMW, Porsche, Ferrari a další.
                        </p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-white/5 border border-white/10">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-muted-foreground">Showroom Image Placeholder</span>
                        </div>
                    </div>
                </div>

                <div className="mt-24">
                    <h2 className="mb-12 text-center text-3xl font-bold text-white">Náš Tým</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card p-6 text-center transition-colors hover:border-primary/50">
                                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-white/10" />
                                <h3 className="text-lg font-bold text-white">Jméno Příjmení</h3>
                                <p className="text-sm text-primary">Pozice</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
