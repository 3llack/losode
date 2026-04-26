"use client";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToCart, removeFromCart, selectIsInCart } from "@/store/cartSlice";
import { toggleFavorite, selectIsFavorite } from "@/store/favoritesSlice";
import { message } from "antd";

interface Props { product: Product; }

function getValidImage(images: string[]): string {
  if (!images?.length) return "/placeholder.png";
  const img = images.find(i => {
    if (!i) return false;
    const c = i.replace(/[\[\]"]/g, "");
    return (c.startsWith("http") || c.startsWith("/")) && !c.includes("placeimg");
  });
  return img ? img.replace(/[\[\]"]/g, "") : "/placeholder.png";
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector(selectIsInCart(product.id));
  const isFavorite = useAppSelector(selectIsFavorite(product.id));
  const [messageApi, contextHolder] = message.useMessage();

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      messageApi.info("Removed from bag");
    } else {
      dispatch(addToCart(product));
      messageApi.success("Added to bag");
    }
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    dispatch(toggleFavorite(product));
    messageApi.success(isFavorite ? "Removed from wishlist" : "Saved to wishlist");
  };

  const imageUrl = getValidImage(product.images);

  return (
    <>
      {contextHolder}
      <Link href={`/products/${product.id}`} className="group block">
        <div className="bg-white border border-gray-100 hover:border-gray-300 transition-colors duration-200">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={e => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
            />

            {/* ── DESKTOP HOVER CONTROLS (md+) ── */}
            {/* Wishlist btn — top right, visible on hover */}
            <button
              onClick={handleFav}
              className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
            >
              {isFavorite
                ? <HeartFilled className="text-[#C8A96E] text-sm" />
                : <HeartOutlined className="text-gray-600 text-sm" />}
            </button>

            {/* Add to bag — slide up on hover */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
              <button
                onClick={handleCart}
                className={`w-full py-3 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
                  isInCart
                    ? "bg-white text-red-500 border-t border-red-200 hover:bg-red-500 hover:text-white"
                    : "bg-[#1A1A1A] text-white hover:bg-[#C8A96E]"
                }`}
              >
                {isInCart ? <><DeleteOutlined /> Remove</> : <><ShoppingCartOutlined /> Add to Bag</>}
              </button>
            </div>

            {/* ── MOBILE / TABLET PERMANENT CONTROLS (below md) ── */}
            {/* Heart — bottom left */}
            <button
              onClick={handleFav}
              aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
              className="absolute bottom-2 left-2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center md:hidden active:scale-95 transition-transform"
              style={{ touchAction: "manipulation" }}
            >
              {isFavorite
                ? <HeartFilled style={{ fontSize: 15, color: "#C8A96E" }} />
                : <HeartOutlined style={{ fontSize: 15, color: "#1A1A1A" }} />}
            </button>

            {/* Plus / add to cart — bottom right */}
            <button
              onClick={handleCart}
              aria-label={isInCart ? "Remove from bag" : "Add to bag"}
              className={`absolute bottom-2 right-2 w-9 h-9 rounded-full shadow flex items-center justify-center md:hidden active:scale-95 transition-transform ${
                isInCart ? "bg-red-500 text-white" : "bg-[#1A1A1A] text-white"
              }`}
              style={{ touchAction: "manipulation" }}
            >
              {isInCart
                ? <DeleteOutlined style={{ fontSize: 14 }} />
                : <PlusOutlined style={{ fontSize: 14 }} />}
            </button>
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
              {product.category?.name}
            </p>
            <h3 className="text-sm font-medium text-[#1A1A1A] line-clamp-1 mb-2">
              {product.title}
            </h3>
            <p className="text-sm font-bold text-[#1A1A1A]">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}