import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* Light grey section */}
      <div className="bg-[#F2F2F2] px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">
              Get a Discount off your First Order on Losode
            </h3>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Enjoy 10% off your first order when you sign up to our newsletter.<br />
              Be the first to hear about new arrivals, exclusive offers, and more.
            </p>
            <FooterNewsletter />
          </div>

          {/* Help */}
          <div className="md:pl-10">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">Need Help?</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              For any enquiries, please contact our User Engagement Call Centre<br />
              <span className="font-medium text-[#1A1A1A]">02013306011</span> or send an email to{" "}
              <a href="mailto:hello@losode.com" className="text-[#1A1A1A] underline hover:text-[#C8A96E]">
                hello@losode.com
              </a>
            </p>
            <h3 className="text-sm font-bold text-[#1A1A1A] mt-6 mb-2">Location and Currency</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🇳🇬</span>
              <span className="font-medium">NGN</span>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="max-w-7xl mx-auto mt-10 flex items-center gap-5 border-t border-gray-200 pt-8">
          {[
            { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
            { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
            { label: "YouTube", path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
            { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
          ].map(({ label, path }) => (
            <a key={label} href="#" aria-label={label} className="text-gray-500 hover:text-[#1A1A1A] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Dark footer */}
      <div className="bg-[#1A1A1A] px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4">Useful Information</h4>
            <ul className="space-y-2.5">
              {["About Us", "Fashion and Climate", "Our Terms", "Our Privacy Policy", "Shipping and Delivery", "FAQs", "Sell on Losode"].map(l => (
                <li key={l}>
                  <Link href="/" className="text-gray-400 text-xs hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4">Customers and Designers</h4>
            <ul className="space-y-2.5">
              {["Track an Order", "Create a Return", "Book a Photoshoot", "Returns and Refunds", "Our Designers", "Contact Us"].map(l => (
                <li key={l}>
                  <Link href="/" className="text-gray-400 text-xs hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Logo + payments */}
          <div className="col-span-2 md:col-span-2 flex flex-col items-start md:items-end gap-6">
            <img
              src="/og-image.png"
              alt="Losode"
              className="h-10 w-auto object-contain"
            />
            <div>
              <p className="text-gray-400 text-xs mb-3 md:text-right">We accept payment from these providers:</p>
              <div className="flex items-center gap-2 flex-wrap">
                {["MC", "◎", "PP", "VISA", "≡"].map((p, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 px-3 py-1.5 text-white text-xs font-bold min-w-[40px] text-center">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
          <p className="text-gray-500 text-xs">
            © 2026, <span className="text-gray-400 font-semibold">Losode Inc.</span>{" "}
            <span className="italic">Always Beyond Borders</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterNewsletter() {
  return (
    <div className="flex gap-0 max-w-sm">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1A1A1A] bg-white placeholder-gray-400"
      />
      <button className="bg-[#1A1A1A] text-white px-5 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#C8A96E] transition-colors whitespace-nowrap">
        Subscribe
      </button>
    </div>
  );
}