import { Car } from "@/entities/car/model/types";
import { MOCK_CARS } from "@/shared/const/cars";

export interface FilterParams {
    brand?: string;
    priceMax?: string;
    year?: string;
}

export function getFilteredCars(params: FilterParams): Car[] {
    let filtered = [...MOCK_CARS];

    if (params.brand) {
        filtered = filtered.filter((car) => car.brand === params.brand);
    }

    if (params.priceMax) {
        const maxPrice = parseInt(params.priceMax);
        if (!isNaN(maxPrice)) {
            filtered = filtered.filter((car) => car.price <= maxPrice);
        }
    }

    if (params.year) {
        const year = parseInt(params.year);
        if (!isNaN(year)) {
            filtered = filtered.filter((car) => car.year === year);
        }
    }

    return filtered;
}
