import { FavoritesContent } from "@/components/favorites/favorites-content";
import { getCachedServices } from "@/data/lib/services/cached-service-repository";

export default async function FavoritesPage() {
  const services = await getCachedServices();

  return <FavoritesContent services={services} />;
}
