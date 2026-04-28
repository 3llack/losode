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

<<<<<<< Updated upstream
  const dismiss = () => {
    localStorage.setItem("newsletter_seen", "1");
    setOpen(false);
  };

=======
  const dismiss = () => setOpen(false);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={dismiss} />

      {/* Modal — NO border-radius, Losode-style */}
      <div className="relative bg-white w-full max-w-md mx-4 z-10">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-xl leading-none z-20"
=======
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />
      <div className="relative bg-white w-full max-w-2xl z-10 overflow-hidden">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-black transition-colors text-xs"
>>>>>>> Stashed changes
          aria-label="Close"
        >
          ✕
        </button>

<<<<<<< Updated upstream
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
=======
        {/* Image — hidden on mobile, visible on sm+ */}
        <div className="hidden sm:block w-full h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop&crop=top"
            alt="Fashion models"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Content */}
        <div className="bg-[#F5EFE8] px-6 sm:px-16 py-7 sm:py-10 text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 leading-snug">
            Get 10% off your First<br />Order on Losode
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-5">
            Enter Your Email Address To Unlock Your Exclusive Discount
          </p>

          {submitted ? (
            <div className="py-3">
              <p className="text-[#C8A96E] font-semibold text-sm tracking-wide">
                Thank you! Your 10% code is on its way.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-lg mx-auto">
>>>>>>> Stashed changes
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && submit()}
<<<<<<< Updated upstream
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#1A1A1A] placeholder-gray-400"
=======
                className="flex-1 border border-gray-300 bg-white px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#1A1A1A] placeholder-gray-400"
>>>>>>> Stashed changes
              />
              {error && <p className="text-red-500 text-xs text-left">{error}</p>}
              <button
                onClick={submit}
<<<<<<< Updated upstream
                className="w-full bg-[#1A1A1A] text-white py-3 text-xs font-semibold tracking-widest uppercase hover:bg-[#C8A96E] transition-colors"
=======
                className="bg-[#1A1A1A] text-white px-6 py-2.5 sm:py-3 text-sm font-semibold hover:bg-[#333] transition-colors whitespace-nowrap"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <button
            onClick={dismiss}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-4 mt-4 block mx-auto"
          >
            No thanks
          </button>
>>>>>>> Stashed changes
        </div>

        <div className="h-1 bg-[#C8A96E]" />
      </div>
    </div>
  );
}