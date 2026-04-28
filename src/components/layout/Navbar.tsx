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
import navbarData from "@/json/navbar-data.json";

type MegaKey = "Clothing" | "Shoes" | "Bags" | "Accessories" | "Beauty" | "Home" | "Designers" | "Shop By" | "New In" | null;

type MenuItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

type MenuColumn = {
  heading?: string;
  items: MenuItem[];
};

type MenuPromo = {
  href: string;
  image: string;
  title: string;
  subtitle: string;
};

type MegaMenu = {
  col1?: MenuColumn;
  col2?: MenuColumn;
  col3?: MenuColumn;
  promo?: MenuPromo;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useAppSelector(selectCartCount);
  const favCount = useAppSelector(selectFavoritesCount);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [activeMenu, setActiveMenu] = useState<MegaKey>(null);
  const [debouncedSearch] = useDebounce(searchVal, 400);
  const searchRef = useRef<HTMLInputElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleCatEnter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (label in navbarData.megaMenus) setActiveMenu(label as MegaKey);
    else setActiveMenu(null);
  };

  const handleCatLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const handleMegaEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  const menu = activeMenu ? (navbarData.megaMenus as Record<string, MegaMenu>)[activeMenu] : null;

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#F5F5F3] md:bg-white text-[#1A1A1A] text-[12px] p-2">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
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

      {/* Header */}
      <header className="bg-white md:bg-[#000] sticky top-0 z-50" onMouseLeave={handleCatLeave}>

        {/* Main header row — hidden when search is open */}
        {!searchOpen && (
          <div className="border-b border-gray-200 md:border-white/10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 md:h-[72px]">

              {/* LEFT */}
              <div className="flex items-center gap-4 flex-1">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="text-[#1A1A1A] md:hidden"
                  aria-label="Menu"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                </button>
                <Link href="/favorites" className="text-[#1A1A1A] hover:text-[#C8A96E] transition-colors md:hidden" aria-label="Wishlist">
                  <Badge count={favCount} size="small" color="#C8A96E" offset={[4, -4]}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </Badge>
                </Link>
                <div className="hidden md:flex items-center gap-7">
                  {["Women", "Men", "Kids"].map(g => (
                    <Link
                      key={g}
                      href={`/products?gender=${g.toLowerCase()}`}
                      className={`text-[13px] font-semibold tracking-wide transition-colors ${
                        pathname.includes(g.toLowerCase())
                          ? "text-white border-b-2 border-white pb-0.5"
                          : "text-white"
                      }`}
                    >
                      {g}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CENTER: Logo */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <Image
                  src="/losode-mob.png"
                  alt="Losode"
                  width={130}
                  height={44}
                  priority
                  className="block md:hidden object-contain h-9 w-auto"
                />
                <Image
                  src="/og-image.png"
                  alt="Losode"
                  width={180}
                  height={54}
                  priority
                  className="hidden md:block object-contain h-[54px] w-auto"
                />
              </Link>

              {/* RIGHT */}
              <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-[#1A1A1A] md:text-white hover:text-[#C8A96E] transition-colors flex items-center gap-2"
                  aria-label="Search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <span className="hidden md:inline text-[13px] font-medium tracking-wide">Search</span>
                </button>
                <button className="hidden md:flex text-white hover:text-[#C8A96E] transition-colors" aria-label="Account">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
                <Link href="/favorites" className="hidden md:flex text-white hover:text-[#C8A96E] transition-colors relative" aria-label="Wishlist">
                  <Badge count={favCount} size="small" color="#C8A96E" offset={[4, -4]}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </Badge>
                </Link>
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
        )}

        {/* Search active state — full-width dark bar replacing header */}
        {searchOpen && (
          <div className="bg-[#1A1A1A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center h-[72px] gap-4">
              <input
                ref={searchRef}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchVal.trim()) {
                    router.push(`/products?search=${encodeURIComponent(searchVal.trim())}`);
                    setSearchOpen(false);
                    setSearchVal("");
                  }
                  if (e.key === "Escape") { setSearchOpen(false); setSearchVal(""); }
                }}
                placeholder="Search"
                className="flex-1 bg-transparent text-white text-base placeholder-gray-500 outline-none"
              />
              <button
                onClick={() => {
                  if (searchVal.trim()) {
                    router.push(`/products?search=${encodeURIComponent(searchVal.trim())}`);
                    setSearchOpen(false);
                    setSearchVal("");
                  } else {
                    setSearchOpen(false);
                  }
                }}
                className="text-white hover:text-[#C8A96E] transition-colors flex-shrink-0"
                aria-label="Submit search"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Category nav — desktop only */}
        {!searchOpen && (
          <div className="hidden lg:block border-t border-white/10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
              <nav className="flex items-center h-11">
                {/* NGN badge */}
                <div className="flex items-center gap-2 pr-5 mr-4 border-r border-white/10 flex-shrink-0">
                  <span className="text-base leading-none">🇳🇬</span>
                  <span className="text-[11px] font-semibold text-gray-300 tracking-widest">NGN</span>
                </div>
                {navbarData.categories.map(c => (
                  <div
                    key={c.label}
                    onMouseEnter={() => !c.noDropdown && handleCatEnter(c.label)}
                    className="relative h-full flex items-center"
                  >
                    <Link
                      href={c.href}
                      className={`text-[12px] font-medium whitespace-nowrap tracking-wide transition-colors hover:text-[#C8A96E] px-4 h-full flex items-center ${
                        c.red ? "text-red-400 font-semibold" : "text-gray-300"
                      } ${activeMenu === c.label ? "text-white" : ""}`}
                    >
                      {c.label}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Mega menu dropdown */}
        {activeMenu && menu && (
          <div
            ref={megaRef}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleCatLeave}
            className="absolute left-0 right-0 bg-white shadow-2xl z-40 border-t border-gray-100"
          >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
              <div className={`grid gap-8 ${menu.col2 ? "grid-cols-[1fr_1fr_1fr_300px]" : "grid-cols-[1fr_1fr_300px]"}`}>

                {/* Col 1 */}
                {menu.col1 && (
                  <div>
                    <p className="text-[11px] font-bold tracking-widest text-[#1A1A1A] mb-5">{menu.col1.heading}</p>
                    <ul className="space-y-2.5">
                      {menu.col1.items.map(item => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className={`text-[13px] leading-snug transition-colors hover:text-[#C8A96E] ${
                              item.highlight ? "text-red-600 font-medium" : "text-[#1A1A1A]"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Col 2 — continuation list, no heading, offset to align with col1 items */}
                {menu.col2 && (
                  <div className="pt-[36px]">
                    <ul className="space-y-2.5">
                      {menu.col2.items.map(item => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className={`text-[13px] leading-snug transition-colors hover:text-[#C8A96E] ${
                              item.highlight ? "text-red-600 font-medium" : "text-[#1A1A1A]"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Col 3: Designers — with left divider */}
                {menu.col3 && (
                  <div className="border-l border-gray-200 pl-8">
                    <p className="text-[11px] font-bold tracking-widest text-[#1A1A1A] mb-5">{menu.col3.heading}</p>
                    <ul className="space-y-2.5">
                      {menu.col3.items.map(item => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="text-[13px] leading-snug text-[#1A1A1A] tracking-wide transition-colors hover:text-[#C8A96E]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Promo image */}
                {menu.promo && (
                  <div>
                    <Link href={menu.promo.href} onClick={() => setActiveMenu(null)}>
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f0e8d8]">
                        <Image
                          src={menu.promo.image}
                          alt={menu.promo.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="mt-3 text-[15px] font-semibold text-[#1A1A1A]">{menu.promo.title}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{menu.promo.subtitle}</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[290px] bg-white flex flex-col shadow-2xl">

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Image src="/losode-mob.png" alt="Losode" width={110} height={36} className="object-contain h-8 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-800 text-lg leading-none">✕</button>
            </div>

            <div className="flex border-b border-gray-100 px-5">
              {["Women", "Men"].map(g => (
                <Link
                  key={g}
                  href={`/products?gender=${g.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-semibold tracking-wide py-3 mr-6 border-b-2 -mb-px transition-colors ${
                    pathname.includes(g.toLowerCase())
                      ? "border-[#1A1A1A] text-[#1A1A1A]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  {g}
                </Link>
              ))}
            </div>

            <nav className="flex flex-col overflow-y-auto flex-1">
              {navbarData.drawerCategories.map(c => (
                <Link
                  key={c.label}
                  href={c.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-5 py-3.5 border-b border-gray-100 text-sm tracking-wide transition-colors hover:bg-gray-50 ${
                    c.red ? "text-red-600 font-semibold" : "text-[#1A1A1A]"
                  }`}
                >
                  <span>{c.label}</span>
                  {c.hasPlus && <span className="text-gray-300 text-base font-light">+</span>}
                </Link>
              ))}
            </nav>

            <div className="px-5 py-4 flex flex-col gap-3 border-t border-gray-100">
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="w-full bg-[#1A1A1A] text-white text-center text-sm font-medium tracking-wider py-3.5 hover:bg-black transition-colors"
              >
                Sign In / Register
              </Link>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="w-full border border-gray-300 text-[#1A1A1A] text-center text-sm font-medium tracking-wider py-3.5 hover:border-gray-500 transition-colors"
              >
                Sell On Losode
              </Link>
            </div>

            <div className="px-5 pb-6 pt-3 border-t border-gray-100">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Need Help?</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Send an email to{" "}
                <a href="mailto:hello@losode.com" className="text-red-600">hello@losode.com</a>
                {" "}or call us on{" "}
                <a href="tel:02013306011" className="text-red-600">02013306011</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}