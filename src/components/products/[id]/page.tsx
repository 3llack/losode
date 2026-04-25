import { fetchProductById } from "@/lib/api";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/products/ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await fetchProductById(Number(params.id));
    return {
      title: product.title,
      description: `${product.title} - $${product.price}`,
      openGraph: {
        title: product.title,
        description: `Buy ${product.title} for $${product.price}`,
        images: [product.images?.[0]?.replace(/[\[\]"]/g, "") ?? "/og-image.png"],
      },
    };
  } catch {
    return { title: "Product | Losode" };
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}