import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lithia Auto | Exotic & Performance Cars in [City, State]",
  description:
    "Discover high-performance and exotic vehicles at Lithia Auto. Shop sports cars, supercars, and premium performance models in [City, State].",
  openGraph: {
    title: "Exotic & Performance Cars | Lithia Auto",
    description:
      "Supercars. Sports cars. Pure performance. Find yours at Lithia Auto.",
    url: "https://lithia-auto.vercel.app",
    siteName: "Lithia Auto",
    images: [
      {
        url: "/og-performance.jpg",
        width: 1200,
        height: 630,
        alt: "Exotic performance car at Lithia Auto",
      },
    ],
  },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-navy-900 bg-light-100 min-h-screen flex flex-col`}>
        <CartProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
