"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] bg-white border border-gray-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8">
        {/* Title */}
        <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">
          Cookies and Privacy
        </p>

        {/* Body text */}
        <p className="text-sm text-[#1A1A1A] leading-relaxed mb-3">
          Our site uses cookies and similar technologies to offer you a better experience. We use analytical
          cookies (our own and third party) to understand and improve your browsing experience, and advertising
          cookies (our own and third party) to send you advertisements in line with your preferences.
        </p>
        <p className="text-sm text-[#1A1A1A] leading-relaxed mb-6">
          To modify or opt-out of the use of some or all of our cookies, please go to our{" "}
          <a href="/privacy" className="underline text-[#1A1A1A] hover:text-[#C8A96E] transition-colors">
            Cookie Policy
          </a>{" "}
          to find out more. By clicking "Accept" you consent to the use these cookies.
        </p>

        {/* Divider + Accept button — right-aligned like screenshot */}
        <div className="border-t border-gray-200 pt-5 flex justify-end">
          <button
            onClick={accept}
            className="bg-[#1A1A1A] text-white px-10 py-3 text-sm font-semibold hover:bg-[#333] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}