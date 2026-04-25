"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "@/store/cartSlice";
import { usePaystackPayment } from "react-paystack";
import { Form, Input, Button, Result, Steps } from "antd";
import {
  UserOutlined,
  MailOutlined,
  ShoppingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { CheckoutFormValues } from "@/types";

function getValidImage(images: string[]): string {
  const img = images?.find(
    (i) => i && !i.includes("[") && (i.startsWith("http") || i.startsWith("/"))
  );
  return img || "/placeholder.png";
}

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_xxxxxxxxxxxxxx";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const config = {
    reference: `losode_${new Date().getTime()}`,
    email: email,
    amount: Math.round(total * 100),
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "USD",
  };

  const initializePayment = usePaystackPayment(config);

  const onPaymentSuccess = () => {
    dispatch(clearCart());
    setOrderSuccess(true);
  };

  const onPaymentClose = () => {
    console.log("Payment closed");
  };

  const handleFormSubmit = (values: CheckoutFormValues) => {
    setEmail(values.email);
    setCurrentStep(1);
  };

  const handlePay = () => {
    initializePayment({
      onSuccess: onPaymentSuccess,
      onClose: onPaymentClose,
    });
  };

  // Empty cart
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Result
          icon={<ShoppingOutlined style={{ color: "#C8A96E" }} />}
          title="Your cart is empty"
          subTitle="Add some products before checking out"
          extra={
            <Link href="/products">
              <Button
                type="primary"
                size="large"
                className="rounded-full h-12 px-8"
                style={{ backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" }}
              >
                Shop Now
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  // Order success
  if (orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Result
          status="success"
          title={
            <span className="font-display text-3xl font-bold text-[#1A1A1A]">
              Order Confirmed!
            </span>
          }
          subTitle={
            <span className="text-gray-500">
              Thank you for your purchase. A confirmation has been sent to{" "}
              <strong>{email}</strong>
            </span>
          }
          extra={[
            <Link href="/products" key="shop">
              <Button
                type="primary"
                size="large"
                className="rounded-full h-12 px-8"
                style={{ backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" }}
              >
                Continue Shopping
              </Button>
            </Link>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium text-[#C8A96E] uppercase tracking-widest mb-1">
          Almost there
        </p>
        <h1 className="font-display text-3xl font-bold text-[#1A1A1A]">
          Checkout
        </h1>
      </div>

      {/* Steps */}
      <Steps
        current={currentStep}
        className="mb-10 max-w-md"
        items={[
          { title: "Your Details", icon: <UserOutlined /> },
          { title: "Payment", icon: <CheckCircleOutlined /> },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left — Form or Payment */}
        <div className="flex-1">

          {/* Step 0 — Details form */}
          {currentStep === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-display text-xl font-bold text-[#1A1A1A] mb-6">
                Your Details
              </h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                requiredMark={false}
              >
                <Form.Item
                  label={
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </span>
                  }
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                    { min: 2, message: "Name must be at least 2 characters" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-300" />}
                    placeholder="John Doe"
                    size="large"
                    className="rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Address
                    </span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-300" />}
                    placeholder="john@example.com"
                    size="large"
                    className="rounded-xl"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="h-12 rounded-full font-semibold mt-2"
                  style={{
                    backgroundColor: "#1A1A1A",
                    borderColor: "#1A1A1A",
                  }}
                >
                  Continue to Payment
                </Button>
              </Form>
            </div>
          )}

          {/* Step 1 — Payment */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-display text-xl font-bold text-[#1A1A1A] mb-2">
                Payment
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                You will be securely redirected to Paystack to complete your
                payment.
              </p>

              {/* Summary */}
              <div className="bg-[#FAFAF8] rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Email</span>
                  <span className="font-medium text-gray-700">{email}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Items</span>
                  <span className="font-medium text-gray-700">
                    {items.length}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-[#1A1A1A]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                block
                onClick={handlePay}
                className="h-12 rounded-full font-semibold"
                style={{
                  backgroundColor: "#C8A96E",
                  borderColor: "#C8A96E",
                }}
              >
                Pay ${total.toFixed(2)} with Paystack
              </Button>

              <button
                onClick={() => setCurrentStep(0)}
                className="w-full text-center text-sm text-gray-400 hover:text-[#C8A96E] transition-colors mt-4 underline"
              >
                Go back
              </button>
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-[#1A1A1A] mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={getValidImage(item.product.images)}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 line-clamp-2">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-[#1A1A1A] pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}