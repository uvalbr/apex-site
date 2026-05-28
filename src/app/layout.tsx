import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { PageTransition } from "@/components/effects/PageTransition";
import { StickyBottomCta } from "@/components/mobile/StickyBottomCta";
import { MobileHeroOptimizations } from "@/components/mobile/MobileHeroOptimizations";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apexrevenueoperations.com"),
  title: {
    default: "APEX Revenue Operations — Built to Convert. Driven to Scale.",
    template: "%s — APEX Revenue Operations",
  },
  description:
    "Dedicated outsourced revenue operations infrastructure for U.S. construction companies. Faster speed-to-lead, higher appointment conversion, lower no-shows, scalable revenue.",
  keywords: [
    "revenue operations",
    "appointment setting construction",
    "lead conversion HVAC",
    "outsourced sales operations roofing",
    "appointment confirmation contractors",
  ],
  openGraph: {
    type: "website",
    title: "APEX Revenue Operations",
    description:
      "Outsourced revenue operations infrastructure for construction companies. Built to convert. Driven to scale.",
    url: "https://apexrevenueoperations.com",
    siteName: "APEX Revenue Operations",
    images: [
      {
        url: "/brand/logo-master-dark.png",
        width: 1600,
        height: 738,
        alt: "APEX Revenue Operations — Built to convert. Driven to scale.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX Revenue Operations",
    description:
      "Outsourced revenue operations infrastructure for construction companies.",
    images: ["/brand/logo-master-dark.png"],
  },
  icons: {
    icon: [
      { url: "/brand/logo-mark.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/logo-mark.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <JsonLd />
        <MobileHeroOptimizations />
        <ScrollProgress />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--color-brand-blue)] focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <StickyBottomCta />
      </body>
    </html>
  );
}
