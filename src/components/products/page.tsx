"use client";
import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import ProductFilters from "@/components/products/ProductFilters";
import { Pagination } from "antd";
import { useDebounce } from "use-debounce";

const PAGE_SIZE = 12;

function ProductsContent() {
  const searchParams = useSearchParams();

  const [categoryId, setCategoryId] = useState<number | null>(
    searchParams.get("category") ? Number(searchParams.get("category")) : null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [page, setPage] = useState(1);

  const rawSearch = searchParams.get("search") ?? "";
  const [debouncedSearch] = useDebounce(rawSearch, 300);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get("category");
    setCategoryId(cat ? Number(cat) : null);
    setPage(1);
  }, [searchParams]);

  const { data: allProducts = [], isLoading, isError } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts({ limit: 200 }),
    staleTime: 60_000,
  });

  const filtered = useMemo(() => {
    let result = allProducts;

    if (categoryId) {
      result = result.filter((p) => p.category?.id === categoryId);
    }

    // Only apply price filter if user moved the slider (default is [0,1000])
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      result = result.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allProducts, categoryId, priceRange, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  if (isError) {
    return (
      <div className="text-center py-20 text-red-400">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">All Products</h1>
        <p className="text-gray-500 mt-1 text-sm">
          {isLoading ? "Loading..." : `${filtered.length} items found`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <ProductFilters
            categoryId={categoryId}
            priceRange={priceRange}
            onCategoryChange={(id) => { setCategoryId(id); setPage(1); }}
            onPriceChange={(range) => { setPriceRange(range); setPage(1); }}
          />
        </aside>

        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-3">
              <p className="text-gray-400 text-lg">No products found.</p>
              <button
                onClick={() => {
                  setCategoryId(null);
                  setPriceRange([0, 1000]);
                }}
                className="text-sm text-[#C8A96E] underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {filtered.length > PAGE_SIZE && (
                <div className="mt-10 flex justify-center">
                  <Pagination
                    current={page}
                    pageSize={PAGE_SIZE}
                    total={filtered.length}
                    onChange={(p) => {
                      setPage(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}