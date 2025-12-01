"use client";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

const navigation = [
    { name: "Domů", href: "/" },
    { name: "Nabídka vozů", href: "/catalog" },
    { name: "O nás", href: "/about" },
    { name: "Kontakt", href: "/contacts" },
];

export function Header() {
    // const [isOpen, setIsOpen] = useState(false); // Client component needed for state, but trying to keep it simple first.
    // Converting to client component for mobile menu

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold tracking-tighter text-white">
                                APEX<span className="text-primary">MOTORS</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <Button>Rezervovat prohlídku</Button>
                    </div>

                    {/* Mobile Menu Button - Placeholder for now */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
}
