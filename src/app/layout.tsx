import type { Metadata } from "next";
import { Cormorant_Garamond, Karla, Cinzel } from "next/font/google";
import { OG_BANNER } from "@/lib/og";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Metadata default untuk seluruh aplikasi. Detail acara (nama, tanggal, venue)
// diambil dari DB per wedding di app/undangan/[slug]/page.tsx.
// Ganti NEXT_PUBLIC_SITE_URL di .env saat deploy ke domain demo.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const defaultDescription =
  "Demo portofolio undangan pernikahan digital interaktif. Seluruh data pada demo ini bersifat fiktif.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Undangan Digital · Demo Portofolio",
    template: "%s · Undangan Digital",
  },
  description: defaultDescription,
  openGraph: {
    title: "Undangan Digital · Demo Portofolio",
    description: defaultDescription,
    siteName: "Undangan Digital Demo",
    type: "website",
    images: [
      {
        url: OG_BANNER.path,
        width: OG_BANNER.width,
        height: OG_BANNER.height,
        alt: "Undangan pernikahan digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    description: defaultDescription,
    images: [OG_BANNER.path],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${karla.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
