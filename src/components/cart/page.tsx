"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { Button, Empty, InputNumber, Popconfirm } from "antd";
import {
  DeleteOutlined,
  ShoppingOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

function getValidImage(images: string[]): string {
  const img = images?.find(
    (i) => i && !i.includes("[") && (i.startsWith("http") || i.startsWith("/"))
  );
  return img || "/placeholder.png";
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-gray-400">Your cart is empty</span>
          }
        />
        <Link href="/products">
          <Button
            type="primary"
            size="large"
            icon={<ShoppingOutlined />}
            className="mt-6 h-12 px-8 rounded-full font-semibold"
            style={{ backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" }}
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[#C8A96E] uppercase tracking-widest mb-1">
            Your Bag
          </p>
          <h1 className="font-display text-3xl font-bold text-[#1A1A1A]">
            Shopping Cart
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Popconfirm
          title="Clear all items?"
          description="This will remove everything from your cart."
          onConfirm={() => dispatch(clearCart())}
          okText="Yes, clear"
          cancelText="Cancel"
          okButtonProps={{
            style: { backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" },
          }}
        >
          <button className="text-sm text-gray-400 hover:text-red-400 transition-colors underline">
            Clear cart
          </button>
        </Popconfirm>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:border-[#C8A96E]/30 transition-colors"
            >
              {/* Image */}
              <Link
                href={`/products/${item.product.id}`}
                className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-50"
              >
                <Image
                  src={getValidImage(item.product.images)}
                  alt={item.product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="96px"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#C8A96E] font-medium uppercase tracking-wider mb-1">
                  {item.product.category?.name}
                </p>
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-[#C8A96E] transition-colors">
                    {item.product.title}
                  </h3>
                </Link>
                <p className="text-base font-bold text-[#1A1A1A] mt-1">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity + Delete */}
              <div className="flex flex-col items-end justify-between gap-2">
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <DeleteOutlined />
                </button>

                <div className="flex items-center gap-2">
                  <InputNumber
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(val) =>
                      dispatch(
                        updateQuantity({
                          productId: item.product.id,
                          quantity: val ?? 1,
                        })
                      )
                    }
                    className="w-16 text-center"
                    size="small"
                  />
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-[#1A1A1A] mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm text-gray-500"
                >
                  <span className="truncate mr-2">
                    {item.product.title.slice(0, 25)}… × {item.quantity}
                  </span>
                  <span className="flex-shrink-0 font-medium text-gray-700">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-[#1A1A1A] mt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button
                type="primary"
                size="large"
                block
                icon={<ArrowRightOutlined />}
                className="h-12 rounded-full font-semibold"
                style={{ backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" }}
              >
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/products">
              <button className="w-full text-center text-sm text-gray-400 hover:text-[#C8A96E] transition-colors mt-4 underline">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}