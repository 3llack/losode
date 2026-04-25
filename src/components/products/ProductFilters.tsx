"use client";

import { Select, Slider } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import { FilterOutlined } from "@ant-design/icons";

interface FiltersProps {
  categoryId: number | null;
  priceRange: [number, number];
  onCategoryChange: (val: number | null) => void;
  onPriceChange: (val: [number, number]) => void;
}

export default function ProductFilters({
  categoryId,
  priceRange,
  onCategoryChange,
  onPriceChange,
}: FiltersProps) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <FilterOutlined />
        <span>Filters</span>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Category
        </label>
        <Select
          allowClear
          placeholder="All categories"
          value={categoryId ?? undefined}
          onChange={(val) => onCategoryChange(val ?? null)}
          className="w-full"
          options={categories?.map((c) => ({ label: c.name, value: c.id }))}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Price Range
        </label>
        <Slider
          range
          min={0}
          max={1000}
          value={priceRange}
          onChange={(val) => onPriceChange(val as [number, number])}
          tooltip={{ formatter: (v) => `$${v}` }}
          styles={{
            track: { backgroundColor: "#C8A96E" },
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          onCategoryChange(null);
          onPriceChange([0, 1000]);
        }}
        className="w-full text-xs text-gray-400 hover:text-[#C8A96E] transition-colors underline"
      >
        Reset filters
      </button>
    </div>
  );
}