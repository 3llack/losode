"use client";
import { useEffect, useState } from "react";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("newsletter_seen")) {
      const t = setTimeout(() => setOpen(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("newsletter_seen", "1");
    setOpen(false);
  };

  const submit = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    localStorage.setItem("newsletter_seen", "1");
    localStorage.setItem("newsletter_email", email);
    setSubmitted(true);
    setTimeout(dismiss, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={dismiss} />

      {/* Modal — NO border-radius, Losode-style */}
      <div className="relative bg-white w-full max-w-md mx-4 z-10">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-xl leading-none z-20"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Top image band */}
        <div className="h-3 bg-[#1A1A1A]" />

        <div className="px-10 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Losode Exclusive</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 leading-tight">
            Get 10% off your<br />first order
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Subscribe to receive the latest arrivals, exclusive offers and style edits.
          </p>

          {submitted ? (
            <div className="py-4">
              <p className="text-[#C8A96E] font-semibold text-sm tracking-wide">Thank you for subscribing!</p>
              <p className="text-gray-400 text-xs mt-1">Your 10% code is on its way.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && submit()}
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#1A1A1A] placeholder-gray-400"
              />
              {error && <p className="text-red-500 text-xs text-left">{error}</p>}
              <button
                onClick={submit}
                className="w-full bg-[#1A1A1A] text-white py-3 text-xs font-semibold tracking-widest uppercase hover:bg-[#C8A96E] transition-colors"
              >
                Subscribe
              </button>
              <button
                onClick={dismiss}
                className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-4 mt-1"
              >
                No thanks
              </button>
            </div>
          )}
        </div>

        <div className="h-1 bg-[#C8A96E]" />
      </div>
    </div>
  );
}