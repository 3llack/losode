"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import Link from "next/link";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback } from "react";


const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80&auto=format&fit=crop",
    href: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80&auto=format&fit=crop",
    href: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80&auto=format&fit=crop",
    href: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80&auto=format&fit=crop",
    href: "/products",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 60vw, 680px)" }}>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <Link
          key={i}
          href={slide.href}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img
            src={slide.image}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        </Link>
      ))}


    </section>
  );
}

export default function HomePage() {
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products", "", null, [0, 1000]],
    queryFn: () => fetchProducts({ limit: 8 }),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-[#C8A96E] uppercase tracking-widest mb-1">Browse</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Shop by Category</h2>
          </div>
          <Link href="/products" className="text-sm text-gray-400 hover:text-[#C8A96E] transition-colors hidden sm:flex items-center gap-1">
            View all <ArrowRightOutlined />
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories?.slice(0, 5).map((category) => (
              <Link key={category.id} href={`/products?categoryId=${category.id}`} className="group">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-[#C8A96E]/40 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-[#C8A96E]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C8A96E]/20 transition-colors">
                    <span className="text-[#C8A96E] text-lg font-bold">{category.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-[#C8A96E] transition-colors">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-[#C8A96E] uppercase tracking-widest mb-1">Featured</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">New Arrivals</h2>
          </div>
          <Link href="/products" className="text-sm text-gray-400 hover:text-[#C8A96E] transition-colors hidden sm:flex items-center gap-1">
            View all <ArrowRightOutlined />
          </Link>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/products">
            <Button size="large" icon={<ArrowRightOutlined />} className="h-12 px-8 rounded-full font-semibold border-[#1A1A1A] text-[#1A1A1A] hover:border-[#C8A96E] hover:text-[#C8A96E]">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-[#C8A96E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Free Shipping on All Orders</h2>
          <p className="text-white/80 mb-8 text-lg">Shop with confidence — no minimum order required.</p>
          <Link href="/products">
            <Button size="large" className="h-12 px-8 rounded-full font-semibold bg-white text-[#C8A96E] border-white hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}