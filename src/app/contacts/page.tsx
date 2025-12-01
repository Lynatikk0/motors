import { Container } from "@/shared/ui/container";
import { BookingForm } from "@/features/book-test-drive/ui/booking-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactsPage() {
    return (
        <div className="min-h-screen py-12">
            <Container>
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">Kontakt</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Jsme tu pro vás. Navštivte nás nebo nám napište.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <ContactItem icon={MapPin} title="Adresa" content="Václavské náměstí 1, Praha 1" />
                            <ContactItem icon={Phone} title="Telefon" content="+420 123 456 789" />
                            <ContactItem icon={Mail} title="Email" content="info@apexmotors.cz" />
                            <ContactItem icon={Clock} title="Otevírací doba" content="Po-Pá: 9:00 - 18:00" />
                        </div>

                        {/* Map Placeholder */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/5 border border-white/10">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-muted-foreground">Map Placeholder</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <BookingForm />
                    </div>
                </div>
            </Container>
        </div>
    );
}

function ContactItem({ icon: Icon, title, content }: { icon: any, title: string, content: string }) {
    return (
        <div className="flex items-start space-x-4 rounded-xl border border-white/10 bg-card p-4">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm text-muted-foreground">{content}</p>
            </div>
        </div>
    );
}
