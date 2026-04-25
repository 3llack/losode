import { Product, Category } from "@/types";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function fetchProducts(params?: {
  title?: string;
  categoryId?: number;
  price_min?: number;
  price_max?: number;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.title) query.set("title", params.title);
  if (params?.categoryId) query.set("categoryId", String(params.categoryId));
  if (params?.price_min !== undefined) query.set("price_min", String(params.price_min));
  if (params?.price_max !== undefined) query.set("price_max", String(params.price_max));
  if (params?.offset !== undefined) query.set("offset", String(params.offset));
  query.set("limit", String(params?.limit ?? 200));

  const res = await fetch(`${BASE_URL}/products?${query.toString()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();

  return data.filter(
    (p: Product) =>
      p.images?.length > 0 &&
      p.images[0] &&
      !p.images[0].includes("[") &&
      p.category
  );
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}