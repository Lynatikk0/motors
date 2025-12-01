import { Car } from "@/entities/car/model/types";
import { Container } from "@/shared/ui/container";
import { BookingForm } from "@/features/book-test-drive/ui/booking-form";
import { Gauge, Zap, Calendar, Fuel, Settings, Activity } from "lucide-react";

interface CarDetailsProps {
    car: Car;
}

export function CarDetails({ car }: CarDetailsProps) {
    return (
        <div className="min-h-screen py-12">
            <Container>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery Placeholder */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-muted-foreground">3D View / Gallery Placeholder for {car.model}</span>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold text-white">{car.brand} {car.model}</h1>
                            <p className="mt-2 text-xl text-primary font-semibold">
                                {new Intl.NumberFormat("cs-CZ", {
                                    style: "currency",
                                    currency: "CZK",
                                    maximumFractionDigits: 0,
                                }).format(car.price)}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <SpecItem icon={Gauge} label="Výkon" value={`${car.power} HP`} />
                            <SpecItem icon={Zap} label="Zrychlení" value={`${car.acceleration}s`} />
                            <SpecItem icon={Calendar} label="Rok" value={car.year.toString()} />
                            <SpecItem icon={Fuel} label="Palivo" value={car.fuel} />
                            <SpecItem icon={Settings} label="Převodovka" value={car.transmission} />
                            <SpecItem icon={Activity} label="Karoserie" value={car.bodyType} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">Popis</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {car.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">Výbava</h3>
                            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                {car.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-muted-foreground">
                                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <BookingForm carId={car.id} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

function SpecItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <Icon className="mb-2 h-6 w-6 text-primary" />
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="font-semibold text-white">{value}</div>
        </div>
    );
}
