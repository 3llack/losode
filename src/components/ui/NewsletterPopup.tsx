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
    <>
      <style>{`
        .nl-image { height: 7rem; }
        .nl-content { padding: 1.25rem; }
        .nl-title { font-size: 1.125rem; margin-bottom: 0.375rem; }
        .nl-subtitle { font-size: 0.75rem; margin-bottom: 1rem; }
        .nl-fields { flex-direction: column; gap: 0.5rem; }
        .nl-input { padding: 0.625rem 0.75rem; font-size: 0.75rem; width: 100%; }
        .nl-btn { width: 100%; padding: 0.625rem 1rem; font-size: 0.75rem; }
        .nl-close { top: 0.5rem; right: 0.5rem; width: 1.75rem; height: 1.75rem; font-size: 0.75rem; }

        @media (min-width: 1150px) {
          .nl-image { height: 14rem; }
          .nl-content { padding: 2.5rem 4rem; }
          .nl-title { font-size: 1.875rem; margin-bottom: 0.75rem; }
          .nl-subtitle { font-size: 0.875rem; margin-bottom: 1.5rem; }
          .nl-fields { flex-direction: row; gap: 0.75rem; }
          .nl-input { padding: 0.75rem 1rem; font-size: 0.875rem; width: auto; }
          .nl-btn { width: auto; padding: 0.75rem 1.5rem; font-size: 0.875rem; }
          .nl-close { top: 1rem; right: 1rem; width: 2.25rem; height: 2.25rem; font-size: 0.875rem; }
        }
      `}</style>

      <div className="fixed inset-0 z-[200] flex items-center justify-center px-3">
        <div className="absolute inset-0 bg-black/50" onClick={dismiss} />

        <div className="relative bg-white w-full max-w-5xl z-10 overflow-hidden">
          {/* Close button */}
          <button
            onClick={dismiss}
            className="nl-close absolute z-20 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-black transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Image */}
          <div className="nl-image w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop&crop=top"
              alt="Fashion models"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Content */}
          <div className="nl-content bg-[#F5EFE8] text-center">
            <h2 className="nl-title font-bold text-[#1A1A1A] leading-snug">
              Get 10% off your First<br />Order on Losode
            </h2>
            <p className="nl-subtitle text-gray-600">
              Enter Your Email Address To Unlock Your Exclusive Discount
            </p>

            {submitted ? (
              <div className="py-2">
                <p className="text-[#C8A96E] font-semibold text-xs tracking-wide">
                  Thank you! Your 10% code is on its way.
                </p>
              </div>
            ) : (
              <div className="nl-fields flex max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && submit()}
                  className="nl-input flex-1 min-w-0 border border-gray-300 bg-white outline-none focus:border-[#1A1A1A] placeholder-gray-400"
                />
                <button
                  onClick={submit}
                  className="nl-btn shrink-0 bg-[#1A1A1A] text-white font-semibold hover:bg-[#333] transition-colors whitespace-nowrap"
                >
                  Unlock My Discount
                </button>
              </div>
            )}

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <button
              onClick={dismiss}
              className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-4 mt-3 block mx-auto"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </>
  );
}