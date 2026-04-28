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

      {/* Redesigned Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-6">
            Discover Fashion Without Limits,<br className="hidden md:block" /> 
            from Signature Pieces to Sustainable Statements.
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg leading-relaxed">
            Explore a world of style with hundreds of extravagant designers offering everything from 
            subtle, sophisticated pieces to vibrant colors and daring, elaborate designs. 
            Whether you are seeking timeless elegance or eye-catching fashion, 
            we connect you with exclusive collections.
          </p>
          <div className="mt-10">
              <Link 
                href="/products" 
                className="inline-block bg-black text-white px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all duration-300"
              >
                Shop Now
              </Link>
          </div>
        </div>
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
          <p className="text-white/80 mb-8 text-lg">Shop with confidence - no minimum order required.</p>
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