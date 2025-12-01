export interface Car {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    engine: string;
    power: number; // hp
    acceleration: number; // 0-100 km/h in seconds
    transmission: string;
    fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
    bodyType: "Sedan" | "SUV" | "Coupe" | "Convertible" | "Wagon";
    image: string;
    description: string;
    features: string[];
}
