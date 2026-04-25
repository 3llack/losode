"use client";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, DeleteOutlined } from "@ant-design/icons";
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
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={e => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
            />

            {/* Wishlist btn — top right, visible on hover */}
            <button
              onClick={handleFav}
              className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isFavorite
                ? <HeartFilled className="text-[#C8A96E] text-sm" />
                : <HeartOutlined className="text-gray-600 text-sm" />}
            </button>

            {/* Add to bag — slide up on hover */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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