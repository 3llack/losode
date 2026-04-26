"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/redux";
import { selectCartCount } from "@/store/cartSlice";
import { selectFavoritesCount } from "@/store/favoritesSlice";
import { useDebounce } from "use-debounce";
import { Badge } from "antd";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useAppSelector(selectCartCount);
  const favCount = useAppSelector(selectFavoritesCount);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearch] = useDebounce(searchVal, 400);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/products?search=${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch, router]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const categories = [
    { label: "Sale", href: "/products?sale=true", red: true },
    { label: "New In", href: "/products?new=true" },
    { label: "Shop By", href: "/products" },
    { label: "Clothing", href: "/products?category=1" },
    { label: "Shoes", href: "/products?category=2" },
    { label: "Bags", href: "/products?category=3" },
    { label: "Accessories", href: "/products?category=4" },
    { label: "Beauty", href: "/products?category=5" },
    { label: "Home", href: "/products?category=6" },
    { label: "Designers", href: "/products" },
    { label: "Sell On Losode", href: "/" },
  ];

  return (
    <>
      {/* Announcement bar — FIX: aligned to navbar max-width */}
      <div className="bg-[#F5F5F3] md:bg-white text-[#1A1A1A] text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span>
            New to Losode?{" "}
            <Link href="/products" className="underline font-semibold hover:text-[#C8A96E]">
              Subscribe
            </Link>{" "}
            and Get 10% off your first order
          </span>
          <span className="hidden sm:inline underline cursor-pointer hover:text-[#C8A96E]">
            Sell On Losode
          </span>
        </div>
      </div>

      {/* Header — dark on desktop, white on mobile */}
      <header className="bg-white md:bg-[#1A1A1A] sticky top-0 z-50">
        <div className="border-b border-gray-200 md:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 lg:h-24">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="text-[#1A1A1A] md:text-white md:hidden"
                aria-label="Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>

              {/* Favorites — mobile only */}
              <Link href="/favorites" className="text-[#1A1A1A] hover:text-[#C8A96E] transition-colors md:hidden" aria-label="Wishlist">
                <Badge count={favCount} size="small" color="#C8A96E" offset={[4, -4]}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </Badge>
              </Link>

              {/* Gender tabs — desktop only */}
              <div className="hidden md:flex items-center gap-6">
                {["Women", "Men", "Kids"].map(g => (
                  <Link
                    key={g}
                    href={`/products?gender=${g.toLowerCase()}`}
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      pathname.includes(g.toLowerCase())
                        ? "text-white border-b-2 border-white pb-0.5"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>

            {/* CENTER: Logo — mobile uses losode-mob.png, desktop uses og-image.png */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              {/* Mobile logo */}
              <Image
                src="/losode-mob.png"
                alt="Losode"
                width={120}
                height={40}
                priority
                className="block md:hidden object-contain h-8 w-auto"
              />
              {/* Desktop logo */}
              <Image
                src="/og-image.png"
                alt="Losode"
                width={100}
                height={100}
                priority
                className="hidden md:block object-contain w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-300"
              />
            </Link>

            {/* RIGHT */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="text-[#1A1A1A] md:text-white hover:text-[#C8A96E] transition-colors"
                aria-label="Search"
              >
                {searchOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                )}
              </button>

              {/* Account — desktop only */}
              <button className="text-white hover:text-[#C8A96E] transition-colors hidden sm:block" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>

              {/* Favorites — desktop only */}
              <Link href="/favorites" className="text-white hover:text-[#C8A96E] transition-colors relative hidden md:block" aria-label="Wishlist">
                <Badge count={favCount} size="small" color="#C8A96E" offset={[4, -4]}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </Badge>
              </Link>

              {/* Cart — FIX: className on svg fixes Badge breaking color inheritance */}
              <Link href="/cart" className="text-[#1A1A1A] md:text-white hover:text-[#C8A96E] transition-colors" aria-label="Cart">
                <Badge count={cartCount} size="small" color="#C8A96E" offset={[4, -4]}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1A1A1A] md:text-white">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </Badge>
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-b border-gray-200 md:border-white/10 bg-gray-50 md:bg-[#111111] px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 flex-shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={searchRef}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchVal.trim()) {
                    router.push(`/products?search=${encodeURIComponent(searchVal.trim())}`);
                    setSearchOpen(false);
                  }
                  if (e.key === "Escape") { setSearchOpen(false); setSearchVal(""); }
                }}
                placeholder="Search for clothing, shoes, bags…"
                className="flex-1 bg-transparent text-[#1A1A1A] md:text-white text-sm placeholder-gray-400 md:placeholder-gray-500 outline-none"
              />
              {searchVal && (
                <button onClick={() => setSearchVal("")} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category nav — desktop only */}
        <div className="hidden lg:block border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-6 h-10 overflow-x-auto scrollbar-hide">
              {categories.map(c => (
                <Link
                  key={c.label}
                  href={c.href}
                  className={`text-xs font-medium whitespace-nowrap tracking-wide transition-colors hover:text-[#C8A96E] ${
                    c.red ? "text-red-400" : "text-gray-300"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#1A1A1A] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Image src="/og-image.png" alt="Losode Logo" width={48} height={48} className="object-contain" />
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            <nav className="flex flex-col px-6 py-4 gap-5 overflow-y-auto">
              {["Women", "Men", "Kids"].map(g => (
                <Link key={g} href={`/products?gender=${g.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                  className="text-white text-sm font-semibold tracking-wide border-b border-white/10 pb-3">
                  {g}
                </Link>
              ))}
              {categories.map(c => (
                <Link key={c.label} href={c.href} onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-wide ${c.red ? "text-red-400" : "text-gray-300"} hover:text-white`}>
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}