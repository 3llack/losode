"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/cartSlice";
import { usePaystackPayment } from "react-paystack";
import {
  CheckCircleFilled,
  ShoppingOutlined,
  LockOutlined,
} from "@ant-design/icons";


function OrderConfirmation({
  reference,
  email,
  total,
}: {
  reference: string;
  email: string;
  total: number;
}) {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#C8A96E]/10 flex items-center justify-center">
            <CheckCircleFilled style={{ fontSize: 44, color: "#C8A96E" }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2 font-display">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Thank you! A receipt has been sent to{" "}
          <span className="font-semibold text-gray-700">{email}</span>.
        </p>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-left mb-8 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Reference</span>
              <span className="font-mono text-xs text-gray-600 break-all max-w-[60%] text-right">
                {reference}
              </span>
            </div>
            <div className="border-t border-gray-50" />
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-700">Total paid</span>
              <span className="text-[#1A1A1A]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/products")}
            className="w-full h-12 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-[#C8A96E] transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => router.push("/favorites")}
            className="w-full h-12 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
          >
            View Saved Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");

  const [confirmed, setConfirmed] = useState(false);
  const [paidRef, setPaidRef] = useState("");

  const paystackConfig = {
    email: email || "guest@losode.com",
    amount: Math.round(total * 100), 
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "", 
    currency: "NGN", // Change "USD" to "NGN"
    metadata: {
      custom_fields: [{ display_name: "Name", variable_name: "name", value: name || "Guest" }],
    },
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const validate = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const onSuccess = (response: { reference: string }) => {
    dispatch(clearCart());
    setPaidRef(response.reference);
    setConfirmed(true);
  };

  const onClose = () => {
    // Modal closed without completing
  };

  const handlePay = () => {
    if (!validate()) return;
    if (total <= 0) return; // Strict block against empty checkouts
    
    // Pass callbacks wrapped in an object per the latest react-paystack requirements
    initializePayment({ onSuccess, onClose });
  };

  // Empty cart guard
  if (items.length === 0 && !confirmed) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <ShoppingOutlined style={{ fontSize: 40, color: "#d1d5db" }} />
        <p className="text-gray-400 text-sm">Your cart is empty.</p>
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-[#1A1A1A] text-white text-sm rounded-lg font-semibold hover:bg-[#C8A96E] transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Success screen
  if (confirmed) {
    return (
      <OrderConfirmation reference={paidRef} email={email} total={total} />
    );
  }

  // Checkout form
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8 font-display">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* ── Left: Contact form ── */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-5">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ada Okonkwo"
                  className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#C8A96E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                  placeholder="ada@example.com"
                  className={`w-full h-11 border rounded-lg px-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors ${
                    emailError ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#C8A96E]"
                  }`}
                />
                {emailError && (
                  <p className="text-xs text-red-400 mt-1">{emailError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Secure badge */}
          <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
            <LockOutlined style={{ fontSize: 12 }} />
            Payments are secured and encrypted via Paystack
          </div>
        </div>

        {/* ── Right: Order summary ── */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-28">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[70%]">
                    {product.title}{" "}
                    <span className="text-gray-400">×{quantity}</span>
                  </span>
                  <span className="text-gray-800 font-medium flex-shrink-0">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-5">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-[#1A1A1A]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={!email}
              className="w-full h-12 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-[#C8A96E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Pay ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}