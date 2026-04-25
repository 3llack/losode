"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import Link from "next/link";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

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
      {/* Hero */}
      {/* <section className="relative bg-[#1A1A1A] text-white overflow-hidden"> */}
      <section className="relative bg-[#1A1A1A] text-white overflow-hidden min-h-[560px] flex items-center">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#C8A96E] uppercase tracking-widest mb-4">
              New Collection 2025
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
               Dress the
              <span className="text-[#C8A96E]"> World</span>
              <br />
              Your Way
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Discover curated fashion, electronics and lifestyle products
              from the best brands — delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  className="h-14 px-8 rounded-full font-semibold text-base"
                  style={{
                    backgroundColor: "#C8A96E",
                    borderColor: "#C8A96E",
                  }}
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="large"
                  className="h-14 px-8 rounded-full font-semibold text-base border-white/20 text-white hover:border-[#C8A96E] hover:text-[#C8A96E] bg-transparent"
                >
                  View Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-[#C8A96E] uppercase tracking-widest mb-1">
              Browse
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-gray-400 hover:text-[#C8A96E] transition-colors hidden sm:flex items-center gap-1"
          >
            View all <ArrowRightOutlined />
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories?.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/products?categoryId=${category.id}`}
                className="group"
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-[#C8A96E]/40 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-[#C8A96E]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C8A96E]/20 transition-colors">
                    <span className="text-[#C8A96E] text-lg font-bold">
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-[#C8A96E] transition-colors">
                    {category.name}
                  </p>
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
            <p className="text-xs font-medium text-[#C8A96E] uppercase tracking-widest mb-1">
              Featured
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-gray-400 hover:text-[#C8A96E] transition-colors hidden sm:flex items-center gap-1"
          >
            View all <ArrowRightOutlined />
          </Link>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/products">
            <Button
              size="large"
              icon={<ArrowRightOutlined />}
              className="h-12 px-8 rounded-full font-semibold border-[#1A1A1A] text-[#1A1A1A] hover:border-[#C8A96E] hover:text-[#C8A96E]"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-[#C8A96E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Free Shipping on All Orders
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Shop with confidence — no minimum order required.
          </p>
          <Link href="/products">
            <Button
              size="large"
              className="h-12 px-8 rounded-full font-semibold bg-white text-[#C8A96E] border-white hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}