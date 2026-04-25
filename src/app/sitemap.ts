import { MetadataRoute } from "next";

const BASE_URL = "https://losode.netlify.app";
const API_BASE = "https://api.escuelajs.co/api/v1";

interface Product {
  id: number;
  images: string[];
  category: { id: number } | null;
}

interface Category {
  id: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/favorites`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
  ];

  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/categories`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const categories: Category[] = await res.json();
      categoryRoutes = categories.map((cat) => ({
        url: `${BASE_URL}/products?categoryId=${cat.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch { /* skip if API unreachable */ }

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/products?limit=200`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const products: Product[] = await res.json();
      productRoutes = products
        .filter((p) => p.images?.length > 0 && p.images[0] && !p.images[0].includes("[") && p.category)
        .map((p) => ({
          url: `${BASE_URL}/products/${p.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }));
    }
  } catch { /* skip if API unreachable */ }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}