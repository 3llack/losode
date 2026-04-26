"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { message, Breadcrumb } from "antd";
import { addToCart, removeFromCart, selectIsInCart } from "@/store/cartSlice";
import { toggleFavorite, selectIsFavorite } from "@/store/favoritesSlice";
import {
  ShoppingCartOutlined, HeartOutlined, HeartFilled,
  DeleteOutlined, ArrowLeftOutlined, ShareAltOutlined,
  SafetyCertificateOutlined, CarOutlined, UndoOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function getValidImages(images: string[]): string[] {
  return (images ?? [])
    .map((i) => i?.replace(/[\[\]"]/g, "").trim())
    .filter((i) => i && i.startsWith("http") && !i.includes("placeimg"));
}

const DUMMY_RELATED = [
  { href: "/products", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80", brand: "House of Nwocha", title: "Adire Linen Co-ord Set", price: "$38,500" },
  { href: "/products", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", brand: "Style Temple Lagos", title: "Premium Ankara Blazer", price: "$52,000" },
  { href: "/products", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80", brand: "Aso-Ebi Studio", title: "Yoruba Indigo Print Shirt", price: "$29,500" },
  { href: "/products", image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=400&q=80", brand: "Uygonish Luxury", title: "Contemporary Agbada Set", price: "$67,000" },
];

export default function ProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
  });

  const isInCart = useAppSelector(selectIsInCart(product?.id ?? 0));
  const isFavorite = useAppSelector(selectIsFavorite(product?.id ?? 0));

  const handleCartToggle = () => {
    if (!product) return;
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      messageApi.info("Removed from cart");
    } else {
      dispatch(addToCart(product));
      messageApi.success("Added to cart!");
    }
  };

  const handleFavorite = () => {
    if (!product) return;
    dispatch(toggleFavorite(product));
    messageApi.success(isFavorite ? "Removed from wishlist" : "Saved to wishlist");
  };

  const handleShare = () => {
    navigator.share?.({ title: product?.title, url: window.location.href })
      ?? navigator.clipboard.writeText(window.location.href).then(() =>
        messageApi.success("Link copied!")
      );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg" />
            <div className="flex gap-2">
              {[1,2,3].map(i => <div key={i} className="w-20 h-20 bg-gray-100 rounded" />)}
            </div>
          </div>
          <div className="space-y-5 pt-4">
            <div className="h-3 bg-gray-100 rounded w-1/4" />
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-6 bg-gray-100 rounded w-1/5" />
            <div className="h-20 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <>
        {contextHolder}
        <div className="bg-[#FAFAF8] min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-6 pb-2">
            <Breadcrumb
              separator="/"
              items={[
                { title: <span onClick={() => router.push("/")} className="cursor-pointer text-gray-400 hover:text-[#C8A96E] text-xs uppercase tracking-wider">Home</span> },
                { title: <span onClick={() => router.push("/products")} className="cursor-pointer text-gray-400 hover:text-[#C8A96E] text-xs uppercase tracking-wider">Clothing</span> },
                { title: <span className="text-gray-700 text-xs uppercase tracking-wider">Item Not Found</span> },
              ]}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
              {/* LEFT: fallback image */}
              <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
                  alt="Explore similar styles on Losode"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-end pb-10 text-white text-center px-6">
                  <p className="text-xs uppercase tracking-[0.2em] mb-1 opacity-75">Similar styles available</p>
                  <p className="text-lg font-light leading-snug">Explore thousands of looks on Losode</p>
                </div>
              </div>

              {/* RIGHT: messaging + CTAs */}
              <div className="flex flex-col gap-5 lg:pt-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Losode Curated</p>

                <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug tracking-tight">
                  This item is no longer available
                </h1>

                <div className="bg-[#f5f0e8] border border-[#e8d8b8] p-4">
                  <p className="text-sm text-[#5a4a30] leading-relaxed">
                    The item you&apos;re looking for may have sold out or been removed by the designer. Browse our curated selection to find similar styles.
                  </p>
                </div>

                <div className="border-t border-gray-100" />

                {["Item Description", "Size And Fit", "Occasion", "Material And Care Info", "Returns Policy"].map((s) => (
                  <div key={s} className="border-t border-gray-200 flex justify-between items-center py-3.5 cursor-default">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">{s}</span>
                    <PlusOutlined className="text-xs text-gray-200" />
                  </div>
                ))}

                <div className="border-t border-gray-100" />

                <div className="space-y-3">
                  {[
                    { icon: <CarOutlined />, title: "Free Delivery", sub: "On orders over $50,000" },
                    { icon: <UndoOutlined />, title: "Easy Returns", sub: "Amendments & Exchanges" },
                    { icon: <SafetyCertificateOutlined />, title: "Secure Payment", sub: "SSL encrypted checkout" },
                  ].map(({ icon, title, sub }) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-[#C8A96E] text-sm">{icon}</div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{title}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <Link
                    href="/products"
                    className="w-full bg-[#1A1A1A] text-white text-sm py-3.5 text-center font-semibold tracking-widest uppercase hover:bg-[#C8A96E] transition-colors"
                  >
                    Browse All Styles
                  </Link>
                  <Link
                    href="/products?new=true"
                    className="w-full border border-[#1A1A1A] text-[#1A1A1A] text-sm py-3.5 text-center font-semibold tracking-widest uppercase hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <HeartOutlined /> Explore New In
                  </Link>
                </div>

                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#C8A96E] transition-colors mt-1 w-fit"
                >
                  <ArrowLeftOutlined /> Back to products
                </button>
              </div>
            </div>

            {/* YOU MAY ALSO BE INTERESTED */}
            <div className="mt-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
                  You May Also Be Interested In These Items
                </h2>
                <Link href="/products" className="text-sm text-gray-400 hover:text-[#1A1A1A]">›</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DUMMY_RELATED.map((item) => (
                  <Link key={item.title} href={item.href} className="group block">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{item.brand}</p>
                    <p className="text-sm text-[#1A1A1A] leading-snug line-clamp-2">{item.title}</p>
                    <p className="text-sm font-bold mt-1">{item.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const validImages = getValidImages(product.images);
  const displayImage = validImages[selectedImage] || "/placeholder.png";
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <>
      {contextHolder}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-6 pb-2">
          <Breadcrumb
            separator="/"
            items={[
              { title: <span onClick={() => router.push("/")} className="cursor-pointer text-gray-400 hover:text-[#C8A96E] text-xs uppercase tracking-wider">Home</span> },
              { title: <span onClick={() => router.push("/products")} className="cursor-pointer text-gray-400 hover:text-[#C8A96E] text-xs uppercase tracking-wider">Shop</span> },
              { title: <span className="text-gray-700 text-xs uppercase tracking-wider">{product.category?.name}</span> },
            ]}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
            {/* LEFT: Images */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              {validImages.length > 1 && (
                <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px]">
                  {validImages.map((img, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => setSelectedImage(i)}
                      onClick={() => setSelectedImage(i)}
                      className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded overflow-hidden border-2 transition-all ${
                        selectedImage === i ? "border-[#1A1A1A]" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex-1 relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={displayImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={e => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
                />
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="flex flex-col gap-5 lg:pt-2">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                {product.category?.name}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug tracking-tight">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#1A1A1A]">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-100" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">Select Size</p>
                  <button className="text-xs text-gray-400 underline hover:text-[#C8A96E]">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded border text-xs font-medium transition-all ${
                        selectedSize === size
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                          : "border-gray-200 text-gray-600 hover:border-[#1A1A1A]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  onClick={handleCartToggle}
                  className={`flex-1 flex items-center justify-center gap-2 h-12 rounded font-semibold text-sm tracking-wide transition-all ${
                    isInCart
                      ? "bg-white border-2 border-red-400 text-red-400 hover:bg-red-50"
                      : "bg-[#1A1A1A] text-white hover:bg-[#C8A96E]"
                  }`}
                >
                  {isInCart
                    ? <><DeleteOutlined /> Remove from Bag</>
                    : <><ShoppingCartOutlined /> Add to Bag</>}
                </button>
                <button
                  onClick={handleFavorite}
                  title={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
                  className={`h-12 w-12 flex items-center justify-center rounded border-2 transition-all ${
                    isFavorite
                      ? "border-[#C8A96E] text-[#C8A96E] bg-[#C8A96E]/10"
                      : "border-gray-200 text-gray-500 hover:border-[#C8A96E] hover:text-[#C8A96E]"
                  }`}
                >
                  {isFavorite ? <HeartFilled className="text-base" /> : <HeartOutlined className="text-base" />}
                </button>
                <button
                  onClick={handleShare}
                  title="Share"
                  className="h-12 w-12 flex items-center justify-center rounded border-2 border-gray-200 text-gray-500 hover:border-gray-400 transition-all"
                >
                  <ShareAltOutlined className="text-base" />
                </button>
              </div>

              {isInCart && (
                <button
                  onClick={() => router.push("/cart")}
                  className="text-center text-sm text-[#C8A96E] underline underline-offset-4 hover:text-[#b8944f]"
                >
                  View Bag →
                </button>
              )}

              <div className="border-t border-gray-100" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Details</p>
                <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
              </div>

              <div className="border-t border-gray-100" />

              <div className="space-y-3">
                {[
                  { icon: <CarOutlined />, title: "Free Delivery", sub: "On orders over $5,000" },
                  { icon: <UndoOutlined />, title: "Easy Returns", sub: "Amendments & Exchanges" },
                  { icon: <SafetyCertificateOutlined />, title: "Secure Payment", sub: "SSL encrypted checkout" },
                ].map(({ icon, title, sub }) => (
                  <div key={title} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-[#C8A96E] text-sm">{icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{title}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#C8A96E] transition-colors mt-2 w-fit"
              >
                <ArrowLeftOutlined /> Back to products
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}