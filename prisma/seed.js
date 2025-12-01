const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const MOCK_CARS = [
    {
        id: "1",
        brand: "Mercedes-Benz",
        model: "Maybach S 680",
        year: 2024,
        price: 5500000,
        engine: "V12 Biturbo",
        power: 612,
        acceleration: 4.5,
        transmission: "Automatic",
        fuel: "Petrol",
        bodyType: "Sedan",
        image: "/images/maybach.png",
        description: "The pinnacle of luxury and performance.",
        features: JSON.stringify(["Massage Seats", "Burmester 4D Sound", "Night Vision"]),
    },
    {
        id: "2",
        brand: "BMW",
        model: "M4 CSL",
        year: 2023,
        price: 4200000,
        engine: "3.0L TwinPower Turbo",
        power: 550,
        acceleration: 3.7,
        transmission: "Automatic",
        fuel: "Petrol",
        bodyType: "Coupe",
        image: "/images/m4.png",
        description: "Born for the track, legal for the road.",
        features: JSON.stringify(["Carbon Bucket Seats", "Laser Lights", "Titanium Exhaust"]),
    },
    {
        id: "3",
        brand: "McLaren",
        model: "GT",
        year: 2022,
        price: 4800000,
        engine: "4.0L V8 Twin-Turbo",
        power: 620,
        acceleration: 3.2,
        transmission: "Automatic",
        fuel: "Petrol",
        bodyType: "Coupe",
        image: "/images/mclaren.png",
        description: "Superlight Grand Tourer.",
        features: JSON.stringify(["Electrochromic Roof", "Bowers & Wilkins Audio", "Lift System"]),
    },
    {
        id: "4",
        brand: "Porsche",
        model: "911 GT3 RS",
        year: 2024,
        price: 6500000,
        engine: "4.0L Flat-6",
        power: 525,
        acceleration: 3.2,
        transmission: "PDK",
        fuel: "Petrol",
        bodyType: "Coupe",
        image: "/images/porsche.png",
        description: "Motorsport technology for the road.",
        features: JSON.stringify(["DRS", "Carbon Ceramic Brakes", "Weissach Package"]),
    },
];

async function main() {
    console.log('Start seeding ...')
    for (const car of MOCK_CARS) {
        const user = await prisma.car.upsert({
            where: { id: car.id },
            update: {},
            create: car,
        })
        console.log(`Created car with id: ${user.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
