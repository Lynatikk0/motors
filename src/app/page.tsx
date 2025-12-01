import { Hero } from "@/widgets/hero/ui/hero";
import { Stats } from "@/widgets/stats/ui/stats";
import { FeaturedCars } from "@/widgets/car-list/ui/featured-cars";
import { Reviews } from "@/widgets/reviews/ui/reviews";
import { Brands } from "@/widgets/brands/ui/brands";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <FeaturedCars />
      <Reviews />
      <Brands />
    </div>
  );
}
