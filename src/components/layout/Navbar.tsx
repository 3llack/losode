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

type MegaKey = "Clothing" | "Shoes" | "Bags" | "Accessories" | "Beauty" | "Home" | "Designers" | "Shop By" | "New In" | null;

const megaMenus: Record<string, {
  col1?: { heading: string; items: { label: string; href: string; highlight?: boolean }[] };
  col2?: { items: { label: string; href: string }[] };
  col3?: { heading: string; items: { label: string; href: string }[] };
  promo?: { image: string; title: string; subtitle: string; href: string };
}> = {
  Clothing: {
    col1: {
      heading: "CLOTHING",
      items: [
        { label: "All Clothing", href: "/products?category=1" },
        { label: "New In Clothing", href: "/products?category=1&new=true" },
        { label: "BouBous", href: "/products?category=1&sub=boubous" },
        { label: "Co-ords", href: "/products?category=1&sub=coords", highlight: true },
        { label: "Coats and Jackets", href: "/products?category=1&sub=coats" },
        { label: "Dresses", href: "/products?category=1&sub=dresses" },
        { label: "Hoodies and Sweatshirts", href: "/products?category=1&sub=hoodies" },
        { label: "Jeans and Denim", href: "/products?category=1&sub=jeans" },
        { label: "Joggers", href: "/products?category=1&sub=joggers" },
        { label: "Jumpers and Cardigans", href: "/products?category=1&sub=jumpers" },
        { label: "Jumpsuits and Playsuits", href: "/products?category=1&sub=jumpsuits" },
        { label: "Kaftans and Danshikis", href: "/products?category=1&sub=kaftans" },
        { label: "Kimonos", href: "/products?category=1&sub=kimonos" },
      ],
    },
    col2: {
      items: [
        { label: "Leggings", href: "/products?category=1&sub=leggings" },
        { label: "Lingerie and Nightwear", href: "/products?category=1&sub=lingerie" },
        { label: "Loungewear", href: "/products?category=1&sub=loungewear" },
        { label: "Multipacks", href: "/products?category=1&sub=multipacks" },
        { label: "Shirts", href: "/products?category=1&sub=shirts" },
        { label: "Shorts", href: "/products?category=1&sub=shorts" },
        { label: "Skirts", href: "/products?category=1&sub=skirts" },
        { label: "Socks and Tights", href: "/products?category=1&sub=socks" },
        { label: "Sportswear", href: "/products?category=1&sub=sportswear" },
        { label: "Suits and Tailoring", href: "/products?category=1&sub=suits" },
        { label: "Swimwear and Beachwear", href: "/products?category=1&sub=swimwear" },
        { label: "Tops and Blouses", href: "/products?category=1&sub=tops" },
        { label: "Tracksuits", href: "/products?category=1&sub=tracksuits" },
        { label: "Trousers", href: "/products?category=1&sub=trousers" },
      ],
    },
    col3: {
      heading: "DESIGNERS",
      items: [
        { label: "KOVVEX", href: "/products?designer=kovvex" },
        { label: "SEAMED BY TEMMY", href: "/products?designer=seamed-by-temmy" },
        { label: "URBAN MODESTEE", href: "/products?designer=urban-modestee" },
        { label: "BESPOKE BY NURUDEEN", href: "/products?designer=bespoke-by-nurudeen" },
        { label: "MELIRA", href: "/products?designer=melira" },
        { label: "JEDA SANNI", href: "/products?designer=jeda-sanni" },
        { label: "VELANTE", href: "/products?designer=velante" },
        { label: "FABRIC FRENZY", href: "/products?designer=fabric-frenzy" },
        { label: "ZICH COLLECTIONS LTD", href: "/products?designer=zich-collections" },
        { label: "COBBY WOMAN", href: "/products?designer=cobby-woman" },
      ],
    },
    promo: {
      image: "/og-image.png",
      title: "Style That Suits",
      subtitle: "For every occasion",
      href: "/products?category=1",
    },
  },
  Shoes: {
    col1: {
      heading: "SHOES",
      items: [
        { label: "All Shoes", href: "/products?category=2" },
        { label: "New In Shoes", href: "/products?category=2&new=true" },
        { label: "Boots", href: "/products?category=2&sub=boots" },
        { label: "Flats", href: "/products?category=2&sub=flats" },
        { label: "Heels", href: "/products?category=2&sub=heels" },
        { label: "Loafers", href: "/products?category=2&sub=loafers" },
        { label: "Sandals", href: "/products?category=2&sub=sandals" },
        { label: "Sneakers", href: "/products?category=2&sub=sneakers" },
        { label: "Trainers", href: "/products?category=2&sub=trainers" },
        { label: "Wedges", href: "/products?category=2&sub=wedges" },
      ],
    },
    col3: {
      heading: "DESIGNERS",
      items: [
        { label: "KOVVEX", href: "/products?designer=kovvex" },
        { label: "MELIRA", href: "/products?designer=melira" },
        { label: "VELANTE", href: "/products?designer=velante" },
      ],
    },
    promo: { image: "/og-image.png", title: "Step Into Style", subtitle: "Latest arrivals", href: "/products?category=2" },
  },
  Bags: {
    col1: {
      heading: "BAGS",
      items: [
        { label: "All Bags", href: "/products?category=3" },
        { label: "New In Bags", href: "/products?category=3&new=true" },
        { label: "Backpacks", href: "/products?category=3&sub=backpacks" },
        { label: "Clutches", href: "/products?category=3&sub=clutches" },
        { label: "Crossbody Bags", href: "/products?category=3&sub=crossbody" },
        { label: "Shoulder Bags", href: "/products?category=3&sub=shoulder" },
        { label: "Tote Bags", href: "/products?category=3&sub=totes" },
      ],
    },
    col3: {
      heading: "DESIGNERS",
      items: [
        { label: "KOVVEX", href: "/products?designer=kovvex" },
        { label: "JEDA SANNI", href: "/products?designer=jeda-sanni" },
      ],
    },
    promo: { image: "/og-image.png", title: "Carry In Style", subtitle: "Curated bags", href: "/products?category=3" },
  },
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
    if (megaMenus[label]) setActiveMenu(label as MegaKey);
    else setActiveMenu(null);
  };

  const handleCatLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const handleMegaEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

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

  const drawerCategories = [
    { label: "New In", href: "/products?new=true", hasPlus: false },
    { label: "Shop By", href: "/products", hasPlus: true },
    { label: "Clothing", href: "/products?category=1", hasPlus: true },
    { label: "Shoes", href: "/products?category=2", hasPlus: true },
    { label: "Bags", href: "/products?category=3", hasPlus: true },
    { label: "Jewellery", href: "/products?category=7", hasPlus: true },
    { label: "Beauty", href: "/products?category=5", hasPlus: true },
    { label: "Accessories", href: "/products?category=4", hasPlus: true },
    { label: "Home", href: "/products?category=6", hasPlus: true },
    { label: "Designers", href: "/products", hasPlus: false },
    { label: "SALE", href: "/products?sale=true", hasPlus: false, red: true },
  ];

  const menu = activeMenu ? megaMenus[activeMenu] : null;

  return (
    <>
      {/* Announcement bar */}
<<<<<<< Updated upstream
      <div className="bg-white text-[#1A1A1A] text-center text-xs py-2 px-4">
        New to Losode?{" "}
        <Link href="/products" className="underline font-semibold hover:text-[#C8A96E]">
          Subscribe
        </Link>{" "}
        and Get 10% off your first order
        <span className="hidden sm:inline float-right pr-4 underline cursor-pointer hover:text-[#C8A96E]">
          Sell On Losode
        </span>
      </div>

      <header className="bg-[#1A1A1A] sticky top-0 z-50">
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 lg:h-24">

            {/* LEFT: Hamburger + Favorites (mobile) | Gender tabs (desktop) */}
            <div className="flex items-center gap-4">
              {/* Hamburger — mobile only */}
              <button onClick={() => setMobileOpen(true)} className="text-white md:hidden" aria-label="Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>

              {/* Favorites — mobile only, sits right beside hamburger */}
              <Link href="/favorites" className="text-white hover:text-[#C8A96E] transition-colors md:hidden" aria-label="Wishlist">
                <Badge count={favCount} size="small" color="#C8A96E" offset={[4, -4]}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
=======
      <div className="bg-[#F5F5F3] md:bg-white text-[#1A1A1A] text-[14px] p-2">
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
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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

            {/* CENTER: Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <Image
                src="/og-image.png"
                alt="Losode Logo"
                width={100}
                height={100}
                priority
                className="object-contain w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-300"
              />
            </Link>

            {/* RIGHT: Search | Account | Favorites (desktop) | Cart */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Search icon */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="text-white hover:text-[#C8A96E] transition-colors"
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

              {/* Favorites — desktop only (mobile version is in the left cluster) */}
              <Link href="/favorites" className="text-white hover:text-[#C8A96E] transition-colors relative hidden md:block" aria-label="Wishlist">
                <Badge count={favCount} size="small" color="#C8A96E" offset={[4, -4]}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </Badge>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="text-white hover:text-[#C8A96E] transition-colors" aria-label="Cart">
                <Badge count={cartCount} size="small" color="#C8A96E" offset={[4, -4]}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </Badge>
              </Link>
=======
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
>>>>>>> Stashed changes
            </div>
          </div>
        )}

        {/* Search active state — full-width dark bar replacing header */}
        {searchOpen && (
<<<<<<< Updated upstream
          <div className="border-b border-white/10 bg-[#111111] px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 flex-shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
=======
          <div className="bg-[#1A1A1A]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center h-[72px] gap-4">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                placeholder="Search for clothing, shoes, bags…"
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal("")}
                  className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
                  aria-label="Clear"
                >
                  Clear
                </button>
              )}
=======
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
>>>>>>> Stashed changes
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
                {categories.map(c => (
                  <div
                    key={c.label}
                    onMouseEnter={() => handleCatEnter(c.label)}
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
                            className="text-[13px] leading-snug text-[#1A1A1A] transition-colors hover:text-[#C8A96E]"
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
<<<<<<< Updated upstream
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#1A1A1A] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Image src="/og-image.png" alt="Losode Logo" width={48} height={48} className="object-contain" />
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
=======
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[290px] bg-white flex flex-col shadow-2xl">

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Image src="/losode-mob.png" alt="Losode" width={110} height={36} className="object-contain h-8 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-800 text-lg leading-none">✕</button>
>>>>>>> Stashed changes
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
              {drawerCategories.map(c => (
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