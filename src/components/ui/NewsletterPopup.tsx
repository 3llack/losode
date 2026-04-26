"use client";
import { useEffect, useState } from "react";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => setOpen(false);

  const submit = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    localStorage.setItem("newsletter_email", email);
    setSubmitted(true);
    setTimeout(dismiss, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />

      <div className="relative bg-white w-full max-w-2xl mx-4 z-10 overflow-hidden">
        {/* Close — circular black button top-right, matching screenshot */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-black transition-colors text-sm"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image — wide horizontal band, 4 models side by side */}
        <div className="w-full h-56 sm:h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop&crop=top"
            alt="Fashion models"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Content — cream/off-white background matching screenshot */}
        <div className="bg-[#F5EFE8] px-8 sm:px-16 py-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3 leading-snug">
            Get 10% off your First<br />Order on Losode
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter Your Email Address To Unlock Your Exclusive Discount
          </p>

          {submitted ? (
            <div className="py-4">
              <p className="text-[#C8A96E] font-semibold text-sm tracking-wide">Thank you! Your 10% code is on its way.</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && submit()}
                className="flex-1 border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#1A1A1A] placeholder-gray-400"
              />
              <button
                onClick={submit}
                className="bg-[#1A1A1A] text-white px-6 py-3 text-sm font-semibold hover:bg-[#333] transition-colors whitespace-nowrap"
              >
                Unlock My Discount
              </button>
            </div>
          )}
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <button
            onClick={dismiss}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-4 mt-4 block mx-auto"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}