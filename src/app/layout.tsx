import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import CookieBanner from "@/components/ui/CookieBanner";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://losode.netlify.app"), 
  title: { default: "Losode Marketplace", template: "%s | Losode" },
  description: "Shop the latest fashion for men, women and kids. Free delivery on orders over $100.",
  keywords: ["fashion", "clothing", "shop", "losode", "online store"],
  
  icons: {
    icon: "/favicon.png",
    apple: "/og-image.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://losode.netlify.app",
    siteName: "Losode",
    title: "Losode Marketplace",
    description: "Shop the latest fashion for men, women and kids.",
    images: [
      { 
        url: "/og-image.png", 
        width: 1200, 
        height: 630, 
        alt: "Losode Preview Image" 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Losode Marketplace",
    description: "Shop the latest fashion for men, women and kids.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAF8]`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <NewsletterPopup />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}