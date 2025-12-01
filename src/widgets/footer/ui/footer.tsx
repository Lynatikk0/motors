import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background py-12">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <span className="text-xl font-bold tracking-tighter text-white">
                            APEX<span className="text-primary">MOTORS</span>
                        </span>
                        <p className="text-sm text-muted-foreground">
                            Zažijte sílu luxusu. Pečlivě vybraná kolekce prémiových vozů pro náročné klienty.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Navigace</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary">Domů</Link></li>
                            <li><Link href="/catalog" className="hover:text-primary">Nabídka vozů</Link></li>
                            <li><Link href="/about" className="hover:text-primary">O nás</Link></li>
                            <li><Link href="/contacts" className="hover:text-primary">Kontakt</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Kontakt</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Praha, Česká republika</li>
                            <li>+420 123 456 789</li>
                            <li>info@apexmotors.cz</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Sledujte nás</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Apex Motors. Všechna práva vyhrazena.
                </div>
            </Container>
        </footer>
    );
}
