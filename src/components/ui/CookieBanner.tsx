"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Register session timestamp
      if (!sessionStorage.getItem("session_start")) {
        sessionStorage.setItem("session_start", Date.now().toString());
        sessionStorage.setItem("session_id", crypto.randomUUID());
      }
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white border border-black shadow-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex-1">
          <p className="text-black font-semibold text-lg mb-2">We use cookies </p>
          <p className="text-black text-base leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.{" "}
            <a href="/privacy" className="text-black underline">Privacy Policy</a>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-6 py-3 text-base font-semibold text-black border border-black hover:bg-gray-100 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-6 py-3 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

