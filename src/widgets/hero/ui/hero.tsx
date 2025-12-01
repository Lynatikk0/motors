"use client"; // Convert to client component for animations
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/shared/ui/fade-in";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-16">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute top-[40%] right-[0%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
            </div>

            <Container className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-8">
                    <FadeIn delay={0.1}>
                        <h1 className="text-5xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
                            Zažijte <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
                                Sílu.
                            </span>
                            <br />
                            Zažijte Apex.
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                            Objevte pečlivě vybranou kolekci výkonných a luxusních vozů – kde se
                            inženýrská dokonalost setkává s nadčasovým designem.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="text-base" asChild>
                                <Link href="/catalog">
                                    Prozkoumat nabídku <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-base" asChild>
                                <Link href="/contacts">Rezervovat test. jízdu</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn delay={0.4} className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                    {/* Placeholder for 3D Car Image - In real app this would be a high quality transparent PNG or 3D canvas */}
                    <div className="relative aspect-[4/3] w-full">
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <span className="text-2xl font-bold text-muted-foreground">3D Car Model Placeholder</span>
                        </div>
                        {/* Glow effect under the car */}
                        <div className="absolute -bottom-10 left-1/2 h-20 w-[80%] -translate-x-1/2 bg-primary/30 blur-[60px]" />
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
