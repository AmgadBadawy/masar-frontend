import { Categories } from "@/components/home/categories";
import { FeaturedServices } from "@/components/home/featured-services";
import { Hero } from "@/components/home/hero";
import { TrustSection } from "@/components/home/trust-section";
import {
  getCachedCategories,
  getCachedServices,
} from "@/data/lib/services/cached-service-repository";

export const revalidate = 300;

export default async function HomePage() {
  const [categories, services] = await Promise.all([
    getCachedCategories(),
    getCachedServices(),
  ]);

  return (
    <main>
      <Hero />
      <Categories categories={categories} />
      <FeaturedServices services={services} />
      <TrustSection />
    </main>
  );
}
