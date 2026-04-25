"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { selectFavorites } from "@/store/favoritesSlice";
import { toggleFavorite } from "@/store/favoritesSlice";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { HeartOutlined } from "@ant-design/icons";

export default function FavoritesPage() {
  const favorites = useAppSelector(selectFavorites);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">Wishlist</h1>
      <p className="text-gray-500 text-sm mb-8">{favorites.length} saved items</p>

      {favorites.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <HeartOutlined className="text-6xl text-gray-200" />
          <p className="text-gray-400 text-lg">Your wishlist is empty</p>
          <Link href="/products" className="mt-2 bg-[#1A1A1A] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#C8A96E] transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}