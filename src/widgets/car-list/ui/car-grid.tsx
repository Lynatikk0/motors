import { Car } from "@/entities/car/model/types";
import { CarCard } from "@/entities/car/ui/car-card";

interface CarGridProps {
    cars: Car[];
}

export function CarGrid({ cars }: CarGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
}
